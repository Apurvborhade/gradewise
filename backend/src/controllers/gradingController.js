import { collection, doc, getDoc, query, where } from "@firebase/firestore";
import { db } from "../config/firebasedb.js";
import { gradeAssignment } from "../services/gradingService.js";
import { supabase } from "../utils/supabase.js";
import AppError from "../utils/AppError.js";
import { getEmbedding } from '../lib/plagiarism/getEmbedding.js'
import { storeDocument } from "../lib/pinecone/storeDocument.js";
import checkPlagiarism from "../lib/plagiarism/checkPlagiarism.js";
import escapeforJson from "../utils/escapeJson.js";
import detectText from "../services/grading/textrecognition.js";
import createGradeDoc from "../services/grading/createGradeDoc.js";


export const gradingHandler = async (req, res, next) => {
  try {
    const { studentId, assignmentId, maxScore, gradingCriteria, classId } = req.body;
    const vector_embedding_metadata = {
      studentId,
      assignmentId
    }
    if (!studentId || !assignmentId || !maxScore || !gradingCriteria || !classId) {
      throw new AppError("Missing required fields", 400)
    }

    // Check for class exists or not
    const classSnap = await getDoc(doc(db, "classes", classId))
    if (!classSnap.exists()) {
      throw new AppError("This class has been deleted", 400)
    }

    // Check whether student already submitted assignment
    const assignmentSnap = await getDoc(query(collection(db, "assignments"), where("studentId", "==", studentId), where("assignmentId", "==", assignmentId)))

    if (assignmentSnap.exists()) {
      throw new AppError("Student can submit assignment only once", 400)
    }
    // get image public Url Supabase
    const { data } = await supabase
      .storage
      .from('assignment')
      .getPublicUrl(req.filePath)

    // Text recognition 
    const studentAnswer = await detectText(data)

    // Format for Json
    const escapedText = escapeforJson(studentAnswer)

    // Get Embedding
    const embedding = await getEmbedding(escapedText)


    // Plagiarism Detector 
    const plagiarismMatches = await checkPlagiarism(embedding, next)
    if (plagiarismMatches.length !== 0) {
      console.log(plagiarismMatches)
      throw new AppError("Plagiarism Detected", 403)
    }
    // Store embedding in Pinecone vector DB 
    await storeDocument(embedding, vector_embedding_metadata)

    // AI Grading
    const { score, feedback } = await gradeAssignment(studentAnswer, maxScore, gradingCriteria);


    // Store grading result in Firestore
    await createGradeDoc(
      db,
      classId,
      studentId,
      assignmentId,
      studentAnswer,
      score,
      "pending",
      feedback,
    )

    // Response 
    return res.json({ success: true, score, feedback });
  } catch (error) {
    return next(error)
  }
};

