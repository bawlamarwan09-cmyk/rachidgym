import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScheduleSection() {
  const [activeSalle, setActiveSalle] = useState("bahriya");

  useEffect(() => {
    const section = document.querySelector(".schedule-anim");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("show");
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* SALLE BAHRIYA PROGRAM */
  const bahriya = {
    Monday: [
      { sport: "Karate", time: "19:30 → 21:30" },
      { sport: "Open For Women", time: "19:00 → 20:30" },
    ],
    Tuesday: [
      { sport: "Women Aerobic Fitness", time: "19:00 → 20:30" },
      { sport: "Boxing (Youngs & Adults)", time: "20:30 → 22:30" },
    ],
    Wednesday: [{ sport: "Karate", time: "19:30 → 21:30" }],
    Thursday: [
      { sport: "Women Aerobic Fitness", time: "19:00 → 20:30" },
      { sport: "Boxing (Youngs & Adults)", time: "20:30 → 22:30" },
    ],
    Friday: [{ sport: "Karate", time: "19:30 → 21:30" }],
    Saturday: [
      { sport: "Women Aerobic Fitness", time: "19:00 → 20:30" },
      { sport: "Boxing (Youngs & Adults)", time: "20:30 → 22:30" },
    ],
  };

  /* SALLE MARSA PROGRAM */
  const mersa = {
    Monday: [
      { sport: "Kids Kickboxing", time: "19:30 → 20:30" },
      { sport: "Middle Kickboxing", time: "20:30 → 21:30" },
      { sport: "Adults Kickboxing", time: "21:30 → 23:30" },
    ],
    Tuesday: [
      { sport: "Taekwondo", time: "20:00 → 21:30" },
      { sport: "Boxing", time: "21:30 → 23:30" },
    ],
    Wednesday: [
      { sport: "Kids Kickboxing", time: "19:30 → 20:30" },
      { sport: "Middle Kickboxing", time: "20:30 → 21:30" },
      { sport: "Adults Kickboxing", time: "21:30 → 23:30" },
    ],
    Thursday: [
      { sport: "Taekwondo", time: "20:00 → 21:30" },
      { sport: "Boxing", time: "21:30 → 23:30" },
    ],
    Friday: [
      { sport: "Kids Kickboxing", time: "19:30 → 20:30" },
      { sport: "Middle Kickboxing", time: "20:30 → 21:30" },
      { sport: "Adults Kickboxing", time: "21:30 → 23:30" },
    ],
    Saturday: [
      { sport: "Taekwondo", time: "20:00 → 21:30" },
      { sport: "Boxing", time: "21:30 → 23:30" },
    ],
    Sunday: [],
  };

  const days = Object.keys(bahriya);
  const selected = activeSalle === "bahriya" ? bahriya : mersa;

  /* ANIMATION VARIANTS */
  const containerVariant = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="schedule" className="schedule-anim py-16 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <h2 className="text-center text-4xl font-extrabold">Weekly Class Schedule</h2>
        <p className="text-center opacity-70 mb-8 text-sm">
          Choose your salle to check daily programs.
        </p>

        {/* SWITCH BUTTONS */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveSalle("bahriya")}
            className={`px-6 py-2 rounded-xl font-bold border ${
              activeSalle === "bahriya"
                ? "bg-yellow-500 text-black"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Salle El Bahriya
          </button>

          <button
            onClick={() => setActiveSalle("mersa")}
            className={`px-6 py-2 rounded-xl font-bold border ${
              activeSalle === "mersa"
                ? "bg-yellow-500 text-black"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Salle El Marsa
          </button>
        </div>

        {/* MARSA OPEN GYM MESSAGE */}
        {activeSalle === "mersa" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-xl"
          >
            <p className="text-sm font-semibold text-gray-800">
              <strong>Salle El Marsa</strong> is open for <strong>Open Gym</strong> from
              <span className="text-yellow-700"> 09:00 → 23:30</span> daily.
            </p>
          </motion.div>
        )}

        {/* ANIMATED GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSalle} // important for transition
            variants={containerVariant}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {days.map((day, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
              >
                <h3 className="text-xl font-extrabold mb-3">{day}</h3>

                {selected[day].length === 0 ? (
                  <p className="opacity-60 text-sm">No classes available.</p>
                ) : (
                  selected[day].map((c, i) => (
                    <div
                      key={i}
                      className="p-3 mb-3 bg-yellow-100 rounded-lg border-l-4 border-yellow-500"
                    >
                      <p className="font-bold text-gray-900">{c.sport}</p>
                      <p className="text-sm opacity-70">{c.time}</p>
                    </div>
                  ))
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
