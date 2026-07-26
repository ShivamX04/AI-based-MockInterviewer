import {
  Briefcase,
  Clock3,
  Target,
  Upload,
  FileText,
  CheckCircle,
} from "lucide-react";

const CreateInterviewCard = ({
  title,
  setTitle,
  role,
  setRole,
  experience,
  setExperience,
  interviewType,
  setInterviewType,
  uploading,
  resumeUploaded,
  startingInterview,
  handleFileChange,
  handleSubmitInterview,
}) => {
  return (
    <div className="mt-1 w-full rounded-lg border border-white/10 bg-[#131522]/80 backdrop-blur-xl p-6">

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">

        <div>

          <h2 className="mb-4 text-2xl font-semibold text-white">
            Create AI Interview
          </h2>

          <div className="space-y-2.5">

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                <FileText size={16} />
                Interview Title
              </label>

              <input
                type="text"
                placeholder="Frontend Interview"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-10 w-[90%] rounded-lg border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                <Briefcase size={16} />
                Role
              </label>

              <input
                type="text"
                placeholder="Backend Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="h-10 w-[90%] rounded-lg border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                <Clock3 size={16} />
                Experience
              </label>

              <input
                type="text"
                placeholder="1 Year"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="h-10 w-[90%] rounded-lg border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                <Target size={16} />
                Interview Type
              </label>

              <input
                type="text"
                placeholder="Technical"
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="h-10 w-[90%] rounded-lg border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-violet-500"
              />
            </div>

          </div>

          <button
            onClick={handleSubmitInterview}
            disabled={startingInterview}
            className="mt-7 w-full rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700 lg:w-2/5"
          >
            {startingInterview ? "Starting..." : "Start Interview"}
          </button>
        </div>

        <div className="border-l border-white/10 pl-8">

          <h2 className="text-lg font-semibold text-white">Resume</h2>

          <p className="mt-2 text-sm text-zinc-400">
            Upload your resume to get personalized questions.
          </p>

          <input
            id="resume-upload"
            type="file"
            hidden
            accept=".pdf"
            onChange={handleFileChange}
          />

          <label
            htmlFor={uploading ? undefined : "resume-upload"}
            className="mt-2 w-full h-[280px] rounded-2xl border-4 border-dashed border-white/10 hover:border-violet-500 transition cursor-pointer flex flex-col items-center justify-center px-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15">
              <Upload size={32} className="text-indigo-400" />
            </div>

            <h3 className="mt-6 text-m font-semibold text-white">
              Drag & Drop your resume here
            </h3>

            <p className="mt-2 text-zinc-500">or</p>

            <span className="mt-4 inline-flex items-center justify-center h-10 w-36 rounded-lg bg-white/10 text-sm text-white hover:bg-white/15 transition">
              {uploading ? "Uploading..." : "Browse Files"}
            </span>

            <p className="mt-3 text-sm text-zinc-500">
              Supported format: PDF (Max 5MB)
            </p>
          </label>

          {resumeUploaded && (
            <div className="mt-5 h-[15%] flex items-center justify-between rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500/20">
                  <CheckCircle className="text-green-500" />
                </div>

                <div>
                  <p className="font-medium text-white">Resume.pdf</p>
                  <p className="text-sm text-green-400">Uploaded successfully</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default CreateInterviewCard;
