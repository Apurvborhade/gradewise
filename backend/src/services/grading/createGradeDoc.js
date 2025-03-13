import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default async function createGradeDoc(db, classId,studentId,
    assignmentId,
    studentAnswer,
    score,
    status,
    feedback,
) {
    await addDoc(collection(db, "assignments"), {
        classId,
        studentId,
        assignmentId,
        studentAnswer,
        score,
        feedback,
        status,
        timestamp: serverTimestamp(),
    });
}