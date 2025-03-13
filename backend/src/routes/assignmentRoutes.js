import express from 'express'
import { assignmentAcceptHandler, assignmentRejectHandler, getAllAssignmentHandler, totalSubmissionHandler } from '../controllers/assignmentController.js'

const router = express.Router()

router.get("/", getAllAssignmentHandler)
router.get("/totalsubmission", totalSubmissionHandler)
router.post("/accept", assignmentAcceptHandler)
router.post("/reject", assignmentRejectHandler)

export default router 