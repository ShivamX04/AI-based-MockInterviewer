import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    startedAt:{
        type: Date,
        default: Date.now,
    },

    endedAt: {
        type: Date,
    },

    duration: {
        type: Number,
        default: 0,
    },
    
    title: {
        type: String,
        required: true,
        trim: true,
    },

    role: {
        type: String,
        required: true
    },

    experience: {
        type: String,
        required: true
    },

    interviewType: {
        type: String,
        required: true
    },

    resumeUrl : String,

    resumeText: {
        type: String,
    },

    extractedSkills: [String],
    extractedProjects: [String],

    questions: [
    {
        question: String,
        topic: String,
        difficulty: String,
    },
],

    answers: [
        {
            answer: String,
            timeTaken: Number,
        }
    ],

    score: {
        type: Number,
        default: 0
    },

    summary: {
        type: String,
        default: ""
    },

    strengths: {
        type: [String],
        default: []
    },

    weaknesses: {
        type: [String],
        default: []
    },

    feedback: {
        type: String,
        default: ""
    },

    workspaceId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Workspace",
       default: null,
},
},{ 
    timestamps: true 

});

export default mongoose.model("InterviewId", InterviewSchema);