import Interview from '../models/interview.models.js';
import { evaluateInterview } from '../services/geminiService.js';
import Resume from "../models/resume.models.js"

export const startInterviewController = async (req, res) => {
    try {
        const { title, role, experience, interviewType } = req.body;

        if(!role || !experience || !interviewType){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

         if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - user not found in request",
            });
        }

        const resume = await Resume.findOne({
            userId: req.user._id
        });


if (!resume) {
    return res.status(404).json({
        success: false,
        message: "Please upload your resume before starting the interview."
    });
}

        console.log("Resume:", resume);

        console.log("Resume Questions:", resume.questions);

        console.log("Questions Length:", resume.questions.length);

        console.log("resume.questions:");
console.dir(resume.questions, { depth: null });

console.log("Is Array?", Array.isArray(resume.questions));
        const interview = await Interview.create({
            userId: req.user._id,
            title,
            role,
            experience,
            interviewType,
            questions: resume.questions,
            startedAt: new Date(),
        });

        console.log("Saved Interview:");
        console.dir(interview.toObject(), { depth: null });

        return res.status(200).json({
            success: true,
            interviewId: interview._id,
        });

    }catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
}

};

export const getInterviewById = async (req, res) =>{
    try{
        const interviewId = req.params.id;

        const interview = await Interview.findById(interviewId);

        if(!interview){
            return res.status(404).json({
                success: false,
                message: "Interview not found",
            });
        }
                        // ownership check //
            // this comes from database cause of creation & this
            //  from authMiddleware after authentication //
        if(interview.userId.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success: false,
                message: "Forbidden - you do not have access to this interview",
            });
        }

        return res.status(200).json(interview);

    } catch(error){
        return res.status(500).json({
           success: false,
           message: error.message,
        })
    }
}

export const sumbitInterviewController = async (req, res) => {
    try {
        const interviewId = req.params.id;
        const { answers } = req.body;

        const interview = await Interview.findById(interviewId);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found",
            });
        }

        if (interview.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Forbidden - you do not have access to this interview",
            });
        }

        // Save answers
        interview.answers = answers;

        // Evaluate interview
        const result = await evaluateInterview(
            interview.questions,
            interview.answers
        );

        console.log("Gemini Evaluate Result:", result);

        // Save Gemini evaluation
        interview.score = result.score;
        interview.feedback = result.feedback;
        interview.strengths = result.strengths;
        interview.weaknesses = result.weaknesses;
        interview.feedback = result.feedback;
        interview.summary = result.summary;

        // Save interview end time
        interview.endedAt = new Date();

        // Calculate duration in seconds
        interview.duration = Math.floor(
            (interview.endedAt - interview.startedAt) / 1000
        );

        console.log("Interview Score:", interview.score);
        console.log("Interview Feedback:", interview.feedback);
        console.log("Interview Duration:", interview.duration, "seconds");

        await interview.save();

        res.status(200).json({
            success: true,
            message: "Interview submitted successfully",

            interviewId: interview._id,
            score: interview.score,
            summary: interview.summary,
            strengths: interview.strengths,
            weaknesses: interview.weaknesses,
            feedback: interview.feedback,
            duration: interview.duration,

        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getInterviewHistoryController = async (req, res) => {
    try {
        const { search = "" } = req.query;

        const interviews = await Interview.find({
            userId: req.user._id,
            title: {
                $regex: search,
                $options: "i", // Case-insensitive search
            },
        })
            .select("title score createdAt")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            interviews,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const interviews = await Interview.find({ userId });

    const totalInterviews = interviews.length;

    const bestScore =
      interviews.length > 0
        ? Math.max(...interviews.map((i) => i.score || 0))
        : 0;

    const averageScore =
      interviews.length > 0
        ? Math.round(
            interviews.reduce((sum, i) => sum + (i.score || 0), 0) /
              interviews.length
          )
        : 0;

    // duration is stored in seconds
    const totalSeconds = interviews.reduce(
      (sum, interview) => sum + (interview.duration || 0),
      0
    );

    const practiceMinutes = Math.floor(totalSeconds / 60);

    res.status(200).json({
      totalInterviews,
      averageScore,
      bestScore,
      practiceMinutes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats",
    });
  }
};