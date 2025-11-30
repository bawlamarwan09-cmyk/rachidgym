import React, { useEffect, useState, useRef } from "react";

export default function GallerySection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true); // يظهر ال gallery
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  // هذا observer خاص بال animation
  useEffect(() => {
    if (!visible) return;

    const stack = document.getElementById("stack");
    if (!stack) return;

    const imgs = stack.querySelectorAll(".stack-img");

    const spreadObs = new IntersectionObserver(
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

    spreadObs.observe(stack);
  }, [visible]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className={`py-24 px-6 md:px-12 bg-white transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-4xl font-extrabold soft-reveal">Gallery</h2>
        <p className="opacity-75 mt-3 soft-reveal">Discover our gym atmosphere.</p>

        {/* STACK AREA */}
        <div className="mt-16 flex justify-center">
          <div id="stack" className="stack-container">
            {[
              "https://ik.imagekit.io/latsqiyxk/imgs/p5.jpg",
              "https://ik.imagekit.io/latsqiyxk/imgs/p2.jpg",
              "https://ik.imagekit.io/latsqiyxk/imgs/p3.jpg",
              "https://ik.imagekit.io/latsqiyxk/imgs/p4.jpg",
              "https://ik.imagekit.io/latsqiyxk/imgs/p1.jpg",
              "https://ik.imagekit.io/latsqiyxk/imgs/p5.jpg",
              "https://ik.imagekit.io/latsqiyxk/imgs/p5.jpg",
              "https://ik.imagekit.io/latsqiyxk/imgs/p5.jpg",
            ].map((src, i) => (
              <img
                key={i}
                loading="lazy"
                src={src}
                className={`stack-img stack-${i + 1}`}
                alt="gallery-pic"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
