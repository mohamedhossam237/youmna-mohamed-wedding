"use client";
import React, { useState } from "react";

export default function Envelope({ isOpened, onOpen }) {
  const [isOpenClicked, setIsOpenClicked] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (isOpenClicked) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Rotate max 10 degrees for a subtle elegant tilt
    const tiltX = (x / (rect.width / 2)) * 10;
    const tiltY = -(y / (rect.height / 2)) * 10;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleOpen = (e) => {
    if (e) {
      e.stopPropagation();
    }
    if (isOpenClicked) return;
    
    setIsOpenClicked(true);
    setTilt({ x: 0, y: 0 }); // Reset tilt
    // Sequence delays: flap opens, card rises, then screen fades out
    setTimeout(() => {
      onOpen();
    }, 2200);
  };

  return (
    <div
      className={`envelope-screen-wrapper ${isOpened ? "opened" : ""}`}
      style={{ flexDirection: "column", gap: "25px" }}
    >
      {!isOpenClicked && (
        <div
          className="animate-fade-in-up"
          style={{
            textAlign: "center",
            animationDuration: "1s",
            padding: "0 20px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "var(--accent-gold-light)",
              letterSpacing: "2px",
              marginBottom: "8px",
              textShadow: "0 0 10px rgba(229, 193, 107, 0.2)",
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <h2
            className="calligraphy-title gold-text"
            style={{
              fontSize: "34px",
              fontWeight: "700",
              lineHeight: "1.3",
              textShadow: "0 0 20px rgba(229, 193, 107, 0.25)",
            }}
          >
            دعوة لحضور عقد القران المبارك
          </h2>
          <div
            className="divider-ornament"
            style={{ margin: "10px auto", width: "100px" }}
          >
            <span style={{ fontSize: "16px", color: "var(--accent-gold)" }}>❦</span>
          </div>
          <div
            style={{
              display: "inline-block",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "20px",
              padding: "6px 22px",
              boxShadow: "var(--shadow-dark)",
              marginTop: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-tajawal)",
                fontSize: "14px",
                fontWeight: "700",
                color: "var(--primary-brand-light)",
                letterSpacing: "0.5px",
              }}
            >
              محمد هاشم &amp; يمنى محمود
            </span>
          </div>
        </div>
      )}

      <div
        className={`envelope-container-3d ${isOpenClicked ? "open" : ""}`}
        onClick={handleOpen}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="envelope-3d"
          style={{
            transform: isOpenClicked
              ? "scale(0.85) translateY(120vh)"
              : `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            transition: isOpenClicked
              ? "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
              : "transform 0.1s ease-out",
          }}
        >
          {/* Internal corner ornaments */}
          <div className="envelope-bg-ornament top-left" />
          <div className="envelope-bg-ornament bottom-right" />

          {/* Top flap folding open */}
          <div className="envelope-flap-3d" />

          {/* Inner card sliding up */}
          <div className="envelope-card-3d">
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                color: "var(--accent-gold-dark)",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              عقد قران مبارك
            </span>
            <h2 className="envelope-title" style={{ fontSize: "28px", margin: "5px 0" }}>
              محمد &amp; يمنى
            </h2>
            <div className="divider-ornament" style={{ margin: "5px 0", width: "80px" }}>
              <span>✿</span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "5px 0 0 0" }}>
              نتشرف بدعوتكم لمشاركتنا فرحة العمر
            </p>
            
            {isOpenClicked && (
              <p
                className="animate-fade-in-up"
                style={{
                  fontSize: "11px",
                  color: "var(--primary-brand)",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                جاري فتح بطاقة الدعوة... ✨
              </p>
            )}
          </div>

          {/* Gold Wax Seal stamp */}
          <div className="wax-seal-3d" onClick={handleOpen}>
            <div className="seal-pulse" />
            <div className="wax-seal-stamp">
              <span>M &amp; Y</span>
            </div>
          </div>
        </div>

        {!isOpenClicked && (
          <>
            <p
              className="click-hint-text"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: "inline-block", verticalAlign: "middle" }}
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>اضغط على الختم الذهبي لفتح الدعوة</span>
            </p>
            <p
              style={{
                position: "absolute",
                bottom: "-75px",
                width: "100%",
                textAlign: "center",
                fontSize: "14px",
                color: "var(--accent-gold-light)",
                fontFamily: "var(--font-ruqaa)",
                opacity: 0.85,
                pointerEvents: "none",
                letterSpacing: "0.5px",
              }}
            >
              إهداء من صديقة عمرك: عايدة سامح 🤍
            </p>
          </>
        )}
      </div>
    </div>
  );
}
