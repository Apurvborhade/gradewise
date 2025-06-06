import express from 'express'
import { createClassHandler, getClassDetails, getClasses, getClassJoinRequest, getLeaderBoard, getStudents, handleJoinRequest, sendJoinRequest } from '../controllers/classController.js'
import { checkRole } from '../middleware/authMiddleware.js'
const router = express.Router()

// Get Students Classes
router.get("/:userId/classes", getClasses)
// Get Students Req to Join Class
router.get("/:classId/requests", getClassJoinRequest)
// Get Students in class
router.get("/leaderboard", getLeaderBoard)
// Get Class Details
router.get("/:classId", getClassDetails)

// Get Students in class
router.get("/:classId/students", getStudents)


// Create Class (Faculty)
router.post("/create", checkRole(['faculty']), createClassHandler)
// Join Class (Student)
router.post("/:classId/join", sendJoinRequest)
// Handle Join Requests (Faculty)
router.post("/:classId/requests/:studentId", checkRole(['faculty']), handleJoinRequest)

export default router 