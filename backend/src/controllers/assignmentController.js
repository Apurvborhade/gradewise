import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore"
import { db } from "../config/firebasedb.js"
import AppError from "../utils/AppError.js"
import { getTotalSubmissions } from "../services/assignment/totalSubmission.js"
import { response } from "express"
import { admin, adminDB, auth } from "../config/firebaseadmin.js"
import { studentProgress } from "../services/assignment/studentProgress.js"
// POST
export const newAssignment = async (req, res, next) => {
    try {
        const { classId, assignmentName, dueDate, assignmentType } = req.body
        if (!classId || !assignmentName || !dueDate || !assignmentType) {
            throw new AppError("Missing required data")
        }
        // Check for Class
        const classRef = adminDB.collection('classes').doc(classId);
        const classDoc = await classRef.get();
        if (!classDoc.exists) throw new AppError('Class not found');

        await addDoc(collection(db, 'assignments'), {
            classId,
            assignmentName,
            dueDate,
            assignmentType
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
        // Create Assignment in 'assignment' collection
        const newClassRef = adminDB.collection('submittedAssignments').doc();
        await newClassRef.set({
            ...assignment,
            submissionDate: new Date()
        });
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
            await studentProgress(studentId, assignmentId, next)
        } else if (action === 'reject') {
            updates[`rejectedAssignment.${assignmentId}`] = { rejectedAt: new Date() };
        }
        await classRef.update(updates);
        res.json({ message: `Request ${action}ed` });
    } catch (error) {
        next(error)
    }
}




// GET
export const getStudentAssignments = async (req, res, next) => {
    try {
        const { studentId, page = 1, pageSize = 10 } = req.query;
        if (!studentId) {
            throw new AppError("Student ID is required", 400);
        }

        const assignmentsRef = collection(db, "submittedAssignments");
        const q = query(
            assignmentsRef,
            where("studentId", "==", studentId),
            // orderBy("submissionDate", "desc"), // Order by latest submission
            limit(Number(pageSize)),
            ...(page > 1 ? [startAfter(req.query.lastVisible || null)] : [])
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return res.status(200).json({ assignments: [], lastVisible: null });
        }

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]; // Store last document for next page

        const assignments = await Promise.all(
            querySnapshot.docs.map(async (docSnap) => {
                const assignment = docSnap.data();

                // Fetch className using classId
                const classRef = doc(db, "classes", assignment.classId);
                const classSnap = await getDoc(classRef);
                const className = classSnap.exists() ? classSnap.data().className : "Unknown Class";

                // Fetch maxScore using assignmentId
                const assignmentRef = doc(db, "assignments", assignment.assignmentId);
                const assignmentSnap = await getDoc(assignmentRef);
                const maxScore = assignmentSnap.exists() ? assignmentSnap.data().maxScore : 100;

                return {
                    id: docSnap.id,
                    ...assignment,
                    className,
                    maxScore,
                };
            })
        );

        res.status(200).json({ assignments, lastVisible: lastVisible.id });
    } catch (error) {
        next(error);
    }
};

export const getAssignmentDetails = async (req, res, next) => {
    try {
        const { assignmentId } = req.params;
        if (!assignmentId) {
            throw new AppError("Cannot find Assignment ID", 400);
        }

        const assignmentRef = doc(db, "assignments", assignmentId);
        const assignmentSnap = await getDoc(assignmentRef);

        if (!assignmentSnap.exists()) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        const assignmentData = assignmentSnap.data();

        return res.status(200).json({
            id: assignmentSnap.id,
            ...assignmentData,
        });
    } catch (error) {
        next(error);
    }
};
export const getSubmittedAssignmentDetails = async (req, res, next) => {
    try {
        const { assignmentId } = req.params;
        if (!assignmentId) {
            throw new AppError("Cannot find Assignment ID", 400);
        }

        const assignmentRef = doc(db, "submittedAssignments", assignmentId);
        const assignmentSnap = await getDoc(assignmentRef);

        if (!assignmentSnap.exists()) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        const assignmentData = assignmentSnap.data();
        
        const { classId, plagiarismReport,assignmentId:postedAssignmentId } = assignmentData;
        let className = "Unknown";
        if (classId) {
            const classRef = doc(db, "classes", classId);
            const classSnap = await getDoc(classRef);
            if (classSnap.exists()) {
                className = classSnap.data().className || "Unknown";
            }
        }

        let assignmentName = "Unknown";
        const assignmentMetaRef = doc(db, "assignments", postedAssignmentId);
        const assignmentMetaSnap = await getDoc(assignmentMetaRef);
        if (assignmentMetaSnap.exists()) {
            assignmentName = assignmentMetaSnap.data().assignmentName || "Unknown";
        }

        let maxPlagiarismScore = 0;
        if (Array.isArray(plagiarismReport) && plagiarismReport.length > 0) {
            maxPlagiarismScore = Math.max(...plagiarismReport.map((entry) => entry.score));
        }
        const plagiarismPercentage = (maxPlagiarismScore * 100).toFixed(2) + "%";
        return res.status(200).json({
            id: assignmentSnap.id,
            assignmentName,
            className,
            plagiarismPercentage,
            ...assignmentData,
        });
    } catch (error) {
        next(error);
    }
};
export const getAllAssignmentHandler = async (req, res, next) => {
    try {

        const { classId } = req.query
        const assignmentsRef = collection(db, "assignments"); // Reference to the collection
        const q = query(assignmentsRef, where("classId", "==", classId))
        const querySnapshot = await getDocs(q); // Fetch all documents

        const assignments = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.json(assignments);
    } catch (error) {
        next(error)
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
export const getAssignmentRequests = async (req, res, next) => {
    try {
        const { classId } = req.query

        const classSnap = await getDoc(doc(db, "classes", classId))
        const classData = classSnap.data()

        const assignmentRequestsIds = classData.assignmentRequests ? Object.keys(classData.assignmentRequests) : []

        const assignmentRequests = await Promise.all(assignmentRequestsIds.map(async (id) => {
            const docSnap = await getDoc(doc(db, "submittedAssignments", id))
            if (!docSnap.exists()) return null;

            const assignmentData = docSnap.data();

            const assignmentId = assignmentData.assignmentId;
            const studentId = assignmentData.studentId;

            const userSnap = await getDoc(doc(db, "users", studentId));
            const username = userSnap.exists() ? userSnap.data().username : "Unknown";

            // Fetch assignment details
            const assignmentSnap = await getDoc(doc(db, "assignments", assignmentId));
            const assignmentName = assignmentSnap.exists() ? assignmentSnap.data().assignmentName : "Unknown Assignment";

            return { id: docSnap.id, ...assignmentData, assignmentName, username };
        }))
        res.status(200).json(assignmentRequests)
    } catch (error) {
        next(error)
    }
}
export const getAcceptedAssignments = async (req, res, next) => {
    try {
        console.log("accepeted Assignment")
        const { classId } = req.query
        const classSnap = await getDoc(doc(db, "classes", classId))
        const classData = classSnap.data()

        const acceptedAssignmentIds = classData.assignments ? Object.keys(classData.assignments) : []

        console.log("accepted", acceptedAssignmentIds)
        const acceptedAssignments = await Promise.all(acceptedAssignmentIds.map(async (id) => {
            const docSnap = await getDoc(doc(db, "submittedAssignments", id))
            const assignmentData = docSnap.data()
            const classAssignmentSnap = await getDoc(doc(db,"assignments",assignmentData.assignmentId))
            const classAssignmentData = classAssignmentSnap.data()
            const studentId = assignmentData.studentId;

            const userSnap = await getDoc(doc(db, "users", studentId));
            const username = (userSnap.exists() && userSnap.data().username) ? userSnap.data().username : "Unknown";

            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    username,
                    assignmentName:classAssignmentData.assignmentName,
                    ...assignmentData,
                }
            } else return []

        }))

        res.status(200).json(acceptedAssignments)
    } catch (error) {
        next(error)
    }
}
export const getRejectedAssignments = async (req, res, next) => {
    try {
        const { classId } = req.query

        const classSnap = await getDoc(doc(db, "classes", classId))
        const classData = classSnap.data()

        const rejectedAssignmentIds = classData.rejectedAssignments ? Object.keys(classData.rejectedAssignments) : []
        const assignmentRequests = await Promise.all(rejectedAssignmentIds.map(async (id) => {
            const docSnap = await getDoc(doc(db, "submittedAssignments", id))
            return docSnap.exists() ? docSnap.data() : null;
        }))
        res.status(200).json({ assignmentRequests })
    } catch (error) {
        next(error)
    }
}
