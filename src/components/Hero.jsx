import React from "react";

export default function HeroSection() {
  return (
    <>
      <section
        id="hero"
        className="h-screen relative flex items-center justify-center overflow-hidden"
      >
        {/* Floating Shapes */}
        <div className="absolute top-14 left-12 w-36 h-36 bg-yellow-400/10 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-24 w-48 h-48 bg-yellow-300/10 blur-2xl rounded-full animate-ping"></div>

        {/* Background Video */}
        <video
          src="https://ik.imagekit.io/latsqiyxk/vid.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/95"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center soft-reveal">
          <h1 className="text-6xl md:text-7xl font-extrabold">POWER GYM</h1>
          <p className="mt-4 text-xl opacity-80 max-w-2xl mx-auto">
            Transform your body. Transform your life.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#pricing"
              className="bg-yellow-500 hover:bg-yellow-600 px-10 py-3 rounded-xl font-extrabold"
            >
              Join Now
            </a>
            <a
              href="#features"
              className="border px-10 py-3 rounded-xl font-bold hover:bg-black/5"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
