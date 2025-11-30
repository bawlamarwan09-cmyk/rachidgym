import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ProSidebar from "./ProSidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-black">

      {/* ====== MOBILE SIDEBAR OVERLAY ====== */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      ></div>

      {/* ====== MOBILE SLIDE SIDEBAR ====== */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 md:hidden shadow-xl ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ProSidebar closeSidebar={() => setMobileOpen(false)} />
      </div>

      {/* ====== DESKTOP SIDEBAR ====== */}
      <div className="hidden md:flex shadow-xl">
        <ProSidebar />
      </div>

      {/* ====== RIGHT CONTENT ====== */}
      <div className="flex-1 flex flex-col">

        {/* ====== TOP NAV ====== */}
      <nav className="bg-white text-black h-16 flex items-center justify-center px-4 border-b border-yellow-500 shadow-sm relative">

  {/* Mobile toggle button (stays left) */}
  <button
    className="md:hidden absolute left-4 p-2 rounded-lg border border-yellow-500 hover:bg-yellow-400 active:scale-95 transition"
    onClick={() => setMobileOpen(true)}
  >
    <Bars3Icon className="w-6 h-6 text-black" />
  </button>

  {/* LOGO + TITLE CENTERED */}
  <div className="flex items-center gap-3 select-none">
    <img
      src="https://ik.imagekit.io/latsqiyxk/logo.jpg"
      alt="Logo"
      className="h-11 w-11 rounded-full border-2 border-yellow-500 shadow-sm object-cover"
    />

    <span className="font-bold text-[18px] tracking-wide decorative-arabic">
      جمعية أبطال المرسى لرياضة الفنون القتالية
    </span>
  </div>

</nav>


        {/* ====== MAIN CONTENT ====== */}
        <div className="flex-1 overflow-auto p-4 bg-gray-100 text-black">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
