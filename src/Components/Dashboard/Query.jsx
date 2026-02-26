import { Trash2 } from "lucide-react";
import { useState } from "react";
const Query = ({ setIsLogin }) => {
  const [allQueries, setAllQueries] = useState(() => {
    const savedData = localStorage.getItem("QUERY");
    return savedData ? JSON.parse(savedData) : [];
  });

  const handleDelete = (e, id) => {
    e.preventDefault();
    // find the Id of query
    const updatedQueries = allQueries.filter((q) => q.id !== id);
    // Update state
    setAllQueries(updatedQueries);
    // Update localStorage
    localStorage.setItem("QUERY", JSON.stringify(updatedQueries));
  };

  return (
    <div className="min-h-screen p-3 sm:p-5 md:p-8 bg-gray-100">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 p-4 sm:p-6">
          Queries
        </h1>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto overflow-y-auto max-h-[400px] border-t border-gray-200">
          <table className=" min-w-[700px] w-full text-left border-collapse">
            <thead className="bg-gray-700 text-white text-sm sm:text-base">
              <tr>
                <th className="px-3 sm:px-4 py-2">Name</th>
                <th className="px-3 sm:px-4 py-2">Email</th>
                <th className="px-3 sm:px-4 py-2">Subject</th>
                <th className="px-3 sm:px-4 py-2">Phone</th>
                <th className="px-3 sm:px-4 py-2">Message</th>
                <th className="px-3 sm:px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm sm:text-base">
              {allQueries.length > 0 ? (
                allQueries.map((q, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-3 sm:px-4 py-4 whitespace-nowrap">
                      {q.name}
                    </td>
                    <td className="px-3 sm:px-4 py-4 break-all">{q.email}</td>
                    <td className="px-3 sm:px-4 py-4">{q.subject}</td>
                    <td className="px-3 sm:px-4 py-4 whitespace-nowrap">
                      {q.phone}
                    </td>
                    <td className="px-3 sm:px-4 py-4 max-w-xs break-words">
                      {q.message}
                    </td>
                    <td>
                      {/* Delete */}
                      <button onClick={(e) => handleDelete(e, q.id)}>
                        <Trash2
                          size={30}
                          className="bg-red-600 hover:bg-red-700 p-1 text-white rounded-full m-5 ml-10 "
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No Queries Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Query;
