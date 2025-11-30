import React from "react";

export default function CoachesSection() {
  return (
    <section id="team" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-4xl md:text-5xl font-extrabold scroll-show">
          Meet Our Coaches
        </h2>

        <p className="mt-3 opacity-75 max-w-2xl mx-auto scroll-show">
          Skilled, certified and ready to guide your fitness journey.
        </p>

        <br /><br />

        {/* GRID */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24 place-items-center">

          {/* === COACH 1 === */}
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

          {/* === COACH 2 === */}
          <CoachCard 
            name="Coach Sara"
            title="Fitness & Mobility"
            extras={[
              "8 Years Experience",
              "Mobility Specialist",
              "Certified Fitness Instructor",
              "Women's Bootcamp Expert",
              "Stretching & Flexibility Coach"
            ]}
          />

          {/* === COACH 3 === */}
          <CoachCard 
            name="Coach Rayan"
            title="Bodybuilding Expert"
            extras={[
              "12 Years Experience",
              "Muscle Building Specialist",
              "Strength Programming",
              "Competition Prep Coach",
              "Sports Nutrition Advisor"
            ]}
          />

          {/* === COACH 4 NEW === */}
          <CoachCard 
            name="Coach Lina"
            title="HIIT & Fat Loss"
            extras={[
              "7 Years Experience",
              "HIIT Certified Trainer",
              "Fat Loss Programming",
              "Women's Fitness Coach",
              "Mindset & Lifestyle Coaching"
            ]}
          />

          {/* === COACH 5 NEW === */}
          <CoachCard 
            name="Coach Youssef"
            title="Calisthenics & Functional Training"
            extras={[
              "6 Years Experience",
              "Calisthenics Specialist",
              "Functional Movement Expert",
              "Handstand & Mobility Skills",
              "Endurance Conditioning"
            ]}
          />

          {/* === COACH 6 NEW === */}
          <CoachCard 
            name="Coach Amin"
            title="Kickboxing & Conditioning"
            extras={[
              "9 Years Experience",
              "Kickboxing Trainer",
              "Self-Defense Instructor",
              "Athletic Conditioning",
              "Footwork & Agility Coach"
            ]}
          />

        </div>

      </div>
    </section>
  );
}

/* ============================
    REUSABLE COACH CARD
============================ */
function CoachCard({ name, title, extras }) {
  return (
    <div className="relative flex flex-col items-center text-center w-full max-w-[280px] tilt-box scroll-show">
      <img 
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
