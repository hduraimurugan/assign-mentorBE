import mongoose from './index.js'


const validateEmail = (value)=>{
    return String(value)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const studentSchema = new mongoose.Schema({
    studentName:{
        type:String,
        required:true,
        message:"Name is Required"
    },
    studentEmail:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:validateEmail,
            message:props=>`${props.value} is Invalid Email`
        }
    },
   assignedMentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mentors"
    }
},
{
    versionKey:false,
    collection:'students'
})

const StudentModel = mongoose.model('students',studentSchema)

export default StudentModel