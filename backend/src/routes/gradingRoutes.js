import express from 'express'
import { gradingHandler } from '../controllers/gradingController.js'
import { handleFileUpload } from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.post("/grade", handleFileUpload('file'), gradingHandler)

export default router 