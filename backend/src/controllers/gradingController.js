import { addDoc, collection, FieldValue, serverTimestamp } from "@firebase/firestore";
import { db } from "../config/firebasedb.js";
import { gradeAssignment } from "../services/gradingService.js";
import { supabase } from "../utils/supabase.js";
import { createWorker } from "tesseract.js";
import AppError from "../utils/AppError.js";

export const gradingHandler = async (req, res, next) => {
  try {
    const { studentId, assignmentId, maxScore, gradingCriteria } = req.body;
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

    // Add Map To Vector DB 

    // Plagiarism Detector 

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
