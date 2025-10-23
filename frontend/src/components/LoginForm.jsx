import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = "/dashboard";
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 flex items-center justify-center px-4">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-10 w-full max-w-md text-center backdrop-blur-sm">
        {/* Title and Icon */}
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
          <h2 className="text-2xl font-bold text-blue-800">Admin Login</h2>
          <p className="text-gray-500 text-sm mt-1">Access your dashboard securely</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
          {error && (
            <p className="text-sm text-red-500 text-center font-medium bg-red-50 rounded-md py-1">
              {error}
            </p>
          )}

          <div>
            <label className="text-gray-700 text-sm font-semibold">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 border placeholder-gray-400 placeholder-opacity-70 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-gray-700  text-sm font-semibold">Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 border placeholder-gray-400 placeholder-opacity-70  border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded-lg py-2 shadow hover:from-blue-700 hover:to-green-600 transition-all"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>
            Forgot your password?{" "}
            <a href="signup" className="text-blue-600 hover:text-blue-800 font-medium">
              Signup Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
