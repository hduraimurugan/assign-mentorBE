import express from 'express'
import StudentController from '../controllers/students.js'
const router = express.Router()

router.get('/',StudentController.getAllStudents)
router.post('/create',StudentController.createStudent)
router.get('/previous-mentor/:studentEmail',StudentController.previousMentorForStudent)
export default router