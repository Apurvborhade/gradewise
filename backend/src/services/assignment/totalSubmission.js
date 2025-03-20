import {  collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebasedb.js";



export const getTotalSubmissions = async (classId, assignmentId) => {
  const q = query(
    collection(db, "assignments"),
    where("classId", "==", classId),
    where("assignmentId", "==", assignmentId)
  );

  const querySnapshot = await getDocs(q);
  const totalSubmissions = querySnapshot.size; // Number of matching documents

  console.log(`Total Submissions: ${totalSubmissions}`);
  return totalSubmissions;
};
