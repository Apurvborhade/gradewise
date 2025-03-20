import express from 'express'
import AppError from '../utils/AppError.js';
import { auth } from '../config/firebaseadmin.js';
import { assignUserRole } from '../utils/auth/userRole.js';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
const router = express.Router()

const credAuth = getAuth()

router.post('/signup', async (req, res, next) => {
    const { email, password, role } = req.body
    try {
        if (!email || !password || !role) {
            throw new AppError("Missing required fields")
        }
        // Create user in Firebase Authentication
        const userRecord = await auth.createUser({
            email,
            password,
        });

        //Assign Role
        await assignUserRole(userRecord.uid, role)

        // Sign in User Instantly
        const userCredential = await signInWithEmailAndPassword(credAuth, email, password)
        
        const idToken = await userCredential.user.getIdToken()

        // Stores Token in Http only cookie
        res.cookie('token', idToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000
        })
        // Response 
        res.status(201).json({ message: "User created & role assigned", uid: userRecord.uid, role, userRecord });
    } catch (error) {
        next(error)
    }
})
router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body
    try {
        if (!email || !password ) {
            throw new AppError("Missing required fields")
        }
        
        // Sign in User Instantly
        const userCredential = await signInWithEmailAndPassword(credAuth, email, password)
        
        const idToken = await userCredential.user.getIdToken()

        // Stores Token in Http only cookie
        res.cookie('token', idToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000
        })
        // Response 
        res.status(201).json({ message: "User created & role assigned", uid: userCredential.uid,userCredential });
    } catch (error) {
        next(error)
    }
})

export default router