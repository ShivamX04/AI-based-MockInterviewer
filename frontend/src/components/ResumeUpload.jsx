import { useEffect, useState } from "react";
import api from "../services/api";

const Resume = () => {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get("/resume/get");

        console.log(res.data);

        if (res.data.resume?.resumePath) {
          setPdfUrl(
            `http://localhost:5000/uploads/${res.data.resume.resumePath}`
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchResume();
  }, []);

  if (!pdfUrl) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Resume...
      </div>
    )
  }

  return (
    <iframe
      src={pdfUrl}
      title="Resume"
      className="w-full h-screen border-0"
    />
  );
};

export default Resume;