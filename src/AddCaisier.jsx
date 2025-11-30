import React, { useState, useEffect } from "react";
import api from "./api";
import { sendMessage } from "./sendMessage"; // 👈 ضيف هاد السطر

export default function AddCaisier() {
  const [fullname, setFullname] = useState("");
  const [cin, setCin] = useState("");
  const [password, setPassword] = useState("");

  const [caisiers, setCaisiers] = useState([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [phone, setPhone] = useState("");
  function normalizeMoroccoPhone(phone) {
  phone = phone.replace(/\s+/g, "");

  if (phone.startsWith("+212")) {
    return phone;
  }

  if (phone.startsWith("0")) {
    return "+212" + phone.substring(1);
  }

  if (/^\d+$/.test(phone)) {
    return "+212" + phone;
  }

  return phone; // fallback
}


  const showAlert = (msg, type = "success") => {
    setAlert(msg);
    setAlertType(type);
    setTimeout(() => setAlert(""), 2000);
  };

  const loadCaisiers = async () => {
    const res = await api.get("/caisiers.php?action=list");
    setCaisiers(res.data || []);
  };

  useEffect(() => {
    loadCaisiers();
  }, []);


const addCaisier = async () => {
  if (!fullname || !cin || !password || !phone) {
    showAlert("Fill all fields", "error");
    return;
  }
const fixedPhone = normalizeMoroccoPhone(phone);

  const fd = new FormData();
  fd.append("fullname", fullname);
  fd.append("cin", cin);
  fd.append("password", password);
  fd.append("phone", fixedPhone);

  const res = await api.post("/caisiers.php?action=add", fd);
  
  if (res.data.success) {

    const msg = `
    👋 مرحبا ${fullname} !
    تم إنشاء حسابك ككـــاسيير بنجاح ✔

    🔐 معلومات الدخول:
    • CIN: ${cin}
    • Password: ${password}

    📌 يمكنك تسجيل الدخول الآن من الصفحة:
    https://rachid-gym.com/login

    مرحبا بك مع فريق Rachid Gym 💛💪
        `;

    sendMessage(phone, msg);

    showAlert("Caisier added ✔", "success");

    // reset inputs
    setFullname("");
    setCin("");
    setPassword("");
    setPhone("");

    loadCaisiers();

  } else {
    showAlert(res.data.msg, "error");
  }
};


  // OPEN CONFIRM MODAL
  const openConfirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // DELETE CAISIER
  const confirmDelete = async () => {
    const fd = new FormData();
    fd.append("id", deleteId);
    fd.append("phone", phone);


    await api.post("/caisiers.php?action=delete", fd);

    showAlert("Caisier deleted ✔", "success");
    setShowConfirm(false);
    loadCaisiers();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl lift-3d">

      {/* ALERT */}
      {alert && (
        <div className={`mb-4 p-3 rounded text-white 
          ${alertType === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {alert}
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-bold text-yellow-600 mb-3">Delete Caisier?</h3>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this caisier?
            </p>

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 btn-3d"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD FORM */}
      <h2 className="text-2xl font-bold text-yellow-600 mb-4 glow">
        Add New Caisier
      </h2>

      <div className="space-y-3 mb-6">
        <input
          type="text"
          className="border border-yellow-400 p-2 w-full rounded focus:ring-yellow-500 focus:border-yellow-500"
          placeholder="Full name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <input
          type="text"
          className="border border-yellow-400 p-2 w-full rounded focus:ring-yellow-500 focus:border-yellow-500"
          placeholder="CIN"
          value={cin}
          onChange={(e) => setCin(e.target.value)}
        />
          <input
            type="text"
            className="border border-yellow-400 p-2 w-full rounded focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(normalizeMoroccoPhone(e.target.value))}
          />



        <input
          type="password"
          className="border border-yellow-400 p-2 w-full rounded focus:ring-yellow-500 focus:border-yellow-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-yellow-500 text-black px-4 py-2 rounded font-bold hover:bg-yellow-600 btn-3d glow"
          onClick={addCaisier}
        >
          Add Caisier
        </button>
      </div>

      {/* TABLE */}
      <h3 className="text-lg font-bold mb-2">Caisiers List</h3>

      <table className="w-full border border-yellow-400 text-sm">
        <thead>
          <tr className="bg-yellow-500 text-black font-bold">
            <th className="p-2">CIN</th>
            <th className="p-2">Name</th>
            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {caisiers.map((c) => (
            <tr key={c.id} className="border-b hover:bg-yellow-50">
              <td className="p-2 border">{c.cin}</td>
              <td className="p-2 border">{c.fullname}</td>

              <td className="p-2 border text-center">
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 btn-3d"
                  onClick={() => openConfirmDelete(c.id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
