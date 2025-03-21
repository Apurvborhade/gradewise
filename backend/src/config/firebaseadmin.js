
import admin from 'firebase-admin';


admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.GOOGLE_PROJECT_ID,
    privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  }),
  projectId: 'gradewise-backend'
})

const adminDB = admin.firestore()
const auth = admin.auth()

export { auth, adminDB, admin }