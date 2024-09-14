import MentorModel from "../models/MentorModel.js"
import StudentModel from "../models/StudentModel.js"

const getAllMentors = async(req,res)=>{
    try {
        let mentors = await MentorModel.find({})
        res.status(200).send({
            message:"Mentor Data Fetched Successfully",
            mentors
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error'  
        })
    }
}

const createMentor = async(req,res)=>{
    try {
        let {mentorName,mentorEmail} = req.body
        let mentor = await MentorModel.findOne({mentorEmail:mentorEmail})

        if(!mentor)
        {
            // password = await Auth.hashPassword(password)
            await MentorModel.create({mentorName,mentorEmail})

            res.status(200).send({
                message:"Mentor Created Successfully"
            })
        }
        else
        {
            res.status(400).send({
                message:`Mentor with ${mentorEmail} already exists`
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error'  
        })
    }
}

const assignStudentToMentor = async (req, res) => {
    try {
     
      const {mentorEmail,studentEmail}=req.body;
      const mentor = await MentorModel.findOne({ mentorEmail: mentorEmail });
     
      if (!mentor) {
        return res.status(404).send("Mentor not found");
      }
      const student = await StudentModel.findOneAndUpdate(
        { studentEmail: studentEmail },
        {assignedMentor:mentor._id},
        {new:true}
      ).populate("assignedMentor",{mentorName:1});

      mentor.assignedStudents.push(student._id);
      await mentor.save();

      res.status(200).send({
        message:`Student ${student.studentName} assigned to mentor ${mentor.mentorName} successfully`,
        student});
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Internal Server Error'  
      });
    }
  };

 
  const viewStudentsForMentor = async (req, res) => {
    try {
      const { mentorEmail } = req.params;
      const mentor = await MentorModel.findOne({ mentorEmail: mentorEmail }).populate("assignedStudents");
      if (!mentor) {
        return res.status(404).send("Mentor not found");
      }
      res.status(200).send({
        message: "Students for mentor fetched successfully",
        students: mentor.assignedStudents
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Internal Server Error'  
      });
    }
  };


  const assignStudentsToMentor = async (req, res) => {
    try {
      const { mentorEmail, studentEmails } = req.body;

      // Find the mentor by email
      const mentor = await MentorModel.findOne({ mentorEmail: mentorEmail });
      if (!mentor) {
        return res.status(404).send("Mentor not found");
      }

      // Find students who do not have a mentor assigned
      const studentsWithoutMentor = await StudentModel.find({ assignedMentor: { $exists: false } });

      // Filter out students who already have a mentor assigned
      const selectedStudents = studentsWithoutMentor.filter(student => studentEmails.includes(student.studentEmail));

      // Assign selected students to mentor
      await Promise.all(selectedStudents.map(async (student) => {
        student.assignedMentor = mentor._id;
        await student.save();
      }));
      
      // Update mentor's list of students
      mentor.assignedStudents.push(...selectedStudents.map(student => student._id));
      await mentor.save();
      res.status(200).send({
        message: `Students assigned to mentor ${mentor.mentorName} successfully`
      });
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Internal Server Error'  
      });
    }
  };
export default {
    createMentor,
    getAllMentors,
    assignStudentToMentor,
    assignStudentsToMentor,
    viewStudentsForMentor
}