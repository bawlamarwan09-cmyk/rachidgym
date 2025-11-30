import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 px-6">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-extrabold mb-3">POWER GYM</h3>
          <p className="opacity-80 text-sm">
            Transform your body, elevate your life.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-extrabold mb-3">Quick Links</h3>
          <ul className="space-y-2 opacity-80">
            <li><a href="#features" className="hover:text-yellow-500">Features</a></li>
            <li><a href="#pricing" className="hover:text-yellow-500">Pricing</a></li>
            <li><a href="#team" className="hover:text-yellow-500">Coaches</a></li>
            <li><a href="#contact" className="hover:text-yellow-500">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-extrabold mb-3">Contact</h3>
          <ul className="space-y-2 opacity-80 text-sm">
            <li>📍 Rabat, Morocco</li>
            <li>📞 +212 600 000 000</li>
            <li>📧 contact@powergym.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="text-center mt-10 opacity-60 text-sm">
        © {new Date().getFullYear()} POWER GYM — All Rights Reserved.
      </div>
    </footer>
  );
}
