import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Mail, Lock, Eye, EyeOff, LogIn, ArrowRight} from "lucide-react";
import api from "../services/api.js";

const Login = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showPassword, ShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try{

            const response = await api.post("/auth/login",{
                email,
                password
            });
            console.log(response.data);

            setMessage("Login succesfull!!");

             setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } catch(error){
            console.log(error); 

            setError(
                error.response?.data?.message || "login failed"
            )
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden flex flex-col">
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
      <nav className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between px-6 py-5">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          AI Mock Interview
        </h1>

        <button
          onClick={() => navigate("/Register")}
          className="text-gray-300 hover:text-white transition"
        >
          Sign Up
        </button>
      </nav>

     <div className="">
      <p className="text-3xl text-bold justify-center flex items-center mt-6">
            Start Practicing AI interviews Today.
          </p>
      </div>

      {/* Card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pb-6">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6">
          <h2 className="text-xl font-bold">Sign In</h2>


          {error && (
            <div className="mt-3 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}


          {/* Email */}
          <div className="mt-6">
            <label className="text-sm text-gray-300">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:border-violet-500"
            />
          </div>

          {/* Password */}
          <div className="mt-3">
            <label className="text-sm text-gray-300">Password</label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 pr-11 text-white placeholder-gray-500 outline-none focus:border-violet-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-8 w-full rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 py-2.5 font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Login In..." : "Sign In"}
            {!loading && <ArrowRight size={18} />}
          </button>

        </div>
      </div>
    </div>
);
}

export default Login;