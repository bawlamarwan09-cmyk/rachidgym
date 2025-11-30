import { useEffect, useState } from "react";
import api from "./api";
import { LogOut } from "lucide-react";
export default function CoachAbsence() {
  const coachCin = localStorage.getItem("coachCin");
  useEffect(() => {
  if (!localStorage.getItem("coachCin") || localStorage.getItem("role") !== "coach") {
    window.location.href = "/login";
  }
}, []);

  const [members, setMembers] = useState([]);
  const [date, setDate] = useState("");
  const [absences, setAbsences] = useState({});

  useEffect(() => {
    loadMembers();
  }, []);

const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const loadMembers = async () => {
    const res = await api.get(
      `/members_absence.php?action=list_members&coach_cin=${coachCin}`
    );

    const list = res.data || [];
    setMembers(list);

    // initialize all as present
    const initial = {};
    list.forEach((m) => {
      initial[m.cin] = "present";
    });
    setAbsences(initial);
  };
console.log("Coach CIN:", coachCin);
console.log("Coach CIN from localStorage =", localStorage.getItem("coachCin"));


  const toggleStatus = (cin) => {
    setAbsences((prev) => ({
      ...prev,
      [cin]: prev[cin] === "absent" ? "present" : "absent",
    }));
  };

  const save = async () => {
    if (!date) return alert("Please select a date");

    const payload = {
      coach_cin: coachCin,
      date,
      absences: members.map((m) => ({
        member_cin: m.cin,
        status: absences[m.cin] || "present",
      })),
    };

    const res = await api.post("/members_absence.php?action=save", payload);

    if (res.data.success) {
      alert("Absence saved successfully ✔");
    } else {
      alert("Save failed ❌");
    }
  };

  return (
  <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-yellow-300/40 mt-6 text-black">
    <h2 className="text-2xl font-bold mb-6 text-yellow-700">Absence — Coach Panel</h2>

    {/* DATE PICKER */}
    <div className="mb-6 bg-white p-4 rounded-lg shadow-md border border-yellow-200/50">
      <label className="font-medium text-gray-700">Select Date:</label>
      <input
        type="date"
        className="border px-3 py-2 ml-3 rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>

    {/* TABLE */}
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-yellow-200/70">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-yellow-50 border-b border-yellow-200">
            <th className="p-3 text-left font-semibold text-gray-700">CIN</th>
            <th className="p-3 text-left font-semibold text-gray-700">Name</th>
            <th className="p-3 text-left font-semibold text-gray-700">Sport</th>
            <th className="p-3 text-center font-semibold text-gray-700">Status</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr
              key={m.cin}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-3">{m.cin}</td>
              <td className="p-3 font-medium">{m.name}</td>
              <td className="p-3">{m.sport_name}</td>

              {/* STATUS BUTTON */}
              <td className="p-3 text-center">
                <button
                  className={`px-4 py-1 rounded-lg text-white font-semibold transition ${
                    absences[m.cin] === "absent"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  onClick={() => toggleStatus(m.cin)}
                >
                  {absences[m.cin] === "absent" ? "ABSENT" : "PRESENT"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* SAVE BUTTON */}
    <button
      onClick={save}
      className="mt-6 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
    >
      Save Absence
    </button>
     <button
          onClick={handleLogout}
          className="
            w-full mt-2 py-1 bg-yellow-500 text-black font-bold rounded-lg 
            shadow flex items-center justify-center gap-2
            hover:bg-yellow-600 transition-all active:scale-95
          "
        >
          <LogOut size={30} />
          Logout
        </button>
  </div>
);

}
