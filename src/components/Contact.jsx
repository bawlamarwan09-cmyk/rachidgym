import React from "react";
import { Phone, MessageCircle } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 bg-gradient-to-b from-white to-yellow-50"
    >
      <div className="max-w-5xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-600 text-transparent bg-clip-text soft-reveal">
          Get in Touch
        </h2>

        <p className="opacity-75 mt-3 text-lg soft-reveal">
          We're here to help you anytime.
        </p>

        {/* CONTACT BOX */}
        <div className="mt-12 bg-white rounded-3xl p-10 shadow-xl border border-yellow-100 soft-reveal">
          
          <p className="text-neutral-700 text-lg md:text-xl">
            Reach out to us via WhatsApp or give us a call.  
            <span className="font-bold text-yellow-600"> Our team responds fast!</span>
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col md:flex-row gap-5 justify-center">

            <a
              href="https://wa.me/212662691493"
              className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-10 py-3 rounded-2xl font-extrabold text-white text-lg transition-all shadow-lg hover:shadow-yellow-400/40 hover:-translate-y-1"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp
            </a>

            <a
              href="tel:+212600000000"
              className="flex items-center justify-center gap-2 border-2 border-neutral-300 px-10 py-3 rounded-2xl font-extrabold text-lg hover:bg-neutral-100 transition-all shadow hover:shadow-md hover:-translate-y-1"
            >
              <Phone className="w-6 h-6" />
              Call Now
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
          
