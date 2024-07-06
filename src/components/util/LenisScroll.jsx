import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const LenisScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // custom easing function
      smooth: true,
      direction: "vertical",
    });

    const animate = (time) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return <div>{children}</div>;
};

export default LenisScroll;
