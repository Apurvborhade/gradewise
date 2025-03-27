import { adminDB, auth } from "../../config/firebaseadmin.js";

export async function assignUserRole(uid, role) {
    try {
        // Store role in Firestore
        await adminDB.collection("users").doc(uid).set({ role }, { merge: true });

        // Set Firebase Custom Claims (role)
        await auth.setCustomUserClaims(uid, { role });

        console.log(`Role '${role}' assigned to UID: ${uid}`);
    } catch (error) {
        console.error("Error assigning role:", error);
    }
}
export async function assignUsername(uid, username) {
    try {
        // Store role in Firestore
        await adminDB.collection("users").doc(uid).set({ username }, { merge: true });

    } catch (error) {
        console.error("Error assigning role:", error);
    }
}
