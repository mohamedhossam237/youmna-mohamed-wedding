"use client";
import React, { useState } from "react";

export default function RSVPForm({ onRsvpSuccess }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("الرجاء كتابة الاسم الكريم لتسجيل دعوتكم.");
      return;
    }
    setErrorMsg("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          attending,
          guestsCount: attending ? 1 : 0,
          message: message.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        if (onRsvpSuccess) {
          onRsvpSuccess(result.data); // Notify parent to update wishes board immediately!
        }
      } else {
        setErrorMsg(result.error || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("عذراً، تعذر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.");
    } finally {
      setSubmitting(false);
    }
  };



  if (submitted) {
    return (
      <div className="success-message">
        <span className="success-icon">✨</span>
        <h3 className="calligraphy-title" style={{ fontSize: "22px" }}>
          تم تسجيل تأكيد حضوركم بنجاح!
        </h3>
        <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
          {attending
            ? "نسعد جداً بتواجدكم معنا ومشاركتنا فرحة العمر."
            : "سنفتقد وجودكم، نشكركم جزيل الشكر على مشاعركم الطيبة."}
        </p>
      </div>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="guest-name">
          الاسم الكريم
        </label>
        <input
          id="guest-name"
          type="text"
          className="form-input"
          placeholder="اكتب اسمك هنا..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">هل ستشرفنا بالحضور؟</label>
        <div className="attendance-toggle">
          <div
            className={`attendance-option ${attending ? "active" : ""}`}
            onClick={() => !submitting && setAttending(true)}
          >
            نعم، بكل سرور 🌸
          </div>
          <div
            className={`attendance-option ${!attending ? "active" : ""}`}
            onClick={() => !submitting && setAttending(false)}
          >
            أعتذر بأسف ✨
          </div>
        </div>
      </div>



      <div className="form-group">
        <label className="form-label" htmlFor="guest-message">
          كلمة طيبة أو تهنئة للعروسين
        </label>
        <textarea
          id="guest-message"
          className="form-textarea"
          placeholder="اترك تهنئتك الجميلة هنا ليسعد بها العروسان..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={submitting}
        />
      </div>

      {errorMsg && (
        <p style={{ color: "#c92a2a", fontSize: "13px", fontWeight: "600" }}>
          ⚠️ {errorMsg}
        </p>
      )}

      <button
        type="submit"
        className="btn-brand"
        style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}
        disabled={submitting}
      >
        {submitting ? "جاري الإرسال..." : "تأكيد الحضور والتهنئة ✨"}
      </button>
    </form>
  );
}
