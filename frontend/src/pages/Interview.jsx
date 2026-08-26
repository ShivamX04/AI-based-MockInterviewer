import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from "../services/api.js";

import Sidebar from "../components/Sidebar.jsx"
import Header from "../components/Header.jsx"

const Interview = () =>{

    const navigate = useNavigate();

    // get the interview id from the URL params //
    const { id } = useParams();

    // state to hold the interview data fetched from the backend //
    const [interview , setInterview] = useState(null);

                // to contain current question //
    const [currentQuestion, setCurrentQuestion] = useState(0);

               // to contain the answers of the user //
    const [answers, setAnswers] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleNext = () =>{
        if(currentQuestion < interview.questions.length - 1){
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () =>{
        if(currentQuestion > 0){
        setCurrentQuestion(currentQuestion - 1);
        }
    }

    const handleSubmit = async () => {
    try {
        setIsSubmitting(true);

         const response = await api.post(
    `/interview/submit/${id}`,
    { answers }
);

        navigate(`/result/${id}`, {
            state: {
                interviewId: response.data.interviewId,
                score: response.data.score,
                summary: response.data.summary,
                strengths: response.data.strengths,
                weaknesses: response.data.weaknesses,
                feedback: response.data.feedback,
                duration: response.data.duration,
            }
        });

    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.data);
        }

        setIsSubmitting(false);
    }
};

    useEffect(() =>{
        // fetch interview data from backend using the id from the URL //
        const fetchInterview = async () => {
            try{

        // make a GET request to the backend to fetch the interview data //
            const response = await api.get(`/interview/${id}`);

            console.log("Interview data fetched:", response.data);

            // saving the response //
            setInterview(response.data);

             setAnswers(
    response.data.questions.map(() => ({
        answer: "",
        timeTaken: 0,
    }))
);
        }
        catch(error){
            console.error("Error fetching interview data:", error);
        }
    }
        fetchInterview();
    },[id])

    if(!interview){
        return <h2>Loading...</h2>
    }

    return(
        <div className="relative min-h-screen overflow-hidden bg-[#070711] text-white">

                {/* ===================== Background ===================== */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#070711]" />

      {/* Main Purple Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 15%, rgba(118,75,255,0.28) 0%, rgba(118,75,255,0.14) 22%, transparent 60%)",
        }}
      />

      {/* Blue Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(30,144,255,0.10) 0%, transparent 45%)",
        }}
      />

      {/* Left Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 0% 55%, rgba(120,80,255,0.08) 0%, transparent 35%)",
        }}
      />

      {/* Right Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 100% 40%, rgba(120,80,255,0.08) 0%, transparent 35%)",
        }}
      />

      {/* Bottom Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(0,140,255,0.08) 0%, transparent 40%)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\" viewBox=\"0 0 160 160\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')",
        }}
      />
    </div>
    
        <div className="relative z-10 flex min-h-screen">
            <Sidebar />

        <div className="flex flex-1 flex-col min-w-0">
        <Header
    title={interview.title}
    showMoreOptions={true}
    isPinned={interview.isPinned}
    onPin={handlePin}
    onDelete={handleDelete}
/>

     <main className="flex-1 overflow-y-auto px-8 py-10">
  <div className="mx-auto max-w-5xl">

    {/* Floating Question Badge */}
    <div className="mb-2 flex justify-center">
      <div className="rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 backdrop-blur-xl">
        <span className="text-sm font-medium text-violet-300">
          Question {currentQuestion + 1} of {interview.questions.length}
        </span>
      </div>
    </div>

    {/* Main Card */}
    <div className="rounded-[32px] ml-14 max-w-4xl border border-white/10 bg-white/5 p-8 shadow-[0_0_80px_rgba(124,58,237,0.15)] backdrop-blur-xl">

      {/* Topic */}
      <p className="mb-5 uppercase tracking-[0.25em] text-sm text-violet-300">
        {interview.questions[currentQuestion].topic}
      </p>

      {/* Question */}
      <h1 className="text- font-semibold leading-relaxed text-white">
        <span className="mr-3 text-violet-400">Q.</span>

        {interview.questions[currentQuestion].question}
      </h1>

      {/* Divider */}
      <div className="my-6 h-px bg-white/10" />

      {/* Answer Box */}
      <div className="rounded-3xl border border-white/10 bg-[#11131f]/70 p-6">

        <textarea
          className="
          h-20
          w-full
          resize-none
          bg-transparent
          text-m
          outline-none
          placeholder:text-gray-500
          transition-all
          "
          placeholder="Type your answer here..."
          value={answers[currentQuestion]?.answer || ""}
           onChange={(e) => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = {
        ...updatedAnswers[currentQuestion],
        answer: e.target.value,
    };

    setAnswers(updatedAnswers);
}}
        />

        <div className="mt-4 flex justify-end text-sm text-gray-500">
          {answers[currentQuestion]?.answer?.length || 0}/2000
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-10 flex items-center justify-between">

        <button
          disabled={currentQuestion === 0}
          onClick={handlePrevious}
          className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          px-8
          py-3
          transition
          hover:bg-white/10
          disabled:opacity-40
          "
        >
          ← Previous
        </button>

        <div className="text-sm text-gray-400">
          💡 Take your time. Think clearly.
        </div>

        {currentQuestion === interview.questions.length - 1 ? (
          <button
    onClick={handleSubmit}
    disabled={isSubmitting}
    className="
        rounded-xl
        bg-gradient-to-r
        from-violet-600
        to-indigo-600
        px-8
        py-3
        font-medium
        transition
        hover:scale-105
        disabled:cursor-not-allowed
        disabled:opacity-80
        flex
        items-center
        justify-center
        gap-2
    "
>
    {isSubmitting ? (
        <>
            <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Submitting...
        </>
    ) : (
        "Submit →"
    )}
</button>
        ) : (
          <button
            onClick={handleNext}
            className="
            rounded-xl
            bg-gradient-to-r
            from-violet-600
            to-indigo-600
            px-8
            py-3
            font-medium
            transition
            hover:scale-105
            "
          >
            Next →
          </button>
        )}

      </div>

    </div>

  </div>
</main>
        </div>
        </div>
        </div>
    )
}

export default Interview;