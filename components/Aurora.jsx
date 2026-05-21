"use client";
import { useEffect, useRef } from "react";

const Aurora = ({
  colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981"],
  speed = 1,
  opacity = 0.6,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawAurora = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      colors.forEach((color, i) => {
        const x =
          canvas.width *
          (0.2 + i * 0.2 + Math.sin(time * 0.3 * speed + i) * 0.15);
        const y =
          canvas.height * (0.3 + Math.cos(time * 0.2 * speed + i * 1.5) * 0.2);
        const radius =
          canvas.width * (0.35 + Math.sin(time * 0.4 * speed + i) * 0.1);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `${color}99`);
        gradient.addColorStop(0.5, `${color}44`);
        gradient.addColorStop(1, `${color}00`);

        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(
          x,
          y,
          radius,
          radius * 0.4,
          Math.sin(time * 0.1 * speed + i) * Math.PI,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      });

      time += 0.01;
      animId = requestAnimationFrame(drawAurora);
    };

    drawAurora();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [colors, speed, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity }}
    />
  );
};

export default Aurora;
