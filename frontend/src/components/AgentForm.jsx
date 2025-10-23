import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const AgentForm = () => {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  const getAgents = async () => {
    const res = await axios.get("/agents");
    setAgents(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/agents", form);
      setMsg(`Agent "${form.name}" added`);
      setForm({ name: "", email: "", mobile: "", password: "" });
      getAgents();
      setTimeout(() => setMsg(""), 1800);
    } catch {
      setMsg("Failed to add agent");
    }
  };
  useEffect(() => {
    getAgents();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-50 rounded-2xl shadow-lg p-8 md:flex md:gap-8">
      {/* Left - Agent Form */}
      <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4 tracking-tight">
          Add Agent
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="flex flex-col text-sm text-gray-700 font-medium">
            Name
            <input
              required
              className="mt-1 border border-gray-300 rounded-md placeholder-gray-400 placeholder-opacity-70 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Agent name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label className="flex flex-col text-sm text-gray-700 font-medium">
            Email
            <input
              type="email"
              required
              className="mt-1 border border-gray-300 placeholder-gray-400 placeholder-opacity-70 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@mail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          {/* <label className="flex flex-col text-sm text-gray-700 font-medium">
            Mobile
            <input
              type="tel"
              required
              className="mt-1 border border-gray-300 placeholder-gray-400 placeholder-opacity-70 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="+91 987_6543_210"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />
          </label> */}
          <label className="flex flex-col text-sm text-gray-700 font-medium">
            Mobile
            <PhoneInput
              defaultCountry="IN"
              international
              type="tel"
              value={form.mobile}
              onChange={(value) => setForm({ ...form, mobile: value })}
              className="mt-1 border border-gray-300 rounded-md px-3 py-2 w-full 
             focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 bg-white transition-all"
            />
          </label>

          <label className="flex flex-col text-sm  text-gray-700 font-medium">
            Password
            <input
              required
              type="password"
              className="mt-1 border border-gray-300 placeholder-gray-400 placeholder-opacity-70 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          <button
            type="submit"
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all"
          >
            Add Agent
          </button>

          {msg && (
            <span className="text-green-600 font-medium text-sm mt-1">
              {msg}
            </span>
          )}
        </form>
      </div>

      {/* Right - Agent List */}
      <div className="flex-1 bg-white rounded-xl shadow-sm p-6 mt-8 md:mt-0">
        <h3 className="text-lg font-bold text-blue-800 mb-4">
          Existing Agents
        </h3>
        <ul className="space-y-3 overflow-y-auto max-h-72 pr-2">
          {agents.length === 0 ? (
            <li className="italic text-red-400 text-sm">
              No agents added yet.
            </li>
          ) : (
            agents.map((a) => (
              <li
                key={a._id}
                className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition-colors rounded-md px-4 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-blue-500 text-white font-semibold rounded-full w-8 h-8 flex items-center justify-center">
                    {a.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">
                      {a.name}
                    </div>
                    <div className="text-xs text-gray-600">{a.email}</div>
                  </div>
                </div>
                <span className="text-green-700 text-sm font-medium">
                  {a.mobile}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AgentForm;
