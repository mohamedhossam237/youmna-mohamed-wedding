"use client";
import React, { useEffect, useRef } from "react";

export default function PetalsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    const maxParticles = 60; // Smooth performance

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height - 20;
        this.size = Math.random() * 8 + 6;
        this.speedY = Math.random() * 0.7 + 0.5; // Very slow and graceful fall
        this.speedX = Math.random() * 0.4 - 0.2;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 1.2 - 0.6;
        
        // 75% floral petals, 25% diamond sparkles
        this.type = Math.random() > 0.25 ? "petal" : "glitter";
        this.opacity = Math.random() * 0.35 + 0.25; // Transparent and soft
        this.aspect = Math.random() * 0.4 + 0.5; // Petal shape stretch

        // Colors directly mapped to the user's custom pastel palette:
        // Sage (#d3e2c6), Champagne Yellow (#fde3b7), Sky Blue (#c6dcfd), Pink (#fad0e0), Peach (#fbc299), Lavender (#c6b5e8)
        const colors = [
          "rgba(211, 226, 198, ", // Sage
          "rgba(253, 227, 183, ", // Champagne Gold
          "rgba(198, 220, 253, ", // Sky Blue
          "rgba(250, 208, 224, ", // Pink
          "rgba(251, 194, 153, ", // Peach/Apricot
          "rgba(198, 181, 232, ", // Lavender
        ];
        
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 50) * 0.4;
        this.angle += this.spin;

        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        if (this.type === "petal") {
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * this.aspect, this.size, 0, 0, 2 * Math.PI);
          ctx.fillStyle = this.colorBase + this.opacity + ")";
          ctx.fill();
        } else {
          // Sparkly diamond for gold/pastel dust
          ctx.beginPath();
          ctx.moveTo(0, -this.size / 2);
          ctx.lineTo(this.size / 3, 0);
          ctx.lineTo(0, this.size / 2);
          ctx.lineTo(-this.size / 3, 0);
          ctx.closePath();
          // Make glitter slightly brighter
          ctx.fillStyle = this.colorBase + (this.opacity + 0.25) + ")";
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Initialize particles spread out vertically across the viewport initially
    for (let i = 0; i < maxParticles; i++) {
      const p = new Petal();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
