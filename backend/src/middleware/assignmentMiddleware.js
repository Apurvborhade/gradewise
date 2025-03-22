import { collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore";
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

export async function assignmentValidityChecks(req, res, next) {
    try {
        req.locals = req.locals || {}
        const { studentId, assignmentId, maxScore, gradingCriteria, classId ,assignmentType} = req.body;

        if (!studentId || !assignmentId || !maxScore || !gradingCriteria || !classId || !assignmentType) {
            throw new AppError("Missing required fields", 400)
        }

        // Check for class exists or not
        const classSnap = await getDoc(doc(db, "classes", classId))
        const classDocData = classSnap.data()
        console.log(classDocData)
        if (!classSnap.exists()) {
            throw new AppError("This class has been deleted", 400)
        }
        if (!(studentId in classDocData.students)) {
            throw new AppError("User needs to join this class before :(", 400)
        }
        // Check for Assignment exists or not
        const assignmentSnap = await getDoc(doc(db, "assignments", assignmentId))
        if (!assignmentSnap.exists()) {
            throw new AppError("This Assignment does not exists", 400)
        }


        // Check whether student already submitted assignment
        const submittedAssignmentSnap = await getDocs(query(collection(db, "submittedAssignments"), where("studentId", "==", studentId), where("assignmentId", "==", assignmentId)))

        if (submittedAssignmentSnap.docs.length !== 0) {
            throw new AppError("Student can submit assignment only once", 400)
        }

        const vector_embedding_metadata = {
            studentId,
            assignmentId
        }
        req.locals.vector_embedding_metadata = vector_embedding_metadata
        next()
    } catch (error) {
        return next(error)
    }
}

export async function plagiarismReport(req, res, next) {
    try {
        // get image public Url Supabase
        const { data } = await supabase
            .storage
            .from('assignment')
            .getPublicUrl(req.filePath)

        req.locals.assignmentPublicUrl = data
        // Text recognition 
        const studentAnswer = await detectText(data)
        req.locals.studentAnswer = studentAnswer
        // Format for Json
        const escapedText = escapeforJson(studentAnswer)

        // Get Embedding
        const embedding = await getEmbedding(escapedText)


        // Plagiarism Detector 
        const plagiarismReportData = await checkPlagiarism(embedding, next)

        if (plagiarismReportData.length !== 0) {
            req.locals.plagiarismReport = plagiarismReportData
        } else {
            // Store embedding in Pinecone vector DB 
            await storeDocument(embedding, req.locals.vector_embedding_metadata)
        }

        next()
    } catch (error) {
        return next(error)
    }
}

export async function gradingReport(req, res, next) {
    try {
        const { studentId, assignmentId, maxScore, gradingCriteria, classId, assignmentType } = req.body;
        const studentAnswer = req.locals.studentAnswer
        // AI Grading
        const { score, feedback } = await gradeAssignment(assignmentType, studentAnswer, maxScore, gradingCriteria);


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
        req.locals.assignment = {
            studentId,
            assignmentId,
            plagiarismReport: req.locals.plagiarismReport,
            assignment: req.locals.assignmentPublicUrl,
            classId,
            score,
            feedback
        }
        console.log("Stored Grades")
        next()
    } catch (error) {
        return next(error)
    }
}