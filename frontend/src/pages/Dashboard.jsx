import api from "../services/api.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import StatsCards from "../components/StatsCards.jsx";
import CreateInterviewCard from "../components/CreateInterviewCard.jsx";
import TipsCard from "../components/TipsCard.jsx";
import QuoteCard from "../components/QuoteCard.jsx";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [interviewType, setInterviewType] = useState("");

  const [uploading, setUploading] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [startingInterview, setStartingInterview] = useState(false);

  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    bestScore: 0,
    practiceMinutes: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/interview/dashboard/stats");
        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("resume", file);
      formData.append("role", role);
      formData.append("experience", experience);

      await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResumeUploaded(true);
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitInterview = async () => {
    if (!resumeUploaded) {
      return alert("Please upload your resume first.");
    }

    try {
      setStartingInterview(true);

      const response = await api.post("/interview/start", {
        title,
        role,
        experience,
        interviewType,
      });

      navigate(`/interview/${response.data.interviewId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setStartingInterview(false);
    }
  };

  return (
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

    {/* ===================== Dashboard ===================== */}
    <div className="relative z-10 flex min-h-screen">

      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <Header title="AI Mock Interview" />

        <main className="flex-1 px-6 py-4">
          <StatsCards stats={stats} />

          <div className="mt-2 grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-6 items-start">
            <CreateInterviewCard
              title={title}
              setTitle={setTitle}
              role={role}
              setRole={setRole}
              experience={experience}
              setExperience={setExperience}
              interviewType={interviewType}
              setInterviewType={setInterviewType}
              uploading={uploading}
              resumeUploaded={resumeUploaded}
              startingInterview={startingInterview}
              handleFileChange={handleFileChange}
              handleSubmitInterview={handleSubmitInterview}
            />

            <div className="flex flex-col h-full">
              <TipsCard />
              <QuoteCard />
            </div>
          </div>
        </main>
      </div>

    </div>

  </div>
);
};

export default Dashboard;