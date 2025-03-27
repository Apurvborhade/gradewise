import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { admin, adminDB, auth } from "../config/firebaseadmin.js";
import AppError from "../utils/AppError.js";
import { db } from "../config/firebasedb.js";

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
        await newClassRef.set({ facultyId, className, students: {}, requests: {}, assignmentRequests: {}, assignments: {}, timestamp: new Date() });

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
        const requests = classDoc.data().requests || {}; // Object with userIds as keys
        const userIds = Object.keys(requests);

        const usersData = await Promise.all(
            userIds.map(async (userId) => {
                const userRef = adminDB.collection('users').doc(userId);
                const userDoc = await userRef.get();

                return userDoc.exists
                    ? { id: userId, username: userDoc.data().username }
                    : { id: userId, username: "Unknown" };
            })
        );
        res.json(usersData);
    } catch (error) {
        next(error)
    }
}
export const getClassDetails = async (req, res, next) => {
    const { classId } = req.params;
    try {
        const classRef = adminDB.collection('classes').doc(classId);
        const classDoc = await classRef.get();
        if (!classDoc.exists) throw new AppError("Class not found", 404)

        res.json(classDoc.data());
    } catch (error) {
        next(error)
    }
}

export const handleJoinRequest = async (req, res, next) => {
    const { classId, studentId } = req.params;
    const { action } = req.body
    try {
        console.log(classId, studentId, action)
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
export const getStudents = async (req, res, next) => {
    try {
        const { classId } = req.params

        const classSnap = await getDoc(doc(db, "classes", classId))
        if (!classSnap.exists()) {
            throw new AppError('Class Not Found', 404)
        }
        const classData = await classSnap.data()

        const studentIds = classData.students ? Object.keys(classData.students) : []
        if (studentIds.length === 0) {
            return res.status(200).json([]);
        }

        // Fetch students from 'users' collection
        const usersRef = collection(db, "users");
        const students = await Promise.all(
            studentIds.map(async (studentId) => {
                const studentSnap = await getDoc(doc(usersRef, studentId));
                return studentSnap.exists() ? { id: studentSnap.id, ...studentSnap.data() } : null;
            })
        );
        students.filter(Boolean)
        // Filter out any null values (if a user doesn't exist)
        res.status(200).json(students);
    } catch (error) {
        next(error)
    }
}
export const getLeaderBoard = async (req, res, next) => {
    try {
        const usersRef = collection(db, "users");

        // Query only students
        const q = query(usersRef, where("role", "==", "student"));
        const querySnap = await getDocs(q);

        const students = [];
        querySnap.forEach((docSnap) => {
            const data = docSnap.data();
            students.push({
                id: docSnap.id,
                username: data.username || "",
                xp: data.xp || 0,
            });
        });

        // Sort by XP descending
        const topStudents = students
            .sort((a, b) => b.xp - a.xp)
            .slice(0, 10);

        res.status(200).json(topStudents);
    } catch (error) {
        next(error)
    }
}

export const getClasses = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { limit: limitValue } = req.query
        if (!userId) {
            return res.status(400).json({ message: "Student or Faculty ID is required" });
        }

        const maxResults = Number(limitValue) || 10;

        const classesSnapshot = await getDocs(query(collection(db, "classes")))

        if (classesSnapshot.empty) {
            return res.status(404).json({ message: "No classes found" });
        }

        
        const classes = [];

        classesSnapshot.forEach((doc) => {
            const classData = doc.data();
        
            if (req.user.role === 'faculty') {
                if (classData.facultyId && classData.facultyId === userId) {
                    classes.push({ id: doc.id, ...classData });
                }
            } else {
                if (classData.students && classData.students[userId]) {
                    classes.push({ id: doc.id, ...classData });
                }
            }
        });

        if (classes.length === 0) {
            return res.status(404).json({ message: "No classes found for this student" });
        }
        const limitedClasses = classes.slice(0, maxResults);
        res.status(200).json(limitedClasses);
    } catch (error) {
        next(error)
    }
}


