"use client";
import { useEffect, useRef, useState } from "react";

const ElectricBorder = ({
  children,
  color = "#22d3ee",
  roughness = 4, // ← higher = more chaotic/jagged
  speed = 1, // ← higher = faster animation
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const lastTimeRef = useRef(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const drawLightning = (x1, y1, x2, y2) => {
      const points = [{ x: x1, y: y1 }];
      const dx = x2 - x1;
      const dy = y2 - y1;
      const steps = Math.floor(Math.sqrt(dx * dx + dy * dy) / 10);

      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        points.push({
          x: x1 + dx * t + (Math.random() - 0.5) * roughness,
          y: y1 + dy * t + (Math.random() - 0.5) * roughness,
        });
      }
      points.push({ x: x2, y: y2 });

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 12;
      ctx.shadowColor = color;
      ctx.stroke();
    };

    // interval in ms between frames — lower = faster
    const interval = 100 / speed;

    const animate = (timestamp) => {
      if (timestamp - lastTimeRef.current >= interval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const w = canvas.width;
        const h = canvas.height;
        const pad = 4;

        drawLightning(pad, pad, w - pad, pad);
        drawLightning(w - pad, pad, w - pad, h - pad);
        drawLightning(w - pad, h - pad, pad, h - pad);
        drawLightning(pad, h - pad, pad, pad);

        lastTimeRef.current = timestamp;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    if (hovered) {
      animate(0);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animRef.current);
    }

    return () => cancelAnimationFrame(animRef.current);
  }, [hovered, color, roughness, speed]);

  return (
    <div
      ref={containerRef}
      className="relative rounded-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none rounded-lg z-20"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ElectricBorder;
