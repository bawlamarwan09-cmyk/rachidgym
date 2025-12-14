import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 mt-20 relative overflow-hidden">

      {/* Subtle gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 px-6 relative z-10">

        {/* Brand */}
        <div>
          <h3 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            POWER GYM
          </h3>
          <p className="opacity-70 text-sm leading-relaxed">
            Transform your body, elevate your mind.<br />
            Strength. Discipline. Lifestyle.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-extrabold mb-4">Quick Links</h3>
          <ul className="space-y-3 opacity-80">
            {[
              ["#features", "Features"],
              ["#pricing", "Pricing"],
              ["#team", "Coaches"],
              ["#contact", "Contact"],
            ].map(([href, label], i) => (
              <li key={i}>
                <a
                  href={href}
                  className="hover:text-yellow-500 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-extrabold mb-4">Contact</h3>
          <ul className="space-y-3 opacity-80 text-sm">

            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-yellow-500" />
              El MARSA LAAYOUNE, Morocco
            </li>

            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-yellow-500" />
              +212 662-691-493
            </li>

            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-yellow-500" />
              contact@powergym.com
            </li>

          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center mt-12 opacity-60 text-sm relative z-10 border-t border-white/10 pt-6">
        © {new Date().getFullYear()} POWER GYM — All Rights Reserved.
      </div>
    </footer>
  );
}
