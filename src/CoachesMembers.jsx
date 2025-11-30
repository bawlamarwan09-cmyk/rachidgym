import { useEffect, useState } from "react";
import api from "./api";
import CoachesTable from "./CoachesTable";

function calculateDaysLeft(expiryDate) {
  if (!expiryDate) return "N/A";
  const today = new Date();
  const exp = new Date(expiryDate);
  return Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
}

export default function CoachesMembers() {
  const [coaches, setCoaches] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const coachesRes = await api.get("/coaches.php?action=list");
      const membersRes = await api.get("/members.php?action=list");

      setCoaches(coachesRes.data || []);
      setMembers(membersRes.data || []);

    } catch (err) {
      console.error(err);
      alert("Error loading data");
    }
  }

  const handlePayment = async (cin) => {
    const amount = prompt("Enter payment amount:");

    if (!amount || isNaN(amount)) return;

    const fd = new FormData();
    fd.append("cin", cin);
    fd.append("amount", amount);

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

      alert("Payment added");
    }
  };

  return (
  <div className="container mx-auto p-6 text-black fade-in">

    {/* Coaches Table */}
    <div className="mb-10">
      <CoachesTable />
    </div>

    {/* MAIN TITLE */}
    <h2 className="text-2xl font-bold mb-6 text-yellow-600 glow px-2 py-1 rounded lift-3d inline-block">
      Coaches & Their Members
    </h2>

    {/* COACHES LIST */}
    {coaches.map((coach) => {
      const coachMembers = members.filter((m) => m.coach_cin === coach.cin);

      return (
        <div
          key={coach.cin}
          className="bg-white shadow-xl lift-3d p-5 rounded-xl mb-8 border border-yellow-500"
        >
          <h4 className="text-xl font-bold text-yellow-600">
            {coach.coach_name} — {coach.sport_name}
            <span className="text-gray-500 text-sm ml-2">({coach.cin})</span>
          </h4>

          {/* NO MEMBERS */}
          {coachMembers.length === 0 ? (
            <p className="text-gray-500 mt-2">No members assigned to this coach.</p>
          ) : (
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border border-yellow-500 rounded-xl bg-white shadow-md">
                <thead className="bg-yellow-500 text-black font-semibold">
                  <tr>
                    <th className="px-3 py-2 border border-yellow-600 text-left">CIN</th>
                    <th className="px-3 py-2 border border-yellow-600 text-left">Name</th>
                    <th className="px-3 py-2 border border-yellow-600 text-left">Phone</th>
                    <th className="px-3 py-2 border border-yellow-600 text-left">Date</th>
                    <th className="px-3 py-2 border border-yellow-600 text-left">Expiry</th>
                    <th className="px-3 py-2 border border-yellow-600 text-left">Days Left</th>
                    <th className="px-3 py-2 border border-yellow-600 text-left">Status</th>
                    <th className="px-3 py-2 border border-yellow-600 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {coachMembers.map((m) => (
                    <tr key={m.cin} className="border-b row-3d">
                      <td className="px-3 py-2">{m.cin}</td>
                      <td className="px-3 py-2 font-medium">{m.name}</td>
                      <td className="px-3 py-2">{m.phone}</td>
                      <td className="px-3 py-2">{m.date_inscription}</td>
                      <td className="px-3 py-2">{m.expiry_date}</td>

                      <td className="px-3 py-2">
                        {calculateDaysLeft(m.expiry_date)}
                      </td>

                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            m.statut_paiement === "paid"
                              ? "bg-green-600 text-white"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {m.statut_paiement}
                        </span>
                      </td>

                      <td className="px-3 py-2">
                        {m.statut_paiement === "paid" ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                            Paid
                          </span>
                        ) : (
                          <button
                            className="px-3 py-1 text-sm bg-yellow-500 text-black rounded btn-3d hover:bg-yellow-600"
                            onClick={() => handlePayment(m.cin)}
                          >
                            Pay
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      );
    })}
  </div>
);

}
