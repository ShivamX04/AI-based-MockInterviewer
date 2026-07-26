import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Brain,
  Star,
  BarChart3,
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#070816] text-white">

     {/* ===================== Background ===================== */}
<div className="absolute inset-0 -z-10 overflow-hidden">
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

  {/* Bottom Blue Glow */}
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

  {/* Noise Effect */}
  <div
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage:
        "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\" viewBox=\"0 0 160 160\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')",
    }}
  />
</div>

      {/* Navbar */}
      <nav className=" relative z-10 max-w-7xl mx-auto flex items-center justify-between px-6 py-6">

        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          AI Mock Interview
        </h1>

        <div className="flex border-xl border-color-white gap-4">
 
           <button
                onClick={() => navigate("/login")}
                className="border border-slate-700 hover:border-slate-500 px-7 py-2 rounded-lg transition"
              >
                Login
              </button>

        </div>

      </nav>

                                {/* Hero */}

      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

                                {/* Left */}

          <div>

            <span className="bg-white/5 border border-white/10 text-slate-300 px-3 py-1 rounded-full text-sm">
              AI Powered Interview Platform
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-6">

              Ace your
              <br />

              <span className="text-cyan-400">
                Technical Interviews
              </span>

            </h1>

            <p className="text-slate-300 text-lg mt-6 max-w-xl leading-8">

              Upload your resume, practice AI-generated interview
              questions, receive instant feedback, and track your
              progress—all in one place.

            </p>

            <div className="flex gap-4 mt-10">

              <button
                onClick={() => navigate("/register")}
                className="bg-white text-slate-900 hover:bg-slate-200 px-7 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
              >
                Get Started

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

          {/* Right */}

          <div className="relative">

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">

              <div className="flex justify-between items-center mb-8">

                <div>

                  <h2 className="font-semibold text-lg">
                    Interview Dashboard
                  </h2>

                  <p className="text-slate-400 text-sm">
                    Your latest activity
                  </p>

                </div>

                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  Online
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-[#111827]/70 border border-white/10 rounded-xl p-4">

                  <FileText className="text-cyan-400 mb-3" />

                  <p className="text-sm text-slate-400">
                    Resume Uploaded
                  </p>

                  <h3 className="text-xl font-bold mt-1">
                    ✓ Complete
                  </h3>

                </div>

                <div className="bg-slate-800 rounded-xl p-4">

                  <Brain className="text-cyan-400 mb-3" />

                  <p className="text-sm text-slate-400">
                    AI Questions
                  </p>

                  <h3 className="text-xl font-bold mt-1">
                    15 Generated
                  </h3>

                </div>

                <div className="bg-slate-800 rounded-xl p-4">

                  <Star className="text-cyan-400 mb-3" />

                  <p className="text-sm text-slate-400">
                    Latest Score
                  </p>

                  <h3 className="text-xl font-bold mt-1">
                    92%
                  </h3>

                </div>

                <div className="bg-slate-800 rounded-xl p-4">

                  <BarChart3 className="text-cyan-400 mb-3" />

                  <p className="text-sm text-slate-400">
                    Interviews
                  </p>

                  <h3 className="text-xl font-bold mt-1">
                    18 Completed
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <h2 className="text-3xl font-bold text-center">
            Everything You Need
          </h2>

          <p className="text-slate-400 text-center mt-4 max-w-2xl mx-auto">
            Prepare smarter with AI-powered interviews designed to
            improve your confidence and technical skills.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">

              <FileText className="text-blue-500 mb-4" size={32} />

              <h3 className="font-semibold text-xl">
                Resume Analysis
              </h3>

              <p className="text-slate-400 mt-3">
                Upload your resume and automatically generate
                personalized interview questions.
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

              <Brain className="text-purple-500 mb-4" size={32} />

              <h3 className="font-semibold text-xl">
                AI Evaluation
              </h3>

              <p className="text-slate-400 mt-3">
                Receive detailed feedback and suggestions for every
                answer you give.
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

              <BarChart3 className="text-green-500 mb-4" size={32} />

              <h3 className="font-semibold text-xl">
                Progress Tracking
              </h3>

              <p className="text-slate-400 mt-3">
                Monitor your scores and continuously improve with
                every interview session.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24 px-6">

        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-4xl font-bold">
            Ready to crack your next interview?
          </h2>

          <p className="text-slate-400 mt-5 text-lg">
            Start practicing today with AI-powered mock interviews.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transition"
          >
            Create Account
          </button>

        </div>

      </section>

    </div>
  );
};

export default Landing;