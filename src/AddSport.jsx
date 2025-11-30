// src/AddSport.jsx
import React, { useEffect, useState } from "react";
import api from "./api";

export default function AddSport() {
  const [sport, setSport] = useState("");
  const [sports, setSports] = useState([]);

  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("success");

  const [showConfirm, setShowConfirm] = useState(false);
  const [sportToDelete, setSportToDelete] = useState(null);

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const showAlert = (msg, type = "success") => {
    setAlert(msg);
    setAlertType(type);
    setTimeout(() => setAlert(""), 2500);
  };

  const loadSports = async () => {
    setLoading(true);
    try {
      const res = await api.get("/sports.php?action=list");
      setSports(res.data || []);
    } catch (e) {
      showAlert("Failed to load sports", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSports();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!sport.trim()) {
      showAlert("Enter a sport name", "error");
      return;
    }

    setActionLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", sport.trim());
      const res = await api.post("/sports.php?action=add", fd);

      if (res.data.success) {
        showAlert("Sport added ✔");
        setSport("");
        await loadSports();
      } else {
        showAlert(res.data.msg, "error");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const updateSport = async (id) => {
    if (!editValue.trim()) {
      showAlert("Enter a name", "error");
      return;
    }

    setActionLoading(true);
    try {
      const fd = new FormData();
      fd.append("id", id);
      fd.append("name", editValue.trim());

      const res = await api.post("/sports.php?action=update", fd);

      if (res.data.success) {
        showAlert("Sport updated ✔");
        setEditing(null);
        setEditValue("");
        await loadSports();
      } else {
        showAlert("Update failed", "error");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const openConfirm = (id) => {
    setSportToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    setActionLoading(true);

    try {
      const fd = new FormData();
      fd.append("id", sportToDelete);

      const res = await api.post("/sports.php?action=delete", fd);

      if (res.data.success) {
        showAlert("Deleted ✔");
        setShowConfirm(false);
        await loadSports();
      } else {
        showAlert("Delete failed", "error");
      }
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-yellow-300 text-black">

      {alert && (
        <div
          className={`mb-4 p-3 text-white rounded ${
            alertType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {alert}
        </div>
      )}

      {/* CONFIRM DELETE */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] sm:w-80">
            <h3 className="font-bold text-yellow-600 mb-2">Delete Sport?</h3>
            <p>This action cannot be undone.</p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD SPORT */}
      <h2 className="text-xl font-bold mb-4">Add Sport</h2>

      <form
        onSubmit={handleAdd}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 bg-white shadow-md rounded-xl border border-yellow-400"
      >
        <input
          type="text"
          className="col-span-2 border px-3 py-2 rounded-lg"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          placeholder="Sport name"
        />

        <button className="bg-yellow-500 text-black rounded-lg py-2 hover:bg-yellow-600 transition">
          {actionLoading ? "Saving..." : "Add"}
        </button>
      </form>

      {/* LIST */}
      <h2 className="text-xl font-bold mb-3">Sports List</h2>

      <div className="overflow-x-auto border rounded-xl shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-yellow-500 text-black font-bold">
            <tr>
              <th className="p-3 text-left">Sport</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sports.map((sp) => (
              <tr key={sp.id} className="border-t hover:bg-yellow-50 transition">

                <td className="p-3">
                  {editing === sp.id ? (
                    <input
                      className="border px-2 py-1 rounded w-full"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  ) : (
                    <span>{sp.sport_name}</span>
                  )}
                </td>

                <td className="p-3 text-center">
                  {editing === sp.id ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => updateSport(sp.id)}
className="
    px-3 py-1 
    bg-blue-600 
    text-white 
    rounded 
    shadow-md 
    hover:bg-blue-700 
    hover:shadow-xl 
    hover:scale-[1.05] 
    transition-all 
    duration-200
  "                      >
                        Save
                      </button>

                      <button
                        onClick={() => {
                          setEditing(null);
                          setEditValue("");
                        }}
className="
    px-3 py-1 
    bg-blue-600 
    text-white 
    rounded 
    shadow-md 
    hover:bg-blue-700 
    hover:shadow-xl 
    hover:scale-[1.05] 
    transition-all 
    duration-200
  "                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-2">
                      <button
className="
    px-3 py-1 
    bg-blue-600 
    text-white 
    rounded 
    shadow-md 
    hover:bg-blue-700 
    hover:shadow-xl 
    hover:scale-[1.05] 
    transition-all 
    duration-200
  "                        onClick={() => {
                          setEditing(sp.id);
                          setEditValue(sp.sport_name);
                        }}
                      >
                        Edit
                      </button>

                      <button
className="
    px-3 py-1 
    bg-red-600 
    text-white 
    rounded 
    shadow-md 
    hover:bg-red-700 
    hover:shadow-xl 
    hover:scale-[1.05] 
    transition-all 
    duration-200
  "                        onClick={() => openConfirm(sp.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
