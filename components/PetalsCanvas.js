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
    const maxParticles = 65; // Soft density

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Custom Canvas illustration function: Wedding Dress
    const drawDress = (ctx, size, color) => {
      ctx.save();
      ctx.beginPath();
      
      // Neckline and straps
      ctx.moveTo(-size * 0.2, -size * 0.6);
      ctx.lineTo(-size * 0.3, -size * 0.9); // Left strap
      ctx.lineTo(-size * 0.15, -size * 0.9);
      ctx.lineTo(0, -size * 0.55); // Cleavage / neckline center
      ctx.lineTo(size * 0.15, -size * 0.9);
      ctx.lineTo(size * 0.3, -size * 0.9); // Right strap
      ctx.lineTo(size * 0.2, -size * 0.6);
      
      // Bodice contours down to waist line
      ctx.lineTo(size * 0.15, -size * 0.15); // Right waist point
      
      // Skirt flow right boundary
      ctx.quadraticCurveTo(size * 0.45, size * 0.35, size * 0.7, size * 0.95);
      
      // Curved bottom dress hemline
      ctx.quadraticCurveTo(0, size * 1.1, -size * 0.7, size * 0.95);
      
      // Skirt flow left boundary
      ctx.quadraticCurveTo(-size * 0.45, size * 0.35, -size * 0.15, -size * 0.15);
      
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Delicate gold glitter belt bow at waist
      ctx.beginPath();
      ctx.rect(-size * 0.15, -size * 0.2, size * 0.3, size * 0.08);
      ctx.fillStyle = "rgba(229, 193, 107, 0.75)";
      ctx.fill();
      
      ctx.restore();
    };

    // Custom Canvas illustration function: Flower Bloom
    const drawFlower = (ctx, size, color) => {
      ctx.save();
      // Draw 5 outer rounded petals
      const numPetals = 5;
      for (let i = 0; i < numPetals; i++) {
        const angle = (i * 2 * Math.PI) / numPetals;
        const px = Math.cos(angle) * size * 0.35;
        const py = Math.sin(angle) * size * 0.35;
        ctx.beginPath();
        ctx.arc(px, py, size * 0.32, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      }

      // Draw a bright contrasting white center core
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.22, 0, 2 * Math.PI);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.restore();
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height - 30;
        this.size = Math.random() * 10 + 8;
        this.speedY = Math.random() * 0.6 + 0.4; // Graceful drifting
        this.speedX = Math.random() * 0.3 - 0.15;
        this.angle = Math.random() * 360;
        
        // Random particle types: 45% flowers, 40% leaves/petals, 10% wedding dresses, 5% sparkles
        const rand = Math.random();
        if (rand < 0.45) {
          this.type = "flower";
          this.spin = Math.random() * 0.8 - 0.4;
        } else if (rand < 0.85) {
          this.type = "petal";
          this.spin = Math.random() * 1.2 - 0.6;
        } else if (rand < 0.95) {
          this.type = "dress";
          this.size = Math.random() * 12 + 10; // Slightly larger for detail visibility
          this.spin = Math.random() * 0.3 - 0.15; // Slow gentle tilt
        } else {
          this.type = "glitter";
          this.spin = Math.random() * 2.0 - 1.0;
        }

        this.opacity = Math.random() * 0.3 + 0.22; // Soft, delicate blending
        this.aspect = Math.random() * 0.4 + 0.5;

        // Custom pastel colors: Pink, Sky Blue, Lavender, Peach, Sage Green, Champagne Yellow
        const colors = [
          "rgba(250, 208, 224, ", // Blush Pink
          "rgba(198, 220, 253, ", // Sky Blue
          "rgba(198, 181, 232, ", // Lavender
          "rgba(251, 194, 153, ", // Soft Peach
          "rgba(211, 226, 198, ", // Mind Cream/Sage
          "rgba(253, 227, 183, ", // Butter Yellow
        ];
        
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 60) * 0.3;
        this.angle += this.spin;

        if (this.y > canvas.height + 30) {
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
        } else if (this.type === "flower") {
          drawFlower(ctx, this.size, this.colorBase + this.opacity + ")");
        } else if (this.type === "dress") {
          drawDress(ctx, this.size, this.colorBase + (this.opacity + 0.12) + ")");
        } else {
          // Glitter sparkles
          ctx.beginPath();
          ctx.moveTo(0, -this.size / 2);
          ctx.lineTo(this.size / 3, 0);
          ctx.lineTo(0, this.size / 2);
          ctx.lineTo(-this.size / 3, 0);
          ctx.closePath();
          ctx.fillStyle = this.colorBase + (this.opacity + 0.3) + ")";
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Distribute particles across canvas initially
    for (let i = 0; i < maxParticles; i++) {
      const p = new Particle();
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
