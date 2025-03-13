import express from 'express'
import dotenv from 'dotenv'
import gradingRoutes from './routes/gradingRoutes.js'
const app = express()

// Middleware for parsing JSON requests
app.use(express.json())
dotenv.config()
// Define port as a constant
const PORT = process.env.PORT || 3000

app.use('/api/grading', gradingRoutes)
app.use('/api/assignment', gradingRoutes)


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