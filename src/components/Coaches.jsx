import React from "react";
import LazySection from "./LazySection"; 

export default function CoachesSection() {
  return (
    <section id="team" className="py-24 px-6 md:px-12">

      <LazySection>
        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-4xl md:text-5xl font-extrabold scroll-show">
            Meet Our Coaches
          </h2>

          <p className="mt-3 opacity-75 max-w-2xl mx-auto scroll-show">
            Skilled, certified and ready to guide your fitness journey.
          </p>

          <br /><br />

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24 place-items-center">

            <CoachCard 
              name="Coach Ayman"
              title="Strength & Conditioning"
              extras={[
                "10+ Years Experience",
                "CrossFit Level 2 Coach",
                "Certified Personal Trainer (CPT)",
                "Nutrition & Diet Planning",
                "Motivation & Mindset Coach"
              ]}
            />
             <CoachCard 
              name="Coach Ayman"
              title="Strength & Conditioning"
              extras={[
                "10+ Years Experience",
                "CrossFit Level 2 Coach",
                "Certified Personal Trainer (CPT)",
                "Nutrition & Diet Planning",
                "Motivation & Mindset Coach"
              ]}
            />
             <CoachCard 
              name="Coach Ayman"
              title="Strength & Conditioning"
              extras={[
                "10+ Years Experience",
                "CrossFit Level 2 Coach",
                "Certified Personal Trainer (CPT)",
                "Nutrition & Diet Planning",
                "Motivation & Mindset Coach"
              ]}
            />
             <CoachCard 
              name="Coach Ayman"
              title="Strength & Conditioning"
              extras={[
                "10+ Years Experience",
                "CrossFit Level 2 Coach",
                "Certified Personal Trainer (CPT)",
                "Nutrition & Diet Planning",
                "Motivation & Mindset Coach"
              ]}
            />
             <CoachCard 
              name="Coach Ayman"
              title="Strength & Conditioning"
              extras={[
                "10+ Years Experience",
                "CrossFit Level 2 Coach",
                "Certified Personal Trainer (CPT)",
                "Nutrition & Diet Planning",
                "Motivation & Mindset Coach"
              ]}
            />
             <CoachCard 
              name="Coach Ayman"
              title="Strength & Conditioning"
              extras={[
                "10+ Years Experience",
                "CrossFit Level 2 Coach",
                "Certified Personal Trainer (CPT)",
                "Nutrition & Diet Planning",
                "Motivation & Mindset Coach"
              ]}
            />

            {/* ... نفس الشي للباقي */}
            
          </div>

        </div>
      </LazySection>

    </section>
  );
}

/* ============================
    REUSABLE COACH CARD
============================ */
function CoachCard({ name, title, extras }) {
  return (
    <div className="relative flex flex-col items-center text-center w-full max-w-[280px] tilt-box">
      
      <img 
        loading="lazy"
        src="https://ik.imagekit.io/latsqiyxk/me.PNG"
        className="w-[260px] md:w-[300px] -mt-28 drop-shadow-2xl relative z-10 tilt-img"
        alt="coach"
      />

      <div className="bg-white shadow-xl rounded-3xl w-full pt-36 pb-10 px-5 -mt-24 relative z-0 card-base overflow-hidden">

        <div className="info-primary">
          <h3 className="text-xl font-extrabold">{name}</h3>
          <p className="opacity-70 text-sm mt-1">{title}</p>
        </div>

        <div className="info-extra text-sm opacity-80">
          {extras.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>

      </div>
    </div>
  );
}
