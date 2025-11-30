import React from "react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center soft-reveal">
          Why Choose Us?
        </h2>

        <p className="text-center mt-3 opacity-75 soft-reveal">
          Expert coaches, modern equipment and an atmosphere that motivates you.
        </p>

        {/* FEATURES GRID */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Feature 1 */}
          <div className="rounded-3xl bg-white p-8 soft-shadow card-animate">
            <div className="flex justify-center">
              <svg className="w-12 h-12 text-yellow-500" strokeWidth="1.5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-extrabold text-center">
              Professional Coaches
            </h3>
            <p className="text-center opacity-75 mt-2">
              Train with certified experts.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-3xl bg-white p-8 soft-shadow card-animate">
            <div className="flex justify-center">
              <svg className="w-12 h-12 text-yellow-500" strokeWidth="1.5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-extrabold text-center">
              Modern Equipment
            </h3>
            <p className="text-center opacity-75 mt-2">
              Top-tier machines and gear.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-3xl bg-white p-8 soft-shadow card-animate">
            <div className="flex justify-center">
              <svg className="w-12 h-12 text-yellow-500" strokeWidth="1.5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-extrabold text-center">
              Motivating Atmosphere
            </h3>
            <p className="text-center opacity-75 mt-2">
              A community that lifts each other.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
