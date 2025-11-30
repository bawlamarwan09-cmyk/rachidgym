import { useEffect, useState } from "react";
import api from "./api";
import { sendMessage } from "./sendMessage"; // 👈 تأكد هاد الفنكسيون عندك
export default function CoachesTable() {
  const [coaches, setCoaches] = useState([]);
  const [sports, setSports] = useState([]);

  // MODAL STATES
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteCin, setDeleteCin] = useState(null);

  const [form, setForm] = useState({
    cin: "",
    coach_name: "",
    phone: "",
    sport_id: ""
  });

  useEffect(() => {
    loadCoaches();
    loadSports();
  }, []);


  function fixPhoneNumber(phone) {
  if (!phone) return "";
  let p = phone.replace(/\s+/g, ""); // حيد المسافات

  // إلا كان بدا بـ 0 → نحيدو
  if (p.startsWith("0")) p = p.substring(1);

  // إلا كان ما بداش بـ +212 → نضيفوه
  if (!p.startsWith("+212")) p = "+212" + p;

  return p;
}

  const loadCoaches = async () => {
    try {
      const res = await api.get("/coaches.php?action=list");
      setCoaches(res.data || []);
    } catch (err) {
      console.log("Error loading coaches", err);
    }
  };

  const loadSports = async () => {
    try {
      const res = await api.get("/sports.php?action=list");
      setSports(res.data || []);
    } catch (err) {
      console.log("Error loading sports", err);
    }
  };

  const openAdd = () => {
    setForm({ cin: "", coach_name: "", phone: "", sport_id: "" });
    setEditMode(false);
    setModalOpen(true);
  };

  const openEdit = (coach) => {
    setForm({
      cin: coach.cin,
      coach_name: coach.coach_name,
      phone: coach.phone,
      sport_id: String(coach.sport_id)
    });
    setEditMode(true);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);


const saveCoach = async () => {
  const fd = new FormData();
  fd.append("cin", form.cin);
  fd.append("coach_name", form.coach_name);
  fd.append("phone", form.phone);
  fd.append("sport_id", form.sport_id);

  const res = await api.post(
    editMode ? "/coaches.php?action=update" : "/coaches.php?action=add",
    fd
  );

  if (res.data.success) {

    if (!editMode) {
      // ⚡ رسالة الواتساب مع الباسوورد
      const msg = `
مرحبا ${form.coach_name} 👋

تم إنشاء حسابك كمدرب في *Rachid Gym* ✔

🔑 *Login Information:*
• CIN: ${form.cin}
• Password: ${res.data.default_password}
 📌 يمكنك تسجيل الدخول الآن من الصفحة:
    https://rachid-gym.com/login

المرجو الاحتفاظ بهذه المعلومات 🔒
      `;

      sendMessage(form.phone, msg);
    }

    alert(editMode ? "Coach updated!" : "Coach added & login created!");

    loadCoaches();
    closeModal();

  } else {
    alert(res.data.message || "Error");
  }
};



  const deleteCoach = async () => {
    const fd = new FormData();
    fd.append("cin", deleteCin);

    try {
      const res = await api.post("/coaches.php?action=delete", fd);
      if (res.data.success) {
        loadCoaches();
        setDeleteCin(null);
      } else {
        alert("Delete failed");
      }
    } catch (e) {
      alert("Request failed");
    }
  };

  const sportNameById = (id) => {
    const s = sports.find((x) => String(x.id) === String(id));
    return s ? s.sport_name : "-";
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl text-black border border-yellow-400 shadow-yellow-200">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-yellow-600">Coaches</h2>

        <button
          onClick={openAdd}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold shadow hover:bg-yellow-600 transition"
        >
          + Add Coach
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-yellow-300">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-yellow-500 text-black">
            <tr>
              <th className="px-4 py-3 text-left border border-yellow-600">CIN</th>
              <th className="px-4 py-3 text-left border border-yellow-600">Name</th>
              <th className="px-4 py-3 text-left border border-yellow-600">Phone</th>
              <th className="px-4 py-3 text-left border border-yellow-600">Sport</th>
              <th className="px-4 py-3 text-left border border-yellow-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {coaches.map((coach) => (
              <tr key={coach.cin} className="border-b hover:bg-yellow-50 transition">
                <td className="px-4 py-2">{coach.cin}</td>
                <td className="px-4 py-2 font-medium">{coach.coach_name}</td>
                <td className="px-4 py-2">{coach.phone}</td>
                <td className="px-4 py-2">
                  {coach.sport_name ?? sportNameById(coach.sport_id)}
                </td>

                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-black rounded shadow text-xs hover:bg-yellow-600"
                      onClick={() => openEdit(coach)}
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded shadow text-xs hover:bg-red-700"
                      onClick={() => setDeleteCin(coach.cin)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {coaches.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No coaches yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] sm:w-96 p-6 rounded-xl shadow-2xl border border-yellow-500">

            <h3 className="text-lg font-bold text-yellow-600 mb-4">
              {editMode ? "Edit Coach" : "Add Coach"}
            </h3>

            <label className="text-sm text-gray-600">CIN</label>
            <input
              className="w-full p-2 mb-3 border rounded shadow-sm"
              value={form.cin}
              disabled={editMode}
              onChange={(e) => setForm({ ...form, cin: e.target.value })}
            />

            <label className="text-sm text-gray-600">Name</label>
            <input
              className="w-full p-2 mb-3 border rounded shadow-sm"
              value={form.coach_name}
              onChange={(e) => setForm({ ...form, coach_name: e.target.value })}
            />

            <label className="text-sm text-gray-600">Phone</label>
           <input
            className="w-full p-2 mb-3 border rounded shadow-sm"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: fixPhoneNumber(e.target.value) })}
          />
            <label className="text-sm text-gray-600">Sport</label>
            <select
              className="w-full p-2 mb-4 border rounded shadow-sm"
              value={form.sport_id}
              onChange={(e) => setForm({ ...form, sport_id: e.target.value })}
            >
              <option value="">— Select Sport —</option>
              {sports.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.sport_name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
                onClick={saveCoach}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteCin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-80 p-6 rounded-xl shadow-2xl border border-yellow-500">
            <h3 className="text-lg font-bold text-yellow-600 mb-2">Delete Coach?</h3>
            <p className="text-gray-700 mb-4">
              This will permanently remove <b>{deleteCin}</b>.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setDeleteCin(null)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={deleteCoach}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
