import { useLocation, useNavigate , useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";

const Result = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [interview , setInterview ] = useState(location.state || null)


  const interviewId = interview?._id;
  const score = interview?.score;
  const summary = interview?.summary;
  const strengths = interview?.strengths || [];
  const weaknesses = interview?.weaknesses || [];
  const feedback = interview?.feedback || "";
  const duration = interview?.duration || 0;

   useEffect(() => {
    if (location.state) return;

    const fetchInterview = async () => {
        try {
            const res = await api.get(`/interview/${id}`, {
                withCredentials: true,
            });
            console.log("API Response: ", res.data);

            setInterview(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    fetchInterview();
}, [id, location.state]);

  const handlePin = async () => {
  try {
    // Replace this endpoint with your actual pin API
    await api.patch(`/interview/${interview._id}/pin`, {}, {
      withCredentials: true,
    });

    // Update local state so the UI changes immediately
    setInterview((prev) => ({
      ...prev,
      isPinned: !prev.isPinned,
    }));

    console.log("Interview pin status updated");
  } catch (err) {
    console.error(err);
  }
};

const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Delete this interview? This action cannot be undone."
  );

  if (!confirmDelete) return;

  try {
    // Replace this endpoint with your actual delete API
    await api.delete(`/interview/${interview._id}`, {
      withCredentials: true,
    });

    alert("Interview deleted successfully.");

    navigate("/dashboard");
  } catch (err) {
    console.error(err);
  }
};

   if (!interview) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070711] text-white">
      Loading...
    </div>
  );
}

  return (
    <div className="min-h-screen overflow-hidden bg-[#070711] text-white">

      {/* ================= Background ================= */}

      <div className="absolute inset-0 z-0">

        <div className="absolute inset-0 bg-[#070711]" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 15%, rgba(118,75,255,.28) 0%, transparent 55%)",
          }}
        />

      </div>

      {/* ================= Layout ================= */}

      <div className="relative z-10 flex min-h-screen">

        <div className="flex flex-1 flex-col min-w-0">

           <Header
    
    showMoreOptions={true}
    isPinned={interview.isPinned}
    onPin={handlePin}
    onDelete={handleDelete}
/>

          {/* ================= Scroll Container ================= */}

          <main className="flex-1 overflow-y-auto snap-y snap-mandatory scroll-smooth">

            {/* ===================================================== */}
            {/* ==================== PAGE 1 ========================= */}
            {/* ===================================================== */}

            <section className="min-h-screen snap-start px-10">

              <div className="px-8 py-8">

                {/* ================= Heading ================= */}

                <div className="text-center">

                  <h1 className="text-3xl font-bold">
                    Interview Completed 🎉
                  </h1>

                  <p className="mt-3 text-gray-400">
                    Great job! Here's your AI evaluation.
                  </p>

                </div>

                {/* ================= Divider ================= */}

                <div className="my-4 h-px bg-white/10" />

                {/* ================= Completed On ================= */}

                <div className="mb-10 flex items-center justify-center gap-2 text-sm text-gray-400">

                  <span>📅</span>

                  <span>
                    Completed on{" "}
                    <span className="text-white">
                      21 Jul 2026
                    </span>

                    {" • "}

                    <span className="text-white">
                      3:42 PM
                    </span>
                  </span>

                </div>

                                {/* ================= Stats Section ================= */}

                <div className="grid grid-cols-12 gap-6">

                  {/* ================= Left Stats ================= */}

                  <div className="col-span-12 lg:col-span-4">

                    <div className="grid grid-cols-2 gap-4">

                      {/* Questions */}

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

                        <div className="text-2xl">📝</div>

                        <p className="mt-2 text-xs text-gray-400">
                          Questions Attempted
                        </p>

                        <h2 className="mt-2 text-xl font-bold">
                          10 / 10
                        </h2>

                      </div>

                      {/* Score */}

                      <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-indigo-500/5 p-5 shadow-[0_0_30px_rgba(124,58,237,.18)]">

                        <div className="text-2xl">🏆</div>

                        <p className="mt-2 text-xs text-gray-400">
                          Overall Score
                        </p>

                        <h2 className="mt-2 text-xl font-bold text-violet-400">
                          {interview?.score}%
                        </h2>

                      </div>

                      {/* Duration */}

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

                        <div className="text-2xl">⏱</div>

                        <p className="mt-2 text-xs text-gray-400">
                          Duration
                        </p>

                        {Math.floor(duration / 60)}m {duration % 60}s

                      </div>

                      {/* Avg Response */}

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

                        <div className="text-2xl">⚡</div>

                        <p className="mt-2 text-xs text-gray-400">
                          Avg Response Time
                        </p>

                        <h2 className="mt-2 text-xl font-bold">
                          1m 50s
                        </h2>

                      </div>

                    </div>

                  </div>

                  {/* ================= Right Summary ================= */}

                  <div className="col-span-12 lg:col-span-8">

                    <div className="h-[80%] rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-indigo-500/5 p-8">

                      <h2 className="text-2xl font-semibold text-violet-300">
                        🤖 AI Summary
                      </h2>

                      <p className="mt-5 leading-8 text-gray-300">
                         {summary?.length > 350
                            ? summary.slice(0, 350) + "..."
                            : summary}
                      </p>

                    </div>

                  </div>

                </div>


                {/* ================= Scroll Button ================= */}

            <div className="mt-16 flex flex-col items-center text-violet-400">

  <p className="text-sm font-medium">
    Scroll to view strengths & weaknesses
  </p>

  <svg
    className="mt-3 h-8 w-8 animate-bounce"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 9l-7 7-7-7"
    />
  </svg>

</div>
              </div>

            </section>

                        {/* ===================================================== */}
            {/* ==================== PAGE 2 ========================= */}
            {/* ===================================================== */}

            <section
              id="analysis"
              className="min-h-screen snap-start px-10 py-8"
            >

              <div className="px-8 py-8">

                {/* ================= Header ================= */}

                <div className="flex items-center justify-between">

                  <div>

                    <h1 className="text-3xl font-bold">
                      Detailed Analysis
                    </h1>

                    <p className="mt-2 text-gray-400">
                      Here's a complete breakdown of your interview performance.
                    </p>

                  </div>

                 

                </div>

                {/* Divider */}

                <div className="my-8 h-px bg-white/10" />

                {/* ================= Strengths & Weaknesses ================= */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* Strengths */}

                  <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-7">

                    <h2 className="text-2xl font-semibold text-green-400">
                      ✅ Strengths
                    </h2>

                    <ul className="mt-4 space-y-4 text-gray-300">
                        {strengths?.map((item, index) => (
                    <li key={index}>• {item}</li>
                      ))}
                  </ul>

                  </div>

                  {/* Weaknesses */}

                  <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-7">

                    <h2 className="text-2xl font-semibold text-yellow-400">
                      ⚠ Weaknesses
                    </h2>

                    <ul className="mt-4 space-y-4 text-gray-300">
                      {weaknesses?.map((item, index) => (
                      <li key={index}>• {item}</li>
                      ))}
                    </ul>

                  </div>

                </div>

                {/* ================= AI Feedback ================= */}

                <div className="mt-8 rounded-3xl border border-white/10 bg-[#11131f]/70 p-8">

                  <h2 className="text-2xl font-semibold">
                    🤖 Complete AI Feedback
                  </h2>

                   <p className="mt-5 leading-8 text-gray-300">
                         {feedback}
                    </p>

                </div>

                {/* ================= Footer ================= */}

        
                 {/* ================= Buttons ================= */}

                <div className="mt-10 flex flex-wrap items-center justify-center gap-5">

                  <button
                    onClick={() => navigate("/dashboard")}
                    className="rounded-xl border border-white/10 px-8 py-3 transition hover:border-violet-500/30 hover:bg-white/5"
                  >
                    Dashboard
                  </button>

                  <button
  onClick={() => navigate(`/interview/${id}`)}
  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 font-medium transition-all duration-300 hover:scale-105"
>
  Practice Again
</button>

                </div>

              </div>

            </section>

      </main>

        </div>

      </div>

    </div>
  );
};

export default Result;