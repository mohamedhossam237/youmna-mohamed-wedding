"use client";
import React, { useState } from "react";

export default function Envelope({ isOpened, onStartOpen, onCompleteOpen }) {
  const [isOpenClicked, setIsOpenClicked] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (isOpenClicked) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: y * -20 }); // Max 20deg tilt
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
    
    if (onStartOpen) {
      onStartOpen();
    }
    
    // Sequence delays: flap opens, card rises, then screen fades out
    setTimeout(() => {
      if (onCompleteOpen) {
        onCompleteOpen();
      }
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
              color: "var(--accent-gold)",
              letterSpacing: "2px",
              marginBottom: "8px",
              textShadow: "0 0 5px rgba(229, 193, 107, 0.15)",
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
              textShadow: "0 0 10px rgba(229, 193, 107, 0.15)",
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
              background: "rgba(255, 255, 255, 0.65)",
              border: "1px solid var(--border-glass)",
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
          {/* Left Fold with Gold dashed border and Corner Vines */}
          <div className="envelope-fold-left">
            <svg width="100%" height="100%" viewBox="0 0 100 200" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
              <polyline points="1,1 98,100 1,199" fill="none" stroke="var(--accent-gold)" strokeWidth="1.2" strokeDasharray="3 3" />
              
              {/* Left corner leaf detail */}
              <g transform="translate(6, 6) scale(0.35)" stroke="var(--accent-gold)" strokeWidth="1.5" fill="none">
                <path d="M0 0 C15 5, 25 15, 30 30" />
                <path d="M0 0 C5 15, 15 25, 30 30" />
                <circle cx="15" cy="15" r="2.5" fill="var(--accent-gold)" />
              </g>
              <g transform="translate(6, 194) scale(0.35) scaleY(-1)" stroke="var(--accent-gold)" strokeWidth="1.5" fill="none">
                <path d="M0 0 C15 5, 25 15, 30 30" />
                <path d="M0 0 C5 15, 15 25, 30 30" />
                <circle cx="15" cy="15" r="2.5" fill="var(--accent-gold)" />
              </g>
            </svg>
          </div>

          {/* Right Fold with Gold dashed border and Corner Vines */}
          <div className="envelope-fold-right">
            <svg width="100%" height="100%" viewBox="0 0 100 200" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
              <polyline points="99,1 2,100 99,199" fill="none" stroke="var(--accent-gold)" strokeWidth="1.2" strokeDasharray="3 3" />
              
              {/* Right corner leaf detail */}
              <g transform="translate(94, 6) scale(0.35) scaleX(-1)" stroke="var(--accent-gold)" strokeWidth="1.5" fill="none">
                <path d="M0 0 C15 5, 25 15, 30 30" />
                <path d="M0 0 C5 15, 15 25, 30 30" />
                <circle cx="15" cy="15" r="2.5" fill="var(--accent-gold)" />
              </g>
              <g transform="translate(94, 194) scale(0.35) scaleX(-1) scaleY(-1)" stroke="var(--accent-gold)" strokeWidth="1.5" fill="none">
                <path d="M0 0 C15 5, 25 15, 30 30" />
                <path d="M0 0 C5 15, 15 25, 30 30" />
                <circle cx="15" cy="15" r="2.5" fill="var(--accent-gold)" />
              </g>
            </svg>
          </div>

          {/* Bottom Fold with Gold dashed border and Filigree */}
          <div className="envelope-fold-bottom">
            <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
              <polyline points="2,98 100,2 198,98" fill="none" stroke="var(--accent-gold)" strokeWidth="1.2" strokeDasharray="3 3" />
              
              {/* Bottom corner detail */}
              <g transform="translate(10, 90) scale(0.35)" stroke="var(--accent-gold)" strokeWidth="1.5" fill="none">
                <path d="M0 0 C15 -5, 25 -15, 30 -30" />
                <circle cx="15" cy="-15" r="2.5" fill="var(--accent-gold)" />
              </g>
              <g transform="translate(190, 90) scale(0.35) scaleX(-1)" stroke="var(--accent-gold)" strokeWidth="1.5" fill="none">
                <path d="M0 0 C15 -5, 25 -15, 30 -30" />
                <circle cx="15" cy="-15" r="2.5" fill="var(--accent-gold)" />
              </g>
            </svg>
          </div>

          {/* Top flap folding open with Gold dashed border and Leaf Crest */}
          <div className="envelope-flap-3d">
            <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
              <polyline points="2,2 100,98 198,2" fill="none" stroke="var(--accent-gold)" strokeWidth="1.2" strokeDasharray="3 3" />
              <polyline points="5,2 100,93 195,2" fill="none" stroke="var(--accent-gold-light)" strokeWidth="0.8" />
              
              {/* Central gold ornament pointing up from the flap tip */}
              <g transform="translate(100, 76) scale(0.55)">
                <path d="M0 25 C-10 15, -15 5, 0 -15 C15 5, 10 15, 0 25 Z" fill="var(--accent-gold)" opacity="0.25"/>
                <path d="M0 25 C-5 18, -8 10, 0 0 C8 10, 5 18, 0 25 Z" fill="var(--accent-gold)" opacity="0.85"/>
                <circle cx="0" cy="-20" r="2.5" fill="var(--accent-gold)"/>
                {/* Left leaf sprig */}
                <path d="M0 15 Q-12 10 -20 -2 Q-8 -2 0 15" fill="var(--accent-gold)" opacity="0.75"/>
                {/* Right leaf sprig */}
                <path d="M0 15 Q12 10 20 -2 Q8 -2 0 15" fill="var(--accent-gold)" opacity="0.75"/>
              </g>
            </svg>
          </div>

          {/* Internal corner ornaments */}
          <div className="envelope-bg-ornament top-left" />
          <div className="envelope-bg-ornament bottom-right" />

          {/* Inner card sliding up */}
          <div className="envelope-card-3d">
            {/* Elegant minimalist gold crest */}
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" style={{ marginBottom: "8px" }}>
              <path d="M20 2 C16 6, 6 10, 2 20 M20 2 C24 6, 34 10, 38 20" stroke="var(--accent-gold)" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M20 6 C17 9, 10 12, 8 18 M20 6 C23 9, 30 12, 32 18" stroke="var(--accent-gold)" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
              <circle cx="20" cy="2" r="1.5" fill="var(--accent-gold)"/>
            </svg>
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

          {/* Foliage & Ribbon backing underneath the wax seal */}
          {!isOpenClicked && (
            <>
              {/* Ribbon hanging out */}
              <div className="seal-ribbons">
                <div className="ribbon-left" />
                <div className="ribbon-right" />
              </div>
              
              {/* Foliage sprigs sticking out */}
              <div className="seal-foliage">
                {/* Left olive branch */}
                <svg className="foliage-left" width="90" height="50" viewBox="0 0 100 50" fill="none">
                  <path d="M100 25 C70 25, 45 15, 10 10 M100 25 C80 20, 60 10, 40 5" stroke="var(--palette-sage)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M25 12 C20 6, 12 10, 16 16 C20 22, 28 18, 25 12 Z" fill="var(--palette-sage)" opacity="0.95"/>
                  <path d="M50 14 C45 6, 35 8, 38 15 C41 22, 50 18, 50 14 Z" fill="var(--palette-sage)" opacity="0.95"/>
                  <path d="M72 18 C67 10, 58 12, 60 19 C62 26, 72 22, 72 18 Z" fill="var(--palette-sage)" opacity="0.95"/>
                  <path d="M8 8 C3 2, -3 6, 1 12 C5 18, 12 14, 8 8 Z" fill="var(--palette-sage)" opacity="0.95"/>
                </svg>
                {/* Right olive branch */}
                <svg className="foliage-right" width="90" height="50" viewBox="0 0 100 50" fill="none">
                  <path d="M100 25 C70 25, 45 15, 10 10 M100 25 C80 20, 60 10, 40 5" stroke="var(--palette-sage)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M25 12 C20 6, 12 10, 16 16 C20 22, 28 18, 25 12 Z" fill="var(--palette-sage)" opacity="0.95"/>
                  <path d="M50 14 C45 6, 35 8, 38 15 C41 22, 50 18, 50 14 Z" fill="var(--palette-sage)" opacity="0.95"/>
                  <path d="M72 18 C67 10, 58 12, 60 19 C62 26, 72 22, 72 18 Z" fill="var(--palette-sage)" opacity="0.95"/>
                  <path d="M8 8 C3 2, -3 6, 1 12 C5 18, 12 14, 8 8 Z" fill="var(--palette-sage)" opacity="0.95"/>
                </svg>
              </div>
            </>
          )}

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
                fontSize: "16px",
                color: "#d4af37", // Rich metallic gold
                fontFamily: "var(--font-ruqaa)",
                fontWeight: "bold",
                opacity: 1,
                pointerEvents: "none",
                letterSpacing: "0.5px",
                textShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
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
