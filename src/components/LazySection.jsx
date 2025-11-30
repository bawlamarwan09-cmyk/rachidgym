import { useEffect, useRef, useState } from "react";

export default function LazySection({ children, className = "" }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } transition-all duration-700`}
    >
      {visible && children}
    </div>
  );
}
