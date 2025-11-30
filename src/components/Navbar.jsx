import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  /* === NAVBAR SHADOW ON SCROLL === */
  useEffect(() => {
    const nav = document.querySelector(".nav");
    const handler = () => {
      if (window.scrollY > 20) nav.classList.add("nav-scrolled");
      else nav.classList.remove("nav-scrolled");
    };
    window.addEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav className="nav fixed top-0 w-full bg-white z-50 transition-all py-4 px-6 shadow-none">
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="https://ik.imagekit.io/latsqiyxk/logo.jpg"
              className="h-10 w-10 rounded-md"
              alt="logo"
            />
            <h1 className="text-2xl font-extrabold">POWER GYM</h1>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex space-x-6 text-lg font-bold">
            <a href="#hero" className="hover:text-yellow-500">Home</a>
            <a href="#features" className="hover:text-yellow-500">Features</a>
            <a href="#team" className="hover:text-yellow-500">Coaches</a>
            <a href="#pricing" className="hover:text-yellow-500">Pricing</a>
            <a href="#gallery" className="hover:text-yellow-500">Gallery</a>
            <a href="#contact" className="hover:text-yellow-500">Contact</a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-3xl font-bold"
            onClick={() => setOpen(!open)}
          >
            {open ? "✖" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden mt-4 bg-white shadow-lg rounded-lg p-4 space-y-4 text-lg font-semibold">
            <a href="#hero" className="block hover:text-yellow-500">Home</a>
            <a href="#features" className="block hover:text-yellow-500">Features</a>
            <a href="#team" className="block hover:text-yellow-500">Coaches</a>
            <a href="#pricing" className="block hover:text-yellow-500">Pricing</a>
            <a href="#gallery" className="block hover:text-yellow-500">Gallery</a>
            <a href="#contact" className="block hover:text-yellow-500">Contact</a>
          </div>
        )}
      </nav>

      {/* === NAVBAR STYLE === */}
      <style>{`
        .nav-scrolled {
          box-shadow: 0 8px 30px rgba(0,0,0,0.09);
          backdrop-filter: blur(6px);
        }
      `}</style>
    </>
  );
}
