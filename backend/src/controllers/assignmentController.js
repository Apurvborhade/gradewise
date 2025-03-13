import { doc, getDoc } from "firebase/firestore"
import { db } from "../config/firebasedb.js"
import AppError from "../utils/AppError.js"
import { getTotalSubmissions } from "../services/assignment/totalSubmission.js"
import { response } from "express"

export const totalSubmissionHandler = async (req, res, next) => {

    try {
        const classId = req.query.classId
        const assignmentId = req.query.assignmentId
        if (!classId || !assignmentId) {
            throw new AppError("Cannot find class or assignment")
        }

        const totalsubmissions = getTotalSubmissions(classId, assignmentId)
        response.json({ success: true, totalsubmissions })
    } catch (error) {
        next(error)
    }
}
export const getAllAssignmentHandler = async (req, res, next) => {
    try {
        const assignmentsRef = collection(db, "assignments"); // Reference to the collection
        const querySnapshot = await getDocs(assignmentsRef); // Fetch all documents

        const assignments = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.json({ success: true, assignments });
    } catch (error) {
        next(error)
    }
}
export const assignmentAcceptHandler = async (req, res, next) => {
    try {
        const assignmentId = req.query.assignmentId
        const assignmentRef = doc(db, "assignments", assignmentId);
        const assignmentDoc = await getDoc(assignmentRef)
        if (!assignmentId) {
            throw new AppError("Cannot find assignment")
        }
        if (assignmentDoc.exists()) {
            const data = assignmentDoc.data();
            if (data.status === "pending") {
                await updateDoc(assignmentRef, {
                    status: "accepted",
                });
            } else {
                throw new AppError("Request Already accepted", 400)
            }
        } else {
            throw new AppError("Cannot find assignment", 404)
        }


        res.json({ success: true, assignment: assignmentDoc.data() })

    } catch (error) {
        next(error)
    }
}
export const assignmentRejectHandler = async (req, res, next) => {
    try {
        const assignmentId = req.query.assignmentId
        const assignmentRef = doc(db, "assignments", assignmentId);
        const assignmentDoc = await getDoc(assignmentRef)
        if (!assignmentId) {
            throw new AppError("Cannot find assignment")
        }
        if (assignmentDoc.exists()) {
            const data = assignmentDoc.data();
            if (data.status === "pending") {
                await updateDoc(assignmentRef, {
                    status: "rejected",
                });
            } else {
                throw new AppError("Request Already accepted", 400)
            }
        } else {
            throw new AppError("Cannot find assignment", 404)
        }


        res.json({ success: true, assignment: assignmentDoc.data() })

    } catch (error) {
        next(error)
    }
}