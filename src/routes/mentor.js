import express from 'express'
import MentorController from '../controllers/mentors.js'

const router = express.Router()

router.get('/',MentorController.getAllMentors)
router.post('/create',MentorController.createMentor)
router.put('/assign-student', MentorController.assignStudentToMentor) 
router.get('/students/:mentorEmail', MentorController.viewStudentsForMentor) 
router.put('/assign-students/:mentorEmail', MentorController.assignStudentsToMentor); 

export default router