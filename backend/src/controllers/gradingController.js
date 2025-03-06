import { addDoc, collection, FieldValue, serverTimestamp } from "@firebase/firestore";
import { db } from "../config/firebasedb.js";
import { gradeAssignment } from "../services/gradingService.js";
import { supabase } from "../utils/supabase.js";
import { createWorker } from "tesseract.js";
import AppError from "../utils/AppError.js";

export const gradingHandler = async (req, res,next) => {
  try {
    const { studentId, assignmentId, studentAnswer, question, maxScore, gradingCriteria } = req.body;
    const { data } = await supabase
      .storage
      .from('assignment')
      .getPublicUrl(req.filePath)

    const worker = await createWorker('eng')
    const ret = await worker.recognize(data.publicUrl)
    const answerText = ret.data.text;
    await worker.terminate();

    if (!studentId || !assignmentId || !studentAnswer || !maxScore || !gradingCriteria) {
      throw new AppError("Missing required fields", 400)
    }

    // AI Grading
    const { score, feedback } = await gradeAssignment(answerText, maxScore, gradingCriteria);

    // Store grading result in Firestore
    await addDoc(collection(db, "grades"), {
      studentId,
      assignmentId,
      studentAnswer,
      score,
      feedback,
      timestamp: serverTimestamp(),
    });

    return res.json({ success: true, score, feedback });
  } catch (error) {
    return next(error)
  }
};
