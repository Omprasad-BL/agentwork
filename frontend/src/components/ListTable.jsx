import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";

const ListTable = () => {
  const [lists, setLists] = useState([]);

  const getLists = async () => {
    const res = await axios.get("/upload/distributed");
    setLists(res.data);
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <div className="w-full max-w-5xl mt-8 mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-7 text-center">
        Assigned Work to Agents
      </h2>
   <div className="flex flex-wrap gap-8 justify-center">
  {lists.length === 0 ? (
    <div className="text-red-400 italic bg-red-50 rounded-lg shadow px-8 py-7 text-lg">
      No tasks assigned yet.
    </div>
  ) : (
    // Filter out agents with no work or no valid ID
    lists.filter((agentList) => agentList.agentId && agentList.entries?.length > 0).length === 0 ? (
      <div className="text-yellow-600 text-lg font-medium bg-yellow-50 rounded-lg shadow px-8 py-7">
        No associated work currently assigned to any agent.
      </div>
    ) : (
      lists
        .filter((agentList) => agentList.agentId && agentList.entries?.length > 0)
        .map((agentList) => (
          <div
            key={agentList.agentId._id}
            className="bg-white rounded-xl shadow-lg w-full max-w-md p-7 flex flex-col items-center"
          >
            {/* Agent header */}
            <div className="flex items-center gap-5 mb-4 w-full">
              <span className="bg-blue-500 text-white text-xl font-bold rounded-full w-11 h-11 flex items-center justify-center shadow">
                {agentList.agentId.name.charAt(0).toUpperCase()}
              </span>
              <div>
                <div className="font-semibold text-blue-900 text-lg">
                  {agentList.agentId.name}
                </div>
                <div className="text-gray-500 text-sm">{agentList.agentId.email}</div>
              </div>
            </div>

            {/* Assignment Table */}
            <table className="w-full border-collapse mt-2">
              <thead>
                <tr className="bg-blue-50">
                  <th className="text-blue-700 font-semibold p-2 text-left">First Name</th>
                  <th className="text-blue-700 font-semibold p-2 text-left">Phone</th>
                  <th className="text-blue-700 font-semibold p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {agentList.entries.map((entry, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="p-2 text-gray-800">{entry.firstName}</td>
                    <td className="p-2 text-gray-700">{entry.phone}</td>
                    <td className="p-2 text-gray-700">{entry.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
    )
  )}
</div>


    </div>
  );
};

export default ListTable;
