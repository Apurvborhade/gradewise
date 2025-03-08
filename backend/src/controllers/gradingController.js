import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "../config/firebasedb.js";
import { gradeAssignment } from "../services/gradingService.js";
import { supabase } from "../utils/supabase.js";
import { createWorker } from "tesseract.js";
import AppError from "../utils/AppError.js";
import { getEmbedding } from '../lib/plagiarism/getEmbedding.js'
import { storeDocument } from "../lib/pinecone/storeDocument.js";
import checkPlagiarism from "../lib/plagiarism/checkPlagiarism.js";
import escapeforJson from "../utils/escapeJson.js";
export const gradingHandler = async (req, res, next) => {
  try {
    const { studentId, assignmentId, maxScore, gradingCriteria } = req.body;
    const vector_embedding_metadata = {
      studentId,
      assignmentId
    }
    if (!studentId || !assignmentId || !maxScore || !gradingCriteria) {
      throw new AppError("Missing required fields", 400)
    }
    // get image public Url Supabase
    const { data } = await supabase
      .storage
      .from('assignment')
      .getPublicUrl(req.filePath)

    // Text recognition 
    const worker = await createWorker('eng')
    const ret = await worker.recognize(data.publicUrl)
    const studentAnswer = ret.data.text;
    await worker.terminate();

    // Format for Json
    const escapedText = escapeforJson(studentAnswer)

    // Get Embedding
    const embedding = await getEmbedding(escapedText)


    // Plagiarism Detector 
    const plagiarismMatches = await checkPlagiarism(embedding, next)
    if (plagiarismMatches) {
      console.log(plagiarismMatches)
      throw new AppError("Plagiarism Detected", 403)
    }
    // Store embedding in Pinecone vector DB P
    await storeDocument(embedding, vector_embedding_metadata)

    // AI Grading
    const { score, feedback } = await gradeAssignment(studentAnswer, maxScore, gradingCriteria);

    // Store grading result in Firestore
    await addDoc(collection(db, "grades"), {
      studentId,
      assignmentId,
      studentAnswer,
      score,
      feedback,
      timestamp: serverTimestamp(),
    });

    // Response 
    return res.json({ success: true, score, feedback });
  } catch (error) {
    return next(error)
  }
};

