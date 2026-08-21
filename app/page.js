"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import PetalsCanvas from "@/components/PetalsCanvas";
import MusicPlayer from "@/components/MusicPlayer";
import Envelope from "@/components/Envelope";
import Countdown from "@/components/Countdown";
import RSVPForm from "@/components/RSVPForm";
import WishesBoard from "@/components/WishesBoard";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [wishes, setWishes] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 });
  const slidesContainerRef = useRef(null);

  const handlePhotoMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPhotoTilt({ x: x * 12, y: y * -12 });
  };

  const handlePhotoMouseLeave = () => {
    setPhotoTilt({ x: 0, y: 0 });
  };

  // Fetch wishes from MongoDB — re-run on mount, when envelope opens, and when slide 3 becomes active
  const fetchWishes = React.useCallback(async () => {
    try {
      const res = await fetch("/api/rsvp", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setWishes(data);
      }
    } catch (err) {
      console.error("Error fetching wishes:", err);
    }
  }, []);

  // Fetch on initial mount
  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  // Re-fetch every time the envelope opens
  useEffect(() => {
    if (isOpened) fetchWishes();
  }, [isOpened, fetchWishes]);

  // Re-fetch when the user scrolls to slide 3 (wishes board)
  useEffect(() => {
    if (activeSlide === 2) fetchWishes();
  }, [activeSlide, fetchWishes]);

  const openEnvelope = () => {
    setIsOpened(true);
    setIsPlaying(true); // Automatically starts background audio on envelope open
  };

  const handleNewRsvp = (newRsvp) => {
    // Instantly append new wishes to the guestbook without page refresh
    setWishes((prev) => [newRsvp, ...prev]);
  };

  // Scroll tracking to update pagination dot status
  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    const clientHeight = e.currentTarget.clientHeight;
    if (clientHeight > 0) {
      const index = Math.round(scrollTop / clientHeight);
      setActiveSlide(index);
    }
  };

  // Smooth scroll to target slide index
  const scrollToSlide = (index) => {
    const container = slidesContainerRef.current;
    if (container) {
      const clientHeight = container.clientHeight;
      container.scrollTo({
        top: index * clientHeight,
        behavior: "smooth",
      });
      setActiveSlide(index);
    }
  };

  return (
    <main style={{ minHeight: "100vh", position: "relative", backgroundColor: "var(--bg-dark)" }}>
      {/* 1. Shifting Pastel Aura Background */}
      <div className="aurora-container">
        <div className="aurora-blob blob-1" />
        <div className="aurora-blob blob-2" />
        <div className="aurora-blob blob-3" />
        <div className="aurora-blob blob-4" />
      </div>

      {/* 2. Falling Petals Background Animation */}
      <PetalsCanvas />

      {/* 3. Sealed 3D Envelope Opening Screen */}
      <Envelope
        isOpened={isOpened}
        onStartOpen={() => setIsPlaying(true)}
        onCompleteOpen={() => setIsOpened(true)}
      />

      {/* 4. Floating Music Player */}
      <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      {/* 5. Navigation Dots (3 slides total) */}
      {isOpened && (
        <div className="pagination-dots">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className={`pagination-dot ${activeSlide === idx ? "active" : ""}`}
              onClick={() => scrollToSlide(idx)}
              title={`الشريحة ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* 6. Snap-Scrolling Slide Presentation */}
      {isOpened && (
        <div
          id="slides-wrapper"
          className="slides-container"
          ref={slidesContainerRef}
          onScroll={handleScroll}
        >
          {/* SLIDE 1: The Couple Cover & Countdown */}
          <section className="slide-section">
            <div className="glass-slide-card animate-fade-in-up" style={{ maxWidth: "620px", padding: 0 }}>
              {/* Header block with gold arched window & swirls */}
              <div className="slide-header-block">
                {/* Left Swirl */}
                <svg width="50" height="70" viewBox="0 0 100 100" fill="none" style={{ position: "absolute", left: "10%", opacity: 0.3, transform: "scaleX(-1)" }}>
                  <path d="M10 80C40 80 70 60 80 30C82 20 70 10 60 20C50 30 60 50 80 50C90 50 100 40 100 30" stroke="var(--accent-gold)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>

                {/* Arched couple photo (Wider & Animated Better) */}
                <div style={{ animation: "floatCard 6s infinite ease-in-out", zIndex: 5 }}>
                  <div
                    className="arch-frame-container"
                    style={{
                      width: "320px",
                      height: "240px",
                      borderRadius: "160px 160px 24px 24px",
                      transform: `perspective(1000px) rotateX(${photoTilt.y}deg) rotateY(${photoTilt.x}deg)`,
                      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    onMouseMove={handlePhotoMouseMove}
                    onMouseLeave={handlePhotoMouseLeave}
                  >
                    <div className="arch-inner-border" style={{ borderRadius: "154px 154px 20px 20px" }} />
                    <Image
                      src="/couple.png"
                      alt="Youmna and Mohamed"
                      fill
                      priority
                      className="arch-image-zoom"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>

                {/* Right Swirl */}
                <svg width="50" height="70" viewBox="0 0 100 100" fill="none" style={{ position: "absolute", right: "10%", opacity: 0.3 }}>
                  <path d="M10 80C40 80 70 60 80 30C82 20 70 10 60 20C50 30 60 50 80 50C90 50 100 40 100 30" stroke="var(--accent-gold)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Body Content Container */}
              <div style={{ padding: "25px 20px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "var(--accent-gold)",
                    letterSpacing: "2px",
                  }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </span>

                <h2
                  style={{
                    fontFamily: "var(--font-amiri)",
                    fontSize: "15px",
                    color: "var(--primary-brand-light)",
                    lineHeight: "1.6",
                    margin: "4px 0",
                    fontStyle: "italic",
                  }}
                >
                  &quot;وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
                  لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً&quot;
                </h2>

                <div className="divider-ornament" style={{ margin: "2px 0" }}>
                  <span>✿</span>
                </div>

                <h1
                  className="calligraphy-title"
                  style={{
                    fontSize: "36px",
                    color: "var(--white)",
                    margin: "5px 0",
                    lineHeight: "1.2",
                  }}
                >
                  محمد هاشم
                  <div style={{ display: "inline-flex", margin: "0 12px", verticalAlign: "middle" }}>
                    <svg
                      width="36"
                      height="22"
                      viewBox="0 0 60 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="22" cy="18" r="15" stroke="url(#goldGradient4)" strokeWidth="3.5" />
                      <circle cx="38" cy="18" r="15" stroke="url(#goldGradient4)" strokeWidth="3.5" />
                      <defs>
                        <linearGradient id="goldGradient4" x1="7" y1="3" x2="53" y2="33" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="var(--accent-gold-light)" />
                          <stop offset="50%" stopColor="var(--accent-gold)" />
                          <stop offset="100%" stopColor="var(--accent-gold-dark)" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  يمنى محمود
                </h1>

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.8",
                    color: "var(--text-muted)",
                    maxWidth: "500px",
                    marginTop: "2px",
                    marginBottom: "5px",
                  }}
                >
                  وعلشان فرحتنا مش هتكمل غير بلمتكم ووجودكم معانا.. بنتشرف بدعوة كل أهالينا وصحابنا وحبايبنا لحضور عقد قراننا وكتب كتابنا. فرحة العمر وبداية رحلتنا الجديدة مش هتحلو غير بيكم وبدعواتكم الجميلة لينا. مستنيينكم تنورونا وتشاركونا أجمل لحظات حياتنا!
                </p>

                <Countdown />

                <span
                  onClick={() => scrollToSlide(1)}
                  style={{
                    fontSize: "12px",
                    color: "var(--accent-gold)",
                    cursor: "pointer",
                    marginTop: "10px",
                    fontWeight: "bold",
                    animation: "bounceText 1.5s infinite alternate",
                    alignSelf: "center",
                  }}
                >
                  اسحب للأسفل للتفاصيل ⬇
                </span>
              </div>
            </div>
          </section>

          {/* SLIDE 2: Event details (Date, Time, Location) */}
          <section className="slide-section">
            <div className="glass-slide-card">
              <h2
                className="calligraphy-title"
                style={{
                  fontSize: "30px",
                  color: "var(--accent-gold)",
                  marginBottom: "5px",
                }}
              >
                تفاصيل عقد القران
              </h2>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "15px" }}>
                يسعدنا لقاؤكم ومشاركتكم في الموعد والمكان المحدد التالي
              </p>

              <div className="divider-ornament" style={{ margin: "5px 0" }}>
                <span>✿</span>
              </div>

              <div className="unified-details-row">
                {/* Date Row */}
                <div className="details-block">
                  <div
                    className="details-icon-container"
                    style={{ background: "rgba(198, 220, 253, 0.15)" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--palette-blue)"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div className="details-text-container">
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>التاريخ واليوم</span>
                    <span style={{ fontSize: "15px", fontWeight: "700" }}>الثلاثاء، 1 سبتمبر 2026</span>
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>الأول من سبتمبر</span>
                  </div>
                </div>

                {/* Time Row */}
                <div className="details-block">
                  <div
                    className="details-icon-container"
                    style={{ background: "rgba(250, 208, 224, 0.15)" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--palette-pink)"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="details-text-container">
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>توقيت المراسم</span>
                    <span style={{ fontSize: "15px", fontWeight: "700" }}>الساعة 6:00 مساءً</span>
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>مراسم الاستقبال والمباركة</span>
                  </div>
                </div>

                {/* Location Row */}
                <div className="details-block">
                  <div
                    className="details-icon-container"
                    style={{ background: "rgba(211, 226, 198, 0.15)" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--palette-sage)"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="details-text-container" style={{ flexGrow: 1 }}>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>مكان الاحتفال</span>
                    <span style={{ fontSize: "15px", fontWeight: "700" }}>قاعة Cove Hall الفاخرة</span>
                    <a
                      href="https://www.google.com/maps/search/%D8%A7%D9%84%D9%85%D9%86%D8%B5%D9%88%D8%B1%D8%A9%20%D9%85%D8%B1%D9%83%D8%B2%20%D8%B1%D9%88%D9%8A%D8%A7%D9%84%20%D9%84%D9%84%D8%AE%D8%B5%D9%88%D8%A8%D8%A9%20%D9%88%20%D8%A7%D9%84%D8%B9%D9%82%D9%85%D8%8C%20%D8%A8%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2%20%D8%A7%D9%84%D8%B7%D8%A8%D9%89%20%D8%A7%D9%84%D8%B9%D8%A7%D9%84%D9%85%D9%8A%20%D8%A7%D9%84%D8%AF%D9%88%D8%B1%20%D8%A7%D9%84%D8%B3%D8%A7%D8%A8%D8%B9%20%D9%88%20%D8%A7%D9%84%D8%AF%D8%A7%D9%85%D9%86%D8%8C%20%D8%A7%D9%85%D8%AA%D8%AF%D8%A7%D8%AF%20%D8%A7%D9%84%D9%85%D8%B4%D8%A7%D9%8A%D8%A9%20%D8%A7%D9%84%D8%B3%D9%81%D9%84%D9%8A%D8%A9%D8%8C%20Mit%20Badr%20Khamees%2C%20El%20Mansoura%2C%20Dakahlia%20Governorate%207630817%2C%20Egypt/@31.0407,31.3358,17z?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold"
                      style={{
                        padding: "4px 12px",
                        fontSize: "11px",
                        borderRadius: "15px",
                        marginTop: "5px",
                      }}
                    >
                      موقع القاعة على الخريطة 🗺️
                    </a>
                  </div>
                </div>
              </div>

              {/* Interactive Google Maps Shortcut Embed */}
              <div
                style={{
                  width: "100%",
                  height: "160px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1.5px solid var(--border-glass)",
                  marginTop: "15px",
                  position: "relative",
                }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=31.0407,31.3358&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <span
                onClick={() => scrollToSlide(2)}
                style={{
                  fontSize: "12px",
                  color: "var(--accent-gold)",
                  cursor: "pointer",
                  marginTop: "20px",
                  fontWeight: "bold",
                  animation: "bounceText 1.5s infinite alternate",
                }}
              >
                تسجيل حضوركم وتبريكاتكم ⬇
              </span>
            </div>
          </section>

          {/* SLIDE 3: RSVP Form and Congratulatory Guestbook */}
          <section className="slide-section">
            <div className="glass-slide-card">
              <h2
                className="calligraphy-title"
                style={{
                  fontSize: "30px",
                  color: "var(--accent-gold)",
                  marginBottom: "5px",
                }}
              >
                تأكيد حضورك والتهنئة
              </h2>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "20px" }}>
                شاركنا فرحتنا بتأكيد حضورك وكتابة تهنئة للعروسين
              </p>

              <div className="divider-ornament" style={{ margin: "5px 0" }}>
                <span>✿</span>
              </div>

              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "30px" }}>
                {/* RSVP Form Section */}
                <div style={{ width: "100%" }}>
                  <RSVPForm onRsvpSuccess={handleNewRsvp} />
                </div>

                <div className="divider-ornament" style={{ margin: "5px 0" }}>
                  <span>✿</span>
                </div>

                {/* Wishes Guestbook Board Section */}
                <div style={{ width: "100%" }}>
                  <h3
                    className="calligraphy-title"
                    style={{
                      fontSize: "22px",
                      color: "var(--white)",
                      textAlign: "center",
                      marginBottom: "12px",
                    }}
                  >
                    كلمات تفيض بالحب والتهاني
                  </h3>
                  <WishesBoard wishes={wishes} />
                </div>
              </div>

              {/* Footer Sign-off */}
              <div style={{ textAlign: "center", marginTop: "35px", width: "100%" }}>
                <p
                  className="calligraphy-title"
                  style={{ fontSize: "20px", color: "var(--accent-gold-light)", fontStyle: "italic" }}
                >
                  دامت دياركم عامرة بالأفراح والمسرات 🌸
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.3)",
                    marginTop: "10px",
                    letterSpacing: "1px",
                  }}
                >
                  تم بكل حب وحفاوة لـ محمد &amp; يمنى
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
