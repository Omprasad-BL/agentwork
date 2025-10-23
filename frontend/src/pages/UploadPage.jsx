import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
// Example: import { CloudArrowUpIcon } from '@heroicons/react/24/outline' (if using Heroicons, else use SVG below)

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMsg("Please upload a file");

    const data = new FormData();
    data.append("file", file);

    try {
      await axios.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg("Uploaded and distributed successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard", { replace: true }), 700);
    } catch {
      setMsg("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-green-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center w-full max-w-lg">
        {/* Cloud upload SVG icon */}
        <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-16 w-16 text-blue-400 mb-5 mx-auto"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 16v-4m0 0l-2 2m2-2l2 2m-2-2V4M6 16a6 6 0 0 1 12 0v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1z"
  />
</svg>

        <h2 className="text-2xl font-extrabold text-blue-700 mb-3">
          Upload CSV/XLSX
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Upload your list file to distribute work to agents.</p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-5">
          <input
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              cursor-pointer"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold py-2 px-8 rounded-lg shadow hover:from-blue-600 hover:to-green-500 transition-all"
          >
            Upload
          </button>
        </form>
        {msg && <p className="mt-6 text-center text-lg font-semibold text-blue-700 animate-pulse">{msg}</p>}
      </div>
    </div>
  );
};

export default UploadPage;
