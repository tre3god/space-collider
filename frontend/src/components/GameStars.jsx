// Actual game stars with names and physics interactions

import { useEffect, useRef } from "react";
import Star from "../models/Star";

export default function Stars({ count, starNames = [] }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize stars only once
    if (starsRef.current.length === 0) {
      starsRef.current = Array.from({ length: count }, (_, i) =>
        new Star(
          starNames[i]?.name || `Star ${i + 1}`,
          canvas.width,
          canvas.height
        )
      );
    }

    let animationId;

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add or remove stars if count changes
      const diff = count - starsRef.current.length;

      if (diff > 0) {
        const startIndex = starsRef.current.length;

        for (let i = 0; i < diff; i++) {
          const index = startIndex + i;

          starsRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 2 + 1,
            name: starNames[index]?.name || `Star ${index + 1}`,
          });
        }
      } else if (diff < 0) {
        starsRef.current.splice(diff);
      }

      // Physics + drawing
      // starsRef.current.forEach((star, i) => {
      //   star.x += star.vx;
      //   star.y += star.vy;

      //   // Bounce
      //   if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
      //   if (star.y < 0 || star.y > canvas.height) star.vy *= -1;

      //   // Gravity interaction
      //   for (let j = i + 1; j < starsRef.current.length; j++) {
      //     const other = starsRef.current[j];

      //     const dx = other.x - star.x;
      //     const dy = other.y - star.y;
      //     const dist = Math.sqrt(dx * dx + dy * dy);

      //     const minDist = (star.size + other.size) * 10;

      //     if (dist < minDist && dist > 0) {
      //       const force = (minDist - dist) * 0.001;

      //       const fx = (dx / dist) * force;
      //       const fy = (dy / dist) * force;

      //       star.vx += fx;
      //       star.vy += fy;

      //       other.vx -= fx;
      //       other.vy -= fy;
      //     }
      //   }

      // New Gravity code with mass and proper force calculation
      starsRef.current.forEach((star, i) => {

      star.x += star.vx;
      star.y += star.vy;

      if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
      if (star.y < 0 || star.y > canvas.height) star.vy *= -1;

      const G = 5;

      for (let j = i + 1; j < starsRef.current.length; j++) {
        const other = starsRef.current[j];

        const dx = other.x - star.x;
        const dy = other.y - star.y;

        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < 2) continue;
          const force = (G * star.mass * other.mass) / distSq;

          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          star.vx += fx / star.mass;
          star.vy += fy / star.mass;

          other.vx -= fx / other.mass;
          other.vy -= fy / other.mass;
        }

      });

        // Draw star
        // ctx.beginPath();
        // ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        // ctx.fillStyle = "white";
        // ctx.fill();

        // // Draw star name
        // ctx.fillStyle = "white";
        // ctx.font = "12px Arial";
        // ctx.fillText(star.name, star.x + 6, star.y - 6);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(update);
    };

    update();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [count, starNames]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}