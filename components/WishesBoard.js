"use client";
import React from "react";

export default function WishesBoard({ wishes = [] }) {
  // Format dates to a readable Arabic format
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
        const colorClass = `card-${index % 5}`; // Rotates between 0 to 4
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
