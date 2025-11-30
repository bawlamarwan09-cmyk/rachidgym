// PROFESSIONAL SIDEBAR – CLEAN WHITE/YELLOW
import React from "react";
import { Link, useLocation } from "react-router-dom";

// Lucide Icons
import {
  Home,
  UserPlus,
  Banknote,
  Users,
  Dumbbell,
  Briefcase,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Home", href: "/", icon: <Home size={22} /> },
    { name: "Add members", href: "/members", icon: <UserPlus size={22} /> },
    { name: "Finance", href: "/finance", icon: <Banknote size={22} /> },
    { name: "Coaches Members", href: "/coaches-members", icon: <Users size={22} /> },
    { name: "Add Sport", href: "/add-sport", icon: <Dumbbell size={22} /> },
    { name: "Add Caisier", href: "/addcaisier", icon: <Briefcase size={22} /> },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside className="w-72 bg-white h-screen border-r border-gray-200 flex flex-col shadow-md">
      
      {/* HEADER */}
      <div className="px-5 py-6 flex items-center gap-3">
        <img
          src="https://ik.imagekit.io/latsqiyxk/logo.jpg"
          alt="logo"
          className="w-12 h-12 rounded-full object-cover shadow"
        />
        <h1 className="text-xl font-bold text-gray-900 tracking-wide">
          RACHID GYM
        </h1>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menu.map((item) => {
          const active = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-[17px] font-medium transition-all
                ${
                  active
                    ? "bg-yellow-400 text-gray-900 shadow font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <span className={`transition-transform group-hover:scale-110 
                ${active ? "text-gray-900" : "text-gray-600"}`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER USER */}
      <div className="mt-auto px-6 py-5 border-t border-gray-200">

        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {localStorage.getItem("fullname") || "Admin"}
            </p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="
            w-full mt-4 py-3 bg-yellow-500 text-black font-bold rounded-lg 
            shadow flex items-center justify-center gap-2
            hover:bg-yellow-600 transition-all active:scale-95
          "
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}
