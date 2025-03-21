import express from 'express'
import { assignmentHandler, assignmentRequest, getAllAssignmentHandler, newAssignment, totalSubmissionHandler } from '../controllers/assignmentController.js'
import { handleFileUpload } from '../middleware/uploadMiddleware.js'
import { assignmentValidityChecks, gradingReport, plagiarismReport } from '../middleware/assignmentMiddleware.js'
import { checkRole } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get("/", getAllAssignmentHandler)
router.post("/upload", checkRole(['student']), handleFileUpload('file'), assignmentValidityChecks, plagiarismReport, gradingReport, assignmentRequest)
router.get("/totalsubmission", totalSubmissionHandler)
router.post("/assignmenthandler", assignmentHandler)
router.post("/new-assignment", checkRole(['faculty']), newAssignment)


export default router 