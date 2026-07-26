import fs from "fs";
import pdfParse from "pdf-parse";
import { analyzeResume } from "../services/geminiService.js";
import Resume from "../models/resume.models.js";

export const uploadResumeController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const dataBuffer = fs.readFileSync(req.file.path);

        console.log(req.file);
        console.log(Buffer.isBuffer(dataBuffer));
        console.log(dataBuffer.length);

        console.log("before parsing");
        const pdfData = await pdfParse(dataBuffer);

        console.log("after");
        
        const result = await analyzeResume(pdfData.text);

        const { extractedData, questions } = result;
        
        console.log("Extracted Data: ", extractedData);
        console.log("Generated Questions: ", questions);

        console.log("Uploaded file:", req.file);
        console.log("Filename:", req.file.filename);

        // Update or create the resume document in the database so that resume
        // resume is saved after data is ectracted //
        const resume = await Resume.findOneAndUpdate(
            { userId: req.user._id },
            {
                userId: req.user._id,
                resumePath: req.file.filename,
                extractedData,
                questions
            },
            {
                upsert: true,
                returnDocument: 'after' // Return the updated document
            }
        );

        console.log("Saved resume:", resume);

        console.log("Saved Resume Questions : ", resume.questions);

    
        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            resume,
            questions
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getResumeController = async (req, res) => {
    try {
      const resume = await Resume.findOne({
        userId: req.user._id,
      });

      if(!resume){
        return res.status(404).json({
            success: false,
            message: "Resume not found",
        })
      }
  
      return res.status(200).json({
        success: true,
        resume,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  