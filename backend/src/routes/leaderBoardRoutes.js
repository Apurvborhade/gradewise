import express from 'express'
import { getLeaderboard } from '../services/assignment/studentProgress.js'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebasedb.js'
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const leaderboard = await getLeaderboard()
        const leaderboardResponse = await Promise.all(leaderboard.map(async (user) => {
            const userSnap = await getDoc(doc(db, "users", user.id))
            const userData = await userSnap.data()

            return userSnap.exists() ? userData : null
        }))
        res.status(200).json({ success: true, leaderboard: leaderboardResponse })
    } catch (error) {
        next(error)
    }
})

export default router