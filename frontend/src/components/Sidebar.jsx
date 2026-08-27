import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api.js";
import SidebarScrollArea from "./SidebarScrollArea.jsx";

const Sidebar = () => {
  const [interviews, setInterviews] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [resume, setResume] = useState(null);

  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false)


  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () =>{
    try{
      await api.post("/auth/logout");

      navigate("/login", { replace : true });
    } catch (err){
      console.log(err);
    }
  }

  const handleCreateWorkspace = async () => {
  if (!workspaceName.trim()) return;

  try {
    const res = await api.post("/workspaces", {
      name: workspaceName,
    });

    setWorkspaceName("");
    setShowWorkspaceModal(false);

     await fetchWorkspaces();
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Failed to create workspace");
  }
};

  const fetchHistory = async (search = "") => {
    try {
      const response = await api.get(
        `/interview/history?search=${encodeURIComponent(search)}`,
        {
          withCredentials: true,
        }
      );

      setInterviews(response.data.interviews);
    } catch (error) {
      console.log("Error fetching interview history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();

    const fetchResume = async () => {
      try {
        const response = await api.get("/resume/get", {
          withCredentials: true,
        });

        setResume(response.data.resume);

        console.log(response.data.resume.resumePath);
      } catch (error) {
        console.log("Error fetching resume:", error);
      }
    };

    fetchResume();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchHistory(debouncedSearch);
  }, [location.pathname, debouncedSearch]);


  useEffect(() => {
     
     const getUser = async () =>{
      try{
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch(err){
        console.log(err);
      }
     };

     getUser();
  }, []);

  const navBtn =
    "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-zinc-200 hover:bg-white/10 transition-all duration-200";

  const collapsedBtn =
    "h-10 w-10 mx-auto grid place-items-center rounded-xl text-zinc-200 hover:bg-white/10 transition-all duration-200";

  return (
    <aside
      className={[
        "h-screen flex flex-col shrink-0 bg-white/[0.03] backdrop-blur-2xl border-r border-white/10 text-zinc-100 transition-[width] duration-200 ease-out",
        collapsed ? "w-16" : "w-[260px]",
      ].join(" ")}
    >
      <SidebarScrollArea
        className={collapsed ? "flex-1" : "flex-1 px-2"}
      >
        <div
          className={
            collapsed
              ? "flex flex-col gap-1 pt-2"
              : "flex flex-col gap-1 p-2"
          }
        >
          {/* Toggle */}
          <div
            className={
              collapsed
                ? "flex justify-center"
                : "flex justify-end"
            }
          >
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="h-9 w-9 grid place-items-center rounded-lg text-zinc-300 hover:bg-[#2f2f2f]"
            >
              <i className="ri-layout-left-line text-lg"></i>
            </button>
          </div>

          {/* Resume */}
         {resume && (
  <button
    onClick={() =>
      window.open(
        `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${resume.resumePath}`,
        "_blank"
      )
    }
    className={collapsed ? collapsedBtn : navBtn}
    title="Resume"
  >
    <i className="ri-file-text-line text-lg"></i>
    {!collapsed && <span>Resume</span>}
  </button>
)}

          
        {/* Search */}
        {collapsed ? (
          <button
            className={collapsedBtn}
            title="Search"
            onClick={() => {
              setCollapsed(false);
              setShowSearch(true);
            }}
          >
            <i className="ri-search-line text-lg"></i>
          </button>
        ) : showSearch ? (
          <div className="relative px-3 py-2">
            <i className="ri-search-line absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400"></i>

            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search interviews..."
              className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl py-2 pl-10 pr-10 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none"
            />
 
            <button
              onClick={() => {
                setShowSearch(false);
                setSearch("");
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        ) : (
          <button
            className={navBtn}
            title="Search"
            onClick={() => setShowSearch(true)}
          >
            <i className="ri-search-line text-lg"></i>
            <span className="text-zinc-300">Search interviews</span>
          </button>
        )}
        </div>

        {!collapsed && (
  <>
    {interviews.length > 0 && (
      <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
        Recents
      </p>
    )}

    {interviews.length > 0 ? (
      <ul className="space-y-1 px-2">
        {interviews.map((interview) => {
          const to = `/result/${interview._id}`;
          const isActive = location.pathname === to;

          return (
            <li key={interview._id}>
              <button
                onClick={() => navigate(to)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-violet-500/20 border border-violet-500/30 text-white"
                    : "border border-transparent text-zinc-300 hover:bg-white/10 hover:border-white/10 hover:text-white"
                }`}
              >
                <i className="ri-chat-3-line text-base flex-shrink-0"></i>

                <span className="truncate flex-1">
                  {interview.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    ) : (
      <p className="px-3 py-2 text-sm text-zinc-500">
        No interviews found
      </p>
    )}
  </>
)}

      </SidebarScrollArea>

                       {/* Footer */}
    
      <div className="relative p-2">
  <button
    onClick={() => setUserMenuOpen(!userMenuOpen)}
    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-white/10"
  >
    <div className="flex text-xl h-8 w-8 px-3 rounded-full bg-blue-300 text-white font-semibold">
      {user?.username?.charAt(0)}
    </div>

    {!collapsed && (
      <>
        <div className="flex-1 text-left">
          <p className="text-m font-medium text-white">
            {user?.username}
          </p>
        </div>

        <i
          className={`ri-arrow-down-s-line text-zinc-400 transition ${
            userMenuOpen ? "rotate-180" : ""
          }`}
        />
      </>
    )}
  </button>

  {/* ADD THIS BELOW YOUR BUTTON */}
  {userMenuOpen && (
    <div className="absolute bottom-14 left-2 right-2 z-50 rounded-xl bg-[#212121] border border-white/10 shadow-lg p-2">

      <div className="my-2 border-t border-white/10"></div>

      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-400 hover:bg-red-500/10"
      >
        <i className="ri-logout-box-r-line"></i>
        <span>Logout</span>
      </button>

    </div>
  )}
</div>
    </aside>
  );
};

export default Sidebar;