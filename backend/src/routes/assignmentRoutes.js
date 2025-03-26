import express from 'express'
import { assignmentHandler, assignmentRequest, getAcceptedAssignments, getAllAssignmentHandler, getAssignmentDetails, getAssignmentRequests, getRejectedAssignments, getStudentAssignments, newAssignment, totalSubmissionHandler } from '../controllers/assignmentController.js'
import { handleFileUpload } from '../middleware/uploadMiddleware.js'
import { assignmentValidityChecks, gradingReport, plagiarismReport } from '../middleware/assignmentMiddleware.js'
import { checkRole } from '../middleware/authMiddleware.js'

const router = express.Router()

// Get All assignment in a class
router.get("/", getAllAssignmentHandler)
// Get Assignment details
router.get("/assignment-details/:assignmentId", getAssignmentDetails)

// Get All assignment of a student
router.get("/student-assignments", getStudentAssignments)

// Get Total assignment submission
router.get("/totalsubmission", totalSubmissionHandler)

// Get Assignemnt Requests
router.get("/assignment-requests", getAssignmentRequests)

// Get accepted Assignments
router.get("/assignment-accepted", getAcceptedAssignments)

// Get rejected Assignments
router.get("/assignment-rejected", getRejectedAssignments)



// Submit assignment (Student)
router.post("/upload", checkRole(['student']), handleFileUpload('file'), assignmentValidityChecks, plagiarismReport, gradingReport, assignmentRequest)

// Handle Assignment Req (Teacher)
router.post("/assignmenthandler", assignmentHandler)

// Post new Assignment (Teacher)
router.post("/new-assignment", checkRole(['faculty']), newAssignment)


export default router 