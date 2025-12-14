import React from "react";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-28 px-6 md:px-12 bg-neutral-100"
    >
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          Why Choose Us?
        </h2>

        <p className="text-center mt-3 opacity-70 text-lg">
          Expert coaches, modern equipment and an atmosphere that motivates you.
        </p>

        {/* FEATURES GRID */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">

          <FeatureCard
            icon={
              <svg
                className="w-14 h-14 text-yellow-500"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
            }
            title="Professional Coaches"
            desc="Train with certified experts."
          />

          <FeatureCard
            icon={
              <svg
                className="w-14 h-14 text-yellow-500"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
              </svg>
            }
            title="Modern Equipment"
            desc="Top-tier machines and gear."
          />

          <FeatureCard
            icon={
              <svg
                className="w-14 h-14 text-yellow-500"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15" />
              </svg>
            }
            title="Motivating Atmosphere"
            desc="A community that lifts each other."
          />

        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="
      rounded-3xl bg-white p-10 border border-neutral-200 
      hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/20
      transition-all duration-300 hover:-translate-y-2
    ">
      <div className="flex justify-center">{icon}</div>

      <h3 className="mt-5 text-xl font-bold text-center">{title}</h3>

      <p className="text-center opacity-70 mt-2">{desc}</p>
    </div>
  );
}
