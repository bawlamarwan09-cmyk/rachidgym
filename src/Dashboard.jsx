// FULL DASHBOARD WHITE & YELLOW THEME WITH HOVER + SHADOW EFFECTS
import { useEffect, useState } from "react";
import api from "./api";

function getDaysBadge(days) {
  if (days === "N/A") return "bg-gray-400 text-black";
  if (days > 10) return "bg-green-600 text-white";
  if (days >= 5) return "bg-yellow-400 text-black";
  return "bg-red-600 text-white";
}

function calculateDaysLeft(expiryDate) {
  if (!expiryDate) return "N/A";
  const today = new Date();
  const exp = new Date(expiryDate);
  return Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
}

function getMemberStatus(member) {
  const days = calculateDaysLeft(member.expiry_date);
  if (member.statut_paiement === "paid") {
    return days > 0 ? "paid" : "expired";
  }
  return "unpaid";
}

function getStatusBadge(status) {
  const styles = {
    paid: "bg-green-600 text-white",
    expired: "bg-orange-500 text-white",
    unpaid: "bg-red-600 text-white",
  };
  return styles[status] || styles.unpaid;
}

export default function Dashboard() {
  

  const [members, setMembers] = useState([]);
  const [sports, setSports] = useState([]);
  const [coaches, setCoaches] = useState([]);

  const [search, setSearch] = useState({});
  const [coachFilter, setCoachFilter] = useState({});

  const [dateAbs, setDateAbs] = useState(new Date().toISOString().slice(0, 10));
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadDailyAbsence();
  }, [dateAbs]);

  async function loadData() {
    try {
      const membersRes = await api.get("/members.php?action=list");
      const sportsRes = await api.get("/sports.php?action=list");
      const coachesRes = await api.get("/coaches.php?action=list");

      setMembers(membersRes.data || []);
      setSports(sportsRes.data || []);
      setCoaches(coachesRes.data || []);
    } catch (err) {
      alert("Failed to load data.");
    }
  }

  async function loadDailyAbsence() {
    try {
      const res = await api.get(`/members_absence.php?action=daily&date=${dateAbs}`);
      setDaily(res.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  const handlePayment = async (cin) => {
    const amount = prompt("Enter amount:");
    if (!amount || isNaN(amount)) return alert("Invalid amount");

    const fd = new FormData();
    fd.append("cin", cin);
    fd.append("amount", amount);

    try {
      const res = await api.post("/members.php?action=pay", fd);

      if (res.data.success) {
        setMembers((prev) =>
          prev.map((m) =>
            m.cin === cin
              ? {
                  ...m,
                  statut_paiement: "paid",
                  amount: Number(m.amount || 0) + Number(amount),
                  expiry_date: res.data.expiry_date,
                }
              : m
          )
        );
        alert("Payment added!");
      }
    } catch (err) {
      alert("Payment failed");
    }
  };

  return (
<div className="p-6 bg-white min-h-screen text-black animate-dashboard">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* SPORT CARDS */}
       {sports.map((sport, index) => {
  const sportMembers = members.filter((m) => m.sport_id == sport.id);
  const s = (search[sport.id] || "").toString();

  const filteredBySearch = sportMembers.filter((m) => {
    const name = (m.name || "").toLowerCase();
    return (
      name.includes(s.toLowerCase()) ||
      String(m.cin).includes(s) ||
      String(m.phone).includes(s)
    );
  });

  const selectedCoach = coachFilter[sport.id] || "";
  const filteredMembers = selectedCoach
    ? filteredBySearch.filter((m) => m.coach_cin == selectedCoach)
    : filteredBySearch;

  return (
    <div
      key={sport.id}
      className="
        bg-white border border-yellow-500 rounded-xl p-5 
        shadow-xl hover:shadow-2xl hover:scale-[1.01]
        transition-all duration-300 lift-3d
        fade-up
      "
      style={{
        animationDelay: `${index * 0.15}s`, // ⬅ stagger animation
      }}
    >
      <h2 className="text-xl font-bold mb-4 text-yellow-600 glow px-2 py-1 rounded">
        {sport.sport_name} Members
      </h2>

      {/* SEARCH + FILTER */}
      <div className="flex gap-3 mb-4 fade-up" style={{ animationDelay: "0.2s" }}>
        <input
          type="text"
          placeholder="Search…"
          className="
            flex-1 p-2 bg-white border border-yellow-400 rounded 
            focus:ring-yellow-500 focus:border-yellow-500 shadow-sm
          "
          value={search[sport.id] || ""}
          onChange={(e) =>
            setSearch({ ...search, [sport.id]: e.target.value })
          }
        />

        <select
          className="
            p-2 bg-white border border-yellow-400 rounded 
            focus:ring-yellow-500 focus:border-yellow-500 shadow-sm
          "
          value={coachFilter[sport.id] || ""}
          onChange={(e) =>
            setCoachFilter({ ...coachFilter, [sport.id]: e.target.value })
          }
        >
          <option value="">All Coaches</option>
          {coaches
            .filter((c) => c.sport_id == sport.id)
            .map((coach) => (
              <option key={coach.cin} value={coach.cin}>
                {coach.coach_name}
              </option>
            ))}
        </select>
      </div>

      {/* TABLE */}
      {filteredMembers.length === 0 ? (
        <p className="text-gray-500 fade-up" style={{ animationDelay: "0.25s" }}>
          No members found.
        </p>
      ) : (
        <div className="overflow-x-auto fade-up" style={{ animationDelay: "0.25s" }}>
          <table className="w-full text-sm bg-white border border-yellow-500 rounded-xl shadow-lg">
            <thead>
              <tr className="bg-yellow-500 text-black font-bold shadow-md">
                <th className="p-2 border border-yellow-600">CIN</th>
                <th className="p-2 border border-yellow-600">Name</th>
                <th className="p-2 border border-yellow-600">Coach</th>
                <th className="p-2 border border-yellow-600">Phone</th>
                <th className="p-2 border border-yellow-600">Expiry</th>
                <th className="p-2 border border-yellow-600">Days</th>
                <th className="p-2 border border-yellow-600">Status</th>
                <th className="p-2 border border-yellow-600">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.map((m) => {
                const days = calculateDaysLeft(m.expiry_date);

                return (
                  <tr
                    key={m.cin}
                    className="
                      border-b hover:bg-yellow-50 hover:shadow-lg 
                      transition-all duration-200 row-3d fade-up
                    "
                    style={{ animationDelay: "0.3s" }}
                  >
                    <td className="p-2 border">{m.cin}</td>
                    <td className="p-2 border">{m.name}</td>
                    <td className="p-2 border">{m.coach_name}</td>
                    <td className="p-2 border">{m.phone}</td>
                    <td className="p-2 border">{m.expiry_date}</td>

                    <td className="p-2 border">
                      <span
                        className={`px-2 py-1 rounded text-xs ${getDaysBadge(
                          days
                        )}`}
                      >
                        {days}
                      </span>
                    </td>

                    <td className="p-2 border">
                      <span
                        className={`px-2 py-1 rounded text-xs ${getStatusBadge(
                          getMemberStatus(m)
                        )}`}
                      >
                        {getMemberStatus(m)}
                      </span>
                    </td>

                    <td className="p-2 border text-center">
                      {getMemberStatus(m) === "paid" ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                          Paid
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePayment(m.cin)}
                          className="
                            px-3 py-1 text-xs 
                            bg-yellow-500 text-black rounded 
                            hover:bg-yellow-600 
                            hover:shadow-xl hover:scale-[1.05]
                            transition-all duration-200 btn-3d glow
                          "
                        >
                          {getMemberStatus(m) === "expired"
                            ? "Renew"
                            : "Pay"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
})}


        {/* DAILY ABSENCE */}
        <div className="
          bg-white border border-yellow-500 p-6 rounded-xl 
          shadow-xl hover:shadow-2xl 
          hover:scale-[1.01]
          transition-all duration-300
          lift-3d
        ">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold text-yellow-600 glow px-2 py-1 rounded">
              Today's Absence
            </h2>

            <input
              type="date"
              value={dateAbs}
              onChange={(e) => setDateAbs(e.target.value)}
              className="
                p-2 bg-white border border-yellow-400 rounded
                focus:ring-yellow-500 focus:border-yellow-500
                shadow-sm
              "
            />
          </div>

          {daily.length === 0 ? (
            <p className="text-gray-500">No absences for this day.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="
                w-full text-sm bg-white border border-yellow-500 
                rounded-xl shadow-lg
              ">
                <thead>
                  <tr className="bg-yellow-500 text-black font-bold shadow-md">
                    <th className="p-2 border border-yellow-600">CIN</th>
                    <th className="p-2 border border-yellow-600">Name</th>
                    <th className="p-2 border border-yellow-600">Sport</th>
                    <th className="p-2 border border-yellow-600">Coach</th>
                    <th className="p-2 border border-yellow-600">Status</th>
                    <th className="p-2 border border-yellow-600">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {daily.map((d) => (
                    <tr
                      key={d.id}
                      className="
                        border-b 
                        hover:bg-yellow-50 
                        hover:shadow-lg 
                        transition-all 
                        duration-200 
                        row-3d
                      "
                    >
                      <td className="p-2 border">{d.member_cin}</td>
                      <td className="p-2 border">{d.name}</td>
                      <td className="p-2 border">{d.sport_name}</td>
                      <td className="p-2 border">{d.coach_name}</td>
                      <td className="p-2 border">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            d.status === "absent"
                              ? "bg-red-600 text-white"
                              : "bg-green-600 text-white"
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>
                      <td className="p-2 border">{d.date_absence}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
