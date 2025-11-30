import React, { useState } from "react";

export default function PricingSection() {
  const [active, setActive] = useState("bahriya");

  const bahriya = [
    { title: "🏋️‍♂️ كمال الأجسام", price: "100 درهم / الشهر", t: "50 درهم تأمين" },
    { title: "🥋 الكراطي", price: "100 درهم / الشهر", t: "100 درهم تأمين" },
    { title: "💃 فيتنس / إيروبيك", price: "150 درهم / الشهر", t: "50 درهم تأمين" },
    { title: "🥊 كيك بوكسينغ", price: "100 درهم / الشهر", t: "100 درهم تأمين" },
  ];

  const marsa = [
    { title: "🏋️‍♂️ كمال الأجسام", price: "150 درهم / الشهر", t: "50 درهم تأمين" },
    { title: "🥊 الكيك", price: "100 درهم / الشهر", t: "100 درهم تأمين" },
    { title: "🥋 التايكواندو", price: "100 درهم / الشهر", t: "100 درهم تأمين" },
  ];

  const data = active === "bahriya" ? bahriya : marsa;

  return (
    <section id="pricing" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-4xl font-extrabold soft-reveal">Membership Prices</h2>
        <p className="opacity-75 mt-3 soft-reveal">Choose your salle</p>

        {/* ==== TABS ==== */}
        <div className="flex justify-center mt-10 gap-4">
          <button
            onClick={() => setActive("bahriya")}
            className={`px-6 py-2 rounded-xl font-extrabold transition 
            ${active === "bahriya" ? "bg-yellow-500 text-black" : "bg-black text-white hover:bg-black/80"}`}
          >
            Salle El Bahriya
          </button>

          <button
            onClick={() => setActive("marsa")}
            className={`px-6 py-2 rounded-xl font-extrabold transition 
            ${active === "marsa" ? "bg-yellow-500 text-black" : "bg-black text-white hover:bg-black/80"}`}
          >
            Salle El Marsa
          </button>
        </div>

        {/* ==== CARDS GRID ==== */}
       {/* ==== CARDS GRID ==== */}
<div
  key={active}
  className={`
    mt-16 gap-8 
    grid 
    grid-cols-1
    ${active === "bahriya" ? "md:grid-cols-4" : "md:grid-cols-3"} 
    fade-grid
  `}
>
  {data.map((item, i) => (
    <div
      key={i}
      className="p-6 bg-white rounded-3xl shadow-lg border hover:shadow-xl transition-all cursor-pointer pricing-card"
    >
      <h3 className="text-xl font-extrabold text-yellow-500 mb-2">
        {item.title}
      </h3>

      <p className="text-lg font-bold text-gray-900">{item.price}</p>
      <p className="text-sm text-gray-600 mt-1">{item.t}</p>

     
    </div>
  ))}
</div>

      </div>

      {/* ==== ANIMATION STYLE ==== */}
      <style>{`
        .fade-grid {
          animation: fadeUp .6s ease;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pricing-card {
          transform: translateY(0);
          transition: all .3s ease;
        }

        .pricing-card:hover {
          transform: translateY(-6px) scale(1.03);
        }
      `}</style>
    </section>
  );
}
