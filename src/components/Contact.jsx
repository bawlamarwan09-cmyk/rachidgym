import React from "react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-4xl font-extrabold soft-reveal">Get in Touch</h2>
        <p className="opacity-75 mt-3 soft-reveal">
          Feel free to reach us anytime.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/212600000000"
            className="bg-yellow-500 hover:bg-yellow-600 px-10 py-3 rounded-xl font-extrabold transition"
          >
            WhatsApp
          </a>

          <a
            href="tel:+212600000000"
            className="border px-10 py-3 rounded-xl font-extrabold hover:bg-black/5 transition"
          >
            Call
          </a>
        </div>

       
      </div>
    </section>
  );
}
