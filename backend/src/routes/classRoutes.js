import express from 'express'
import { createClassHandler, getClassJoinRequest, handleJoinRequest, sendJoinRequest } from '../controllers/classController.js'
import { checkRole } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post("/create", checkRole(['faculty']), createClassHandler)
router.get("/:classId/requests", getClassJoinRequest)
router.post("/:classId/join", sendJoinRequest)
router.post("/:classId/requests/:studentId", checkRole(['faculty']), handleJoinRequest)

export default router 