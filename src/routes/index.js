import express from 'express'
import IndexController from '../controllers/index.js'
import MentorRoutes from './mentor.js'
import StudentRoutes from './student.js'


const router = express.Router()

router.get('/',IndexController.home)

router.use('/mentors',MentorRoutes)

router.use('/students',StudentRoutes)



export default router