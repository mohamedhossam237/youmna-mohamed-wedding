"use client";
import React, { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    // Target date: September 1, 2026 at 6:00 PM (GMT+3)
    const targetDate = new Date("2026-09-01T18:00:00+03:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isCompleted) {
    return (
      <div className="countdown-completed">
        <h3>لقد عقدنا قراننا وتمت فرحتنا! نسعد بحضوركم.</h3>
      </div>
    );
  }

  const items = [
    { label: "أيام", value: timeLeft.days },
    { label: "ساعات", value: timeLeft.hours },
    { label: "دقائق", value: timeLeft.minutes },
    { label: "ثواني", value: timeLeft.seconds },
  ];

  return (
    <div className="countdown-container">
      {items.map((item, idx) => (
        <div key={idx} className="countdown-item">
          <span className="countdown-val">
            {item.value.toString().padStart(2, "0")}
          </span>
          <span className="countdown-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
