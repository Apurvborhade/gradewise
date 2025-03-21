import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../config/firebasedb.js"
import AppError from "../utils/AppError.js"
import { getTotalSubmissions } from "../services/assignment/totalSubmission.js"
import { response } from "express"
import { admin, adminDB, auth } from "../config/firebaseadmin.js"
// testing
export const newAssignment = async (req, res, next) => {
    try {
        const { classId, assignmentName } = req.body
        if (!classId || !assignmentName) {
            throw new AppError("Missing required data")
        }
        // Check for Class
        const classRef = adminDB.collection('classes').doc(classId);
        const classDoc = await classRef.get();
        if (!classDoc.exists) throw new AppError('Class not found');

        await addDoc(collection(db, 'assignments'), {
            classId,
            assignmentName
        })
        res.json({ message: "Assignment Created" })
    } catch (error) {
        return next(error)
    }
}
export const assignmentRequest = async (req, res, next) => {
    try {
        const { classId } = req.body
        const assignment = JSON.parse(JSON.stringify(req.locals.assignment))
        console.log(assignment)
        // Create Assignment in 'assignment' collection
        const newClassRef = adminDB.collection('submittedAssignments').doc();
        await newClassRef.set(assignment);
        console.log("assignmentSubmit")

        const submittedAssignmentId = newClassRef.id
        // Check for Class
        const classRef = adminDB.collection('classes').doc(classId);
        const classDoc = await classRef.get();
        if (!classDoc.exists) throw new AppError('Class not found');

        await classRef.update({ [`assignmentRequests.${submittedAssignmentId}`]: { timestamp: new Date() } });
        res.status(201).json({ message: 'Assignment request sent' });
    } catch (error) {
        return next(error)
    }
}
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
export const assignmentHandler = async (req, res, next) => {
    const { classId, studentId, assignmentId } = req.query;
    const { action } = req.body
    try {
        console.log(req.query)
        if (!action) {
            throw new AppError("Action not defined", 400)
        }
        try {
            await auth.getUser(studentId)
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                throw new AppError("User does not exist")
            }
            throw new AppError("Error verifying student")
        }
        const classRef = adminDB.collection('classes').doc(classId);
        const classDoc = await classRef.get();
        if (!classDoc.exists) throw new AppError("Class not found", 404)
        const classData = classDoc.data();

        if (classData.facultyId !== req.user.uid) {
            throw new AppError("Unauthorized: Only the assigned faculty can approve/reject requests")
        }

        if (!classData.assignmentRequests || !classData.assignmentRequests[assignmentId]) {
            throw new AppError('Request not found', 404);
        }
        const updates = { [`assignmentRequests.${assignmentId}`]: admin.firestore.FieldValue.delete() };
        if (action === 'accept') {
            updates[`assignments.${assignmentId}`] = { submittedAt: new Date() };
        } else if (action === 'reject') {
            updates[`rejectedAssignment.${assignmentId}`] = { rejectedAt: new Date() };
        }
        await classRef.update(updates);
        res.json({ message: `Request ${action}ed` });
    } catch (error) {
        next(error)
    }
}
