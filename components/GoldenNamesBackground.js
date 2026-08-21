"use client";
import React from "react";

export default function GoldenNamesBackground() {
  return (
    <div className="golden-watermark-container" aria-hidden="true">
      {/* 1. Top Right Floating Calligraphy */}
      <div className="golden-calligraphy-item float-item-1">
        <span className="golden-watermark-text font-ruqaa">محمد &amp; يمنى</span>
      </div>

      {/* 2. Center-Left Giant Calligraphy */}
      <div className="golden-calligraphy-item float-item-2">
        <span className="golden-watermark-text font-amiri giant-text">محمد ♡ يمنى</span>
      </div>

      {/* 3. Bottom Right Drifting Calligraphy */}
      <div className="golden-calligraphy-item float-item-3">
        <span className="golden-watermark-text font-ruqaa">يمنى &amp; محمد</span>
      </div>

      {/* 4. Ambient Gold Swirl Ornament */}
      <div className="golden-calligraphy-item float-item-4">
        <svg width="260" height="260" viewBox="0 0 200 200" fill="none" className="golden-swirl-svg">
          <circle cx="100" cy="100" r="80" stroke="url(#goldSwirlGrad)" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="100" cy="100" r="60" stroke="url(#goldSwirlGrad)" strokeWidth="0.75" />
          <path d="M60 100 Q100 40 140 100 Q100 160 60 100" stroke="url(#goldSwirlGrad)" strokeWidth="0.8" fill="none" />
          <defs>
            <linearGradient id="goldSwirlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-gold-light)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="var(--accent-gold)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--accent-gold-dark)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 5. Center Floating Monogram Emblem */}
      <div className="golden-calligraphy-item float-item-5">
        <span className="golden-watermark-text font-ruqaa letter-monogram">M &amp; Y</span>
      </div>

      {/* 6. Subtle Floating Wedding Dress Silhouette (Blush Pink) */}
      <div className="golden-calligraphy-item float-watermark-dress" style={{ color: "var(--palette-pink)" }}>
        <svg width="80" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 10 C40 10, 44 20, 50 20 C56 20, 60 10, 60 10 L65 25 C65 25, 57 32, 50 32 C43 32, 35 25, 35 25 L40 10 Z" fill="currentColor"/>
          <path d="M38 34 C43 35, 57 35, 62 34 L78 90 C70 95, 30 95, 22 90 L38 34 Z" fill="currentColor"/>
          <path d="M38 34 L62 34 C62 34, 58 40, 50 40 C42 40, 38 34, 38 34 Z" fill="#ffffff" opacity="0.2"/>
        </svg>
      </div>

      {/* 7. Subtle Floating Bouquet of Flowers (Sage Green) */}
      <div className="golden-calligraphy-item float-watermark-bouquet" style={{ color: "var(--palette-sage)" }}>
        <svg width="70" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 90 L40 50 M50 90 L50 52 M50 90 L60 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="38" cy="35" r="14" fill="currentColor"/>
          <circle cx="62" cy="35" r="14" fill="currentColor"/>
          <circle cx="50" cy="22" r="14" fill="currentColor"/>
          <circle cx="50" cy="35" r="8" fill="#ffffff" opacity="0.3"/>
        </svg>
      </div>

      {/* 8. Subtle Floating Wedding Butterfly (Sky Blue) */}
      <div className="golden-calligraphy-item float-watermark-butterfly" style={{ color: "var(--palette-blue)" }}>
        <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 50 C35 25, 10 30, 20 50 C25 60, 45 55, 50 50 Z" fill="currentColor"/>
          <path d="M50 50 C65 25, 90 30, 80 50 C75 60, 55 55, 50 50 Z" fill="currentColor"/>
          <path d="M50 50 C38 60, 25 75, 35 85 C42 90, 48 70, 50 50 Z" fill="currentColor"/>
          <path d="M50 50 C62 60, 75 75, 65 85 C58 90, 52 70, 50 50 Z" fill="currentColor"/>
          <path d="M48 40 Q45 25 38 20 M52 40 Q55 25 62 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* 9. Subtle Floating Wedding Rings (Champagne/Butter Yellow) */}
      <div className="golden-calligraphy-item float-watermark-rings" style={{ color: "var(--palette-yellow)" }}>
        <svg width="75" height="75" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="38" cy="62" r="20" stroke="currentColor" strokeWidth="4"/>
          <circle cx="62" cy="62" r="20" stroke="currentColor" strokeWidth="4"/>
          <path d="M38 42 L43 32 L33 32 Z M62 42 L67 32 L57 32 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* 10. Subtle Floating Interlocking Hearts (Soft Peach) */}
      <div className="golden-calligraphy-item float-watermark-hearts" style={{ color: "var(--palette-peach)" }}>
        <svg width="75" height="75" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 60 C25 45, 12 55, 12 68 C12 80, 25 90, 35 94 C45 90, 58 80, 58 68 C58 55, 45 45, 35 60 Z" fill="currentColor"/>
          <path d="M60 35 C52 22, 40 30, 40 42 C40 52, 52 60, 60 64 C68 60, 80 52, 80 42 C80 30, 68 22, 60 35 Z" fill="currentColor" opacity="0.85"/>
        </svg>
      </div>
    </div>
  );
}
