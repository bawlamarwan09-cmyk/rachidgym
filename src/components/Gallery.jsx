import React from "react";
export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-4xl font-extrabold soft-reveal">Gallery</h2>
        <p className="opacity-75 mt-3 soft-reveal">
          Discover our gym atmosphere.
        </p>

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
