import React, { useState } from "react";

export default function SmartTableExample({ members }) {
  const [details, setDetails] = useState([]);

  const getBadge = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-600 text-white";
      case "unpaid":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const toggleDetails = (cin) => {
    setDetails((prev) =>
      prev.includes(cin) ? prev.filter((id) => id !== cin) : [...prev, cin]
    );
  };

  return (
    <div className="p-4">

      <div className="overflow-x-auto shadow-xl border border-yellow-600 rounded-lg">
        <table className="min-w-full divide-y divide-yellow-700 text-white bg-black">
          <thead className="bg-yellow-600 text-black">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-bold uppercase">CIN</th>
              <th className="px-4 py-3 text-left text-sm font-bold uppercase">Name</th>
              <th className="px-4 py-3 text-left text-sm font-bold uppercase">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-bold uppercase">Sport</th>
              <th className="px-4 py-3 text-left text-sm font-bold uppercase">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {members.map((item) => (
              <React.Fragment key={item.cin}>
                {/* === MAIN ROW === */}
                <tr className="hover:bg-yellow-500 hover:text-black transition">
                  <td className="px-4 py-3">{item.cin}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.phone}</td>
                  <td className="px-4 py-3">{item.sport_name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadge(item.statut_paiement)}`}>
                      {item.statut_paiement}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleDetails(item.cin)}
                      className="px-3 py-1 rounded border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition"
                    >
                      {details.includes(item.cin) ? "Hide" : "Show"}
                    </button>
                  </td>
                </tr>

                {/* === DETAILS ROW === */}
                {details.includes(item.cin) && (
                  <tr className="bg-gray-900">
                    <td colSpan="6" className="px-6 py-4">
                      <h4 className="text-lg font-bold text-yellow-400">{item.name}</h4>
                      <div className="mt-2 space-y-1 text-gray-300">
                        <p><span className="font-semibold text-yellow-500">CIN:</span> {item.cin}</p>
                        <p><span className="font-semibold text-yellow-500">Phone:</span> {item.phone}</p>
                        <p><span className="font-semibold text-yellow-500">Sport:</span> {item.sport_name}</p>
                      </div>

                      <div className="mt-4 flex gap-3">
                        <button className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition">
                          Edit
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
