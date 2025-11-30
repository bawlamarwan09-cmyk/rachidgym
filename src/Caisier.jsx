import React, { useEffect, useState } from "react";
import AddMember from "./AddMember";
import api from "./api";
import Dashboard from "./Dashboard";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
export default function Caisier() {
  const [unpaid, setUnpaid] = useState([]);
  useEffect(() => {
  if (!localStorage.getItem("caisierCin") || localStorage.getItem("role") !== "caisier") {
    window.location.href = "/login";
  }
}, []);

  useEffect(() => {
    loadUnpaid();
  }, []);

  const loadUnpaid = async () => {
    const res = await api.get("/members.php?action=list");
    const data = res.data || [];
    setUnpaid(data.filter((m) => m.statut_paiement === "unpaid"));
  };

const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <div className="p-6 fade-in">   {/* 👈 هنا زدنا fade-in */}

      {/* ADD MEMBER */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-4">Add New Member</h1>

        <AddMember hideDelete={true} />
      </div>
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
      {/* <Dashboard role="caisier" /> */}
    </div>
  );
}
