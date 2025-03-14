import express from 'express'
import dotenv from 'dotenv'
import gradingRoutes from './routes/gradingRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import assignmentRoutes from './routes/assignmentRoutes.js'
import { injectToken } from './utils/auth/injectToken.js'
import { decodeFirebaseIdToken, isAuthorized, checkRole } from './middleware/authMiddleware.js'
const app = express()

// Middleware for parsing JSON requests
app.use(express.json())
app.use(cookieParser())
dotenv.config()
// Define port as a constant
const PORT = process.env.PORT || 8080

app.use(injectToken)
app.use('/api/grading', decodeFirebaseIdToken, isAuthorized, checkRole(['faculty']), gradingRoutes)
app.use('/api/assignment', assignmentRoutes)
app.use('/api/auth/', authRoutes)


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Something went wrong!'
    })
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})