import mongoose from './index.js'

const validateEmail = (value)=>{
    return String(value)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const mentorSchema = new mongoose.Schema({
    mentorName:{
        type:String,
        required:true,
        message:"Name is Required"
    },
    mentorEmail:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:validateEmail,
            message:props=>`${props.value} is Invalid Email`
        }
    },
    assignedStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"students"
        }
    ]
},
{
    versionKey:false,
    collection:'mentors'
})

const MentorModel = mongoose.model('mentors',mentorSchema)

export default MentorModel