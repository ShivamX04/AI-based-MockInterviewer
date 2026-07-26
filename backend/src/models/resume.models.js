import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },

    extractedData:{
        type: mongoose.Schema.Types.Mixed,
        required:true
    },

    questions:[
        {
            question: String,
            topic: String,
            difficulty: String
        }
    ],

    resumePath: {
        type: String,
        required: true,
    }

},{
    timestamps:true
})

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;