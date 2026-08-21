"use client";
import React, { useState, useEffect } from "react";

export default function WishesBoard({ newWish }) {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all wishes from MongoDB when the board mounts
  useEffect(() => {
    async function fetchWishes() {
      setLoading(true);
      try {
        const res = await fetch("/api/rsvp", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setWishes(data);
        }
      } catch (err) {
        console.error("Error fetching wishes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWishes();
  }, []); // Runs once when this component mounts (i.e. when slide 3 is visible)

  // When a new wish is submitted, prepend it instantly without re-fetching
  useEffect(() => {
    if (newWish) {
      setWishes((prev) => {
        // Avoid duplicates if already in list
        if (prev.some((w) => w.id === newWish.id)) return prev;
        return [newWish, ...prev];
      });
    }
  }, [newWish]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      return dateString;
    }
  };

  const filteredWishes = wishes.filter((w) => w.message && w.message.trim() !== "");

  if (loading) {
    return (
      <div className="no-wishes">
        <p style={{ color: "var(--accent-gold)", animation: "pulse 1.5s infinite" }}>
          ✨ جاري تحميل التهاني...
        </p>
      </div>
    );
  }

  if (filteredWishes.length === 0) {
    return (
      <div className="no-wishes">
        <p>لا توجد تهاني مسجلة بعد.</p>
        <p style={{ fontSize: "12px", marginTop: "5px", color: "var(--text-muted)" }}>
          كن أول من يكتب تهنئة مباركة للعروسين بالنموذج أعلاه! ✨
        </p>
      </div>
    );
  }

  return (
    <div className="wishes-board">
      {filteredWishes.map((wish, index) => {
        const colorClass = `card-${index % 5}`;
        return (
          <div key={wish.id || index} className={`wish-card ${colorClass}`}>
            <div className="wish-header">
              <span className="wish-name">{wish.name}</span>
              <span className={`wish-badge ${wish.attending ? "attending" : "declined"}`}>
                {wish.attending ? "حاضر بكل سرور 🌸" : "معتذر بأسف ✉️"}
              </span>
            </div>
            <p className="wish-message">{wish.message}</p>
            <div className="wish-date">{formatDate(wish.timestamp)}</div>
          </div>
        );
      })}
    </div>
  );
}
