import React, { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/Hero.jsx";
import FeaturesSection from "./components/Features.jsx";
import CoachesSection from "./components/Coaches.jsx";
import PricingSection from "./components/Pricing.jsx";
import GallerySection from "./components/Gallery.jsx";
import ScheduleSection from "./components/Schedule.jsx";
import ContactSection from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import "./components/animations.css";
export default function LandingPage() {
  /* ------------------------- SCROLL REVEAL ------------------------- */
  useEffect(() => {
    const targets = document.querySelectorAll(".soft-reveal, .card-animate");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((t) => observer.observe(t));
  }, []);

  /* ------------------------- NAVBAR SHADOW ------------------------- */
  useEffect(() => {
    const nav = document.querySelector(".nav");
    const handler = () => {
      if (window.scrollY > 20) nav.classList.add("nav-scrolled");
      else nav.classList.remove("nav-scrolled");
    };
    window.addEventListener("scroll", handler);
  }, []);

  /* ------------------------- 3D COACH TILT ------------------------- */
  useEffect(() => {
    const cards = document.querySelectorAll(".coach-card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `rotateX(${(-y / 20)}deg) rotateY(${x / 20}deg) scale(1.03)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
      });
    });
  }, []);

  /* ------------------------- GALLERY SPREAD ------------------------- */
  useEffect(() => {
    const stack = document.getElementById("stack");
    if (!stack) return;
    const imgs = stack.querySelectorAll(".stack-img");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            imgs.forEach((i) => i.classList.add("show"));
            stack.classList.add("stack-expand");
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(stack);
  }, []);

  useEffect(() => {
    const elems = document.querySelectorAll(".scroll-show");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );

    elems.forEach((el) => observer.observe(el));
  }, []);

  useEffect(() => {
    const el = document.querySelector("#schedule");
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) el.classList.add("show");
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);


  return (
    <div className="bg-white text-black min-h-screen font-sans">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <CoachesSection />
        <PricingSection />
        <ScheduleSection />
        <GallerySection />
        <ContactSection />
        <Footer />

    </div>
  );
}
