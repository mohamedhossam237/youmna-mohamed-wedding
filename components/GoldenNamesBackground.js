"use client";
import React from "react";

export default function GoldenNamesBackground() {
  return (
    <div className="golden-watermark-container" aria-hidden="true">
      {/* 1. Top Right Floating Calligraphy */}
      <div className="golden-calligraphy-item float-item-1">
        <span className="golden-watermark-text font-ruqaa">محمد &amp; يمنى</span>
      </div>

      {/* 2. Center-Left Subtle Giant Watermark */}
      <div className="golden-calligraphy-item float-item-2">
        <span className="golden-watermark-text font-amiri giant-text">محمد ♡ يمنى</span>
      </div>

      {/* 3. Bottom Right Drifting Calligraphy */}
      <div className="golden-calligraphy-item float-item-3">
        <span className="golden-watermark-text font-ruqaa">يمنى &amp; محمد</span>
      </div>

      {/* 4. Ambient Golden Ornamental Ring Swirl */}
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
    </div>
  );
}
