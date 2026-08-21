"use client";
import React, { useState, useEffect, useRef } from "react";

export default function WishesBoard({ newWish }) {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const tickerRef = useRef(null);

  // Fetch all wishes from MongoDB when the board mounts
  useEffect(() => {
    async function fetchWishes() {
      setLoading(true);
      try {
        const res = await fetch("/api/rsvp", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setWishes(data.filter((w) => w.message && w.message.trim() !== ""));
        }
      } catch (err) {
        console.error("Error fetching wishes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWishes();
  }, []);

  // Prepend instantly when a new wish is submitted
  useEffect(() => {
    if (newWish && newWish.message && newWish.message.trim() !== "") {
      setWishes((prev) => {
        if (prev.some((w) => w.id === newWish.id)) return prev;
        return [newWish, ...prev];
      });
    }
  }, [newWish]);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const accentColors = [
    { border: "var(--palette-pink)", glow: "rgba(250,208,224,0.18)", icon: "💌" },
    { border: "var(--palette-blue)", glow: "rgba(198,220,253,0.18)", icon: "✨" },
    { border: "var(--palette-sage)", glow: "rgba(211,226,198,0.18)", icon: "🌿" },
    { border: "var(--palette-peach)", glow: "rgba(251,194,153,0.18)", icon: "🌸" },
    { border: "var(--palette-lavender)", glow: "rgba(198,181,232,0.18)", icon: "💜" },
  ];

  if (loading) {
    return (
      <div className="wb-loading-state">
        <div className="wb-loading-dots">
          <span /><span /><span />
        </div>
        <p>جاري تحميل كلمات المحبة...</p>
      </div>
    );
  }

  if (wishes.length === 0) {
    return (
      <div className="wb-empty-state">
        <div className="wb-empty-icon">💌</div>
        <p className="wb-empty-title">كن أول من يكتب تهنئة</p>
        <p className="wb-empty-sub">شاركنا كلمة طيبة تسعد بها قلوب العروسين ✨</p>
      </div>
    );
  }

  return (
    <div className="wb-wrapper">
      {/* Floating count badge */}
      <div className="wb-count-badge">
        <span className="wb-count-num">{wishes.length}</span>
        <span className="wb-count-label">تهنئة مباركة</span>
      </div>

      {/* Cards Grid */}
      <div className="wb-cards-grid" ref={tickerRef}>
        {wishes.map((wish, i) => {
          const accent = accentColors[i % accentColors.length];
          return (
            <div
              key={wish.id || i}
              className="wb-card"
              style={{
                "--accent-border": accent.border,
                "--accent-glow": accent.glow,
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {/* Top quote mark */}
              <span className="wb-quote-mark">"</span>

              {/* Message */}
              <p className="wb-message">{wish.message}</p>

              {/* Footer */}
              <div className="wb-footer">
                <div className="wb-author">
                  <div className="wb-avatar" style={{ background: accent.glow, borderColor: accent.border }}>
                    {wish.name.charAt(0)}
                  </div>
                  <div className="wb-author-info">
                    <span className="wb-author-name">{wish.name}</span>
                    <span className="wb-author-date">{formatDate(wish.timestamp)}</span>
                  </div>
                </div>
                <span className={`wb-status-badge ${wish.attending ? "wb-attending" : "wb-declined"}`}>
                  {wish.attending ? "🌸 حاضر" : "✉️ معتذر"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
