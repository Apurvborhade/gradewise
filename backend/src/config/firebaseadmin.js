import admin from 'firebase-admin';
import { readFileSync } from "fs";
const serviceAccount = JSON.parse(
    readFileSync(new URL("./serviceAccountsKey.json", import.meta.url))
  );
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'gradewise-backend'
})

const auth = admin.auth()

export { auth }