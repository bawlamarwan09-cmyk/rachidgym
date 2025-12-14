import React, { useEffect, useState, useRef } from "react";

export default function GallerySection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const stackRef = useRef(null);

  // SECTION REVEAL OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  // STACK IMAGE ANIMATION
  useEffect(() => {
    if (!visible) return;

    const imgs = stackRef.current.querySelectorAll(".stack-img");

    imgs.forEach((img, i) => {
      setTimeout(() => img.classList.add("show"), 120 * i);
    });
  }, [visible]);

  // 3D PARALLAX EFFECT
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const onMove = (e) => {
      const rect = stack.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      stack.style.transform = `
        rotateX(${y * 12}deg)
        rotateY(${x * 12}deg)
        scale(1.04)
      `;
    };

    const reset = () => {
      stack.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    stack.addEventListener("mousemove", onMove);
    stack.addEventListener("mouseleave", reset);

    return () => {
      stack.removeEventListener("mousemove", onMove);
      stack.removeEventListener("mouseleave", reset);
    };
  }, []);

  const photos = [
    "WhatsApp%20Image%202025-11-30%20at%2016.43.58%20(4).jpeg",
    "WhatsApp%20Image%202025-11-30%20at%2016.43.59%20(1).jpeg",
    "WhatsApp%20Image%202025-11-30%20at%2016.43.59.jpeg",
    "WhatsApp%20Image%202025-11-30%20at%2016.43.58%20(1).jpeg",
    "WhatsApp%20Image%202025-11-30%20at%2016.43.58%20(2).jpeg",
    "WhatsApp%20Image%202025-11-30%20at%2016.43.58%20(3).jpeg",
    "WhatsApp%20Image%202025-11-30%20at%2016.43.58.jpeg",
    "imgs/p5.jpg",
  ];

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className={`py-24 px-6 md:px-12 bg-white transition-all duration-700 ${
        visible ? "opacity-100 section-visible" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold soft-reveal">Gallery</h2>
        <p className="opacity-75 mt-3 soft-reveal">Discover our gym atmosphere.</p>

        {/* STACK */}
        <div className="mt-16 flex justify-center">
          <div ref={stackRef} id="stack" className="stack-container">
            {photos.map((img, i) => (
              <img
                key={i}
                width={300}
                height={400}
                loading="lazy"
                src={`https://ik.imagekit.io/latsqiyxk/tr:w-700,q-60/${img}`}
                className={`stack-img stack-${i + 1}`}
                alt="gallery-photo"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
