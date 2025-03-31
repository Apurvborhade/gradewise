import { collection, doc, getDoc, getDocs, limit, orderBy, query, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebasedb.js"

export const studentProgress = async (studentId, submittedAssignmentId, next) => {
    try {
        const studentRef = doc(db, "users", studentId);
        const studentSnap = await getDoc(studentRef);

        const submittedAssignmentSnap = await getDoc(doc(db, "submittedAssignments", submittedAssignmentId))
        const submittedAssignment = submittedAssignmentSnap.data()
        const score = submittedAssignment.score
        let xp = score * 10

        let updates = {
            xp: (studentSnap.data()?.xp || 0) + xp,
            assignmentCount: (studentSnap.data()?.assignmentCount || 0) + 1
        };

        // Award badges
        if (score === 100) updates["badges.perfectionist"] = true;
        if (studentSnap.data()?.assignmentCount) {
            if (studentSnap.data()?.assignmentCount >= 5) updates["badges.consistency"] = true;
        }

        await updateDoc(studentRef, updates);
    } catch (error) {
        next(error)
    }
}

export const getLeaderboard = async (topN = 10) => {
    const leaderboardRef = collection(db, "users");
    const q = query(leaderboardRef);

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs)
    let leaderboard = [];

    querySnapshot.forEach((doc) => {
        leaderboard.push({ id: doc.id, ...doc.data() });
    });

    return leaderboard;
};
