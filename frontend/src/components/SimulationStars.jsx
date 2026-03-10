// Stars for simulation - no names, just physics

import { useEffect, useRef } from "react";

export default function Stars({ count }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  // Initialize stars only once
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize stars array if empty
    if (starsRef.current.length === 0) {
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1,
      }));
    }

    let animationId;

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add or remove stars if count changes
      const diff = count - starsRef.current.length;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          starsRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 2 + 1,
          });
        }
      } else if (diff < 0) {
        starsRef.current.splice(diff);
      }

      // Update positions & apply bouncing
      starsRef.current.forEach((star, i) => {
        // Move star
        star.x += star.vx;
        star.y += star.vy;

        // Bounce off edges
        if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1;

        // Apply gravity-like force from other stars
        for (let j = i + 1; j < starsRef.current.length; j++) {
          const other = starsRef.current[j];
          const dx = other.x - star.x;
          const dy = other.y - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = (star.size + other.size) * 10; // forcefield radius

          if (dist < minDist && dist > 0) {
            const force = (minDist - dist) * 0.001; // attraction strength
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            star.vx += fx;
            star.vy += fy;
            other.vx -= fx;
            other.vy -= fy;
          }
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });

      animationId = requestAnimationFrame(update);
    };

    update();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [count]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}