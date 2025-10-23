import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axiosInstance";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // frontend confirm validation
    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      // use old axios object post style
      const res = await axios.post("auth/signup", {
        email: email,
        password: password,
      });

      // if backend returns token → save and go to dashboard
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard", { replace: true });
      } else {
        setMsg("Signup successful. Please log in.");
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      setMsg(error.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 px-4">
      <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-8 w-full max-w-sm text-center">
        {/* Header */}
        <div className="mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-blue-500 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7"
              d="M12 11.75c2.071 0 3.75-1.679 3.75-3.75S14.071 4.25 12 4.25a3.75 3.75 0 100 7.5zm-6.25 8.25v-1.5a3 3 0 013-3h6.5a3 3 0 013 3v1.5" />
          </svg>
          <h1 className="text-2xl font-extrabold text-blue-800">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">Sign up to access the dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          {msg && (
            <div
              className={`text-center text-sm py-2 rounded-md ${
                msg.includes("match")
                  ? "bg-red-100 text-red-600"
                  : msg.includes("successful")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {msg}
            </div>
          )}

          <div>
            <label className="text-gray-700 text-sm font-semibold">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 border border-gray-300 placeholder-gray-400 placeholder-opacity-70 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-semibold">Password</label>
            <input
              type="password"
              required
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 border border-gray-300 placeholder-gray-400 placeholder-opacity-70 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm font-semibold">Confirm Password</label>
            <input
              type="password"
              required
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 border border-gray-300 placeholder-gray-400 placeholder-opacity-70 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-green-500 rounded-lg shadow hover:from-blue-700 hover:to-green-600 transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-gray-500 text-sm">
          <p>
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
              Go to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
