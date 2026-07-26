import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from '../pages/Login';
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Interview from "../pages/Interview";
import Resume from "../components/ResumeUpload";
import Result from "../pages/Result";
import NotFound from "../pages/NotFound";

function AppRoutes(){
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/resume" element={<Resume/>} />
            <Route path="/interview/:id" element={<Interview/>} />
            <Route path="/result/:id" element={<Result/>} />

            <Route path="*" element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;