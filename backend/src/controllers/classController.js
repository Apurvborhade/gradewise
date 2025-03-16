import { admin, adminDB, auth } from "../config/firebaseadmin.js";
import AppError from "../utils/AppError.js";

export const createClassHandler = async (req, res, next) => {
    const { facultyId, className } = req.body;
    try {
        if (!facultyId || !className) throw new AppError("Missing required fields", 400)

        try {
            await auth.getUser(facultyId)
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                throw new AppError("Faculty does not exist")
            }
            throw new AppError("Error verifying faculty")
        }



        const newClassRef = adminDB.collection('classes').doc();
        await newClassRef.set({ facultyId, className, students: {}, requests: {} });

        res.status(201).json({ message: 'Class created', classId: newClassRef.id })
    } catch (error) {
        next(error)
    }
}
export const sendJoinRequest = async (req, res, next) => {
    const { studentId } = req.body;
    const { classId } = req.params;
    try {

        if (!studentId) {
            throw new AppError("Student not found", 404)
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
        if (!classDoc.exists) throw new AppError('Class not found');

        await classRef.update({ [`requests.${studentId}`]: { timestamp: new Date() } });
        res.json({ message: 'Join request sent' });
    } catch (error) {
        next(error)
    }
}

export const getClassJoinRequest = async (req, res, next) => {
    const { classId } = req.params;
    try {
        const classRef = adminDB.collection('classes').doc(classId);
        const classDoc = await classRef.get();
        if (!classDoc.exists) throw new AppError("Class not found", 404)

        res.json({ requests: classDoc.data().requests || {} });
    } catch (error) {
        next(error)
    }
}
export const handleJoinRequest = async (req, res, next) => {
    const { classId, studentId } = req.params;
    const { action } = req.body
    try {

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

        if (!classData.requests || !classData.requests[studentId]) {
            throw new AppError('Request not found', 404);
        }
        const updates = { [`requests.${studentId}`]: admin.firestore.FieldValue.delete() };
        if (action === 'accept') {
            updates[`students.${studentId}`] = { joinedAt: new Date() };
        } else if (action === 'reject') {
            updates[`rejected.${studentId}`] = { rejectedAt: new Date() };
        }
        await classRef.update(updates);
        res.json({ message: `Request ${action}ed` });
    } catch (error) {
        next(error)
    }
}