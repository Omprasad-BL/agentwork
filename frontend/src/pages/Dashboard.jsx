import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AgentForm from "../components/AgentForm";
import ListTable from "../components/ListTable";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Handle logout and redirect
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-50 pb-8 via-blue-50 to-green-50">
      <nav className="w-full flex justify-between items-center px-7 py-5 bg-white/90 shadow-md rounded-b-lg mb-10">
  <h1 className="text-2xl font-bold text-blue-800 tracking-wide">
    Admin Dashboard
  </h1>
  <div className="flex items-center gap-4">
    <Link
      to="/upload"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded shadow transition-colors"
    >
      Upload Lists
    </Link>
    <button
      onClick={handleLogout}
      className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-5 rounded shadow transition-colors"
    >
      Logout
    </button>
  </div>
</nav>


      <section>
        <AgentForm />
      </section>

      <section>
        <ListTable />
      </section>
    </div>
  );
};

export default Dashboard;
