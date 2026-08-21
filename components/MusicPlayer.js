"use client";
import React, { useEffect, useRef } from "react";

export default function MusicPlayer({ isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Audio autoplay blocked or failed:", error);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player-fancy">
      <audio
        ref={audioRef}
        src="/sound.mp3"
        loop
        preload="auto"
      />

      {/* Floating musical note elements when playing */}
      {isPlaying && (
        <>
          <span className="floating-note note-1">♪</span>
          <span className="floating-note note-2">♫</span>
          <span className="floating-note note-3">♬</span>
        </>
      )}

      {/* Rotating Vinyl Record / Mandala Button */}
      <div
        className={`music-ring-outer ${isPlaying ? "playing" : ""}`}
        onClick={togglePlay}
        title={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      >
        <div className="music-mandala">
          <div className="music-center-disc">
            {isPlaying ? "❙❙" : "▶"}
          </div>
        </div>
      </div>
    </div>
  );
}
