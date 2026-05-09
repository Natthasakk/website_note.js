"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LINE_URL } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", model: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <section style={{ backgroundColor: "#F5F5F7", paddingTop: 64, paddingBottom: 64, borderBottom: "1px solid #E8E8ED" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#D70015", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'SF Pro Text', sans-serif" }}>
            {c.overline}
          </p>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', -apple-system, sans-serif", lineHeight: 1.2, marginBottom: 16 }}>
            {c.heading}
          </h1>
          <p style={{ fontSize: 17, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
            {c.sub}
          </p>
        </div>
      </section>

      {/* LINE banner */}
      <div style={{ backgroundColor: "#06C755" }}>
        <div className="section-container" style={{ padding: "20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 48, height: 48, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.771.038 1.087l-.164 1.026c-.045.303-.24 1.192 1.049.649 1.291-.542 6.916-4.072 9.437-6.977C23.176 14.393 24 12.458 24 10.304"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", fontFamily: "'SF Pro TH', sans-serif" }}>
                  {c.lineHeading}
                </div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontFamily: "'SF Pro Text', sans-serif" }}>
                  {c.lineSub}
                </div>
              </div>
            </div>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#FFFFFF",
                color: "#06C755",
                fontSize: 15,
                fontWeight: 700,
                fontFamily: "'SF Pro Text', sans-serif",
                padding: "10px 24px",
                borderRadius: 8,
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              {c.lineBtn}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, maxWidth: 1100, margin: "0 auto" }}>
            {/* Form */}
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 8 }}>
                {c.formHeading}
              </h2>
              <p style={{ fontSize: 15, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", marginBottom: 32, lineHeight: 1.6 }}>
                {c.formSub}
              </p>

              {submitted ? (
                <div style={{ backgroundColor: "#F5F5F7", border: "1px solid #E8E8ED", borderRadius: 20, padding: 40, textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, backgroundColor: "#D70015", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 8 }}>
                    {c.successTitle}
                  </h3>
                  <p style={{ fontSize: 15, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", lineHeight: 1.6 }}>
                    {c.successSub.replace("{name}", form.name)}
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", company: "", model: "", message: "" }); }}
                    className="btn-ghost"
                    style={{ marginTop: 20 }}
                  >
                    {c.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#1D1D1F", marginBottom: 6, fontFamily: "'SF Pro Text', sans-serif" }}>
                        {c.labelName} *
                      </label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder={c.phName} className="input-field" />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#1D1D1F", marginBottom: 6, fontFamily: "'SF Pro Text', sans-serif" }}>
                        {c.labelEmail} *
                      </label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={c.phEmail} className="input-field" />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#1D1D1F", marginBottom: 6, fontFamily: "'SF Pro Text', sans-serif" }}>
                        {c.labelPhone}
                      </label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={c.phPhone} className="input-field" />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#1D1D1F", marginBottom: 6, fontFamily: "'SF Pro Text', sans-serif" }}>
                        {c.labelCompany}
                      </label>
                      <input type="text" name="company" value={form.company} onChange={handleChange} placeholder={c.phCompany} className="input-field" />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#1D1D1F", marginBottom: 6, fontFamily: "'SF Pro Text', sans-serif" }}>
                      {c.labelProduct}
                    </label>
                    <div style={{ position: "relative" }}>
                      <select name="model" value={form.model} onChange={handleChange} className="select-field">
                        {c.productOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <svg style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6l4 4 4-4" stroke="#86868B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#1D1D1F", marginBottom: 6, fontFamily: "'SF Pro Text', sans-serif" }}>
                      {c.labelMessage} *
                    </label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder={c.phMessage} className="textarea-field" />
                  </div>

                  <button type="submit" className="btn-primary" style={{ fontSize: 17, height: 50, marginTop: 4 }}>
                    {c.submit}
                  </button>
                  <p style={{ fontSize: 12, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", textAlign: "center" }}>
                    {c.privacy}
                  </p>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 8 }}>
                  {c.otherWays}
                </h2>
                <p style={{ fontSize: 15, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", lineHeight: 1.6, marginBottom: 24 }}>
                  {c.otherSub}
                </p>
              </div>

              {[
                {
                  icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 4h4l2 5-2.5 2.5a12 12 0 005 5L16 14l5 2v4a2 2 0 01-2 2C9.954 22 2 14.046 2 6a2 2 0 012-2z" stroke="#D70015" strokeWidth="1.5" strokeLinejoin="round" /></svg>),
                  label: c.labelPhone2,
                  value: "+66 2 123 4567",
                  sub: c.phoneSub,
                },
                {
                  icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="3" stroke="#D70015" strokeWidth="1.5" /><path d="M2 8l10 7 10-7" stroke="#D70015" strokeWidth="1.5" /></svg>),
                  label: c.labelEmail2,
                  value: "sales@techthread.co.th",
                  sub: c.emailSub,
                },
                {
                  icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" stroke="#D70015" strokeWidth="1.5" strokeLinejoin="round" /></svg>),
                  label: c.labelShowroom,
                  value: "123 Industrial Estate Road",
                  sub: c.showroomSub,
                },
              ].map((contact) => (
                <div key={contact.label} className="card-light" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, backgroundColor: "#F5F5F7", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {contact.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {contact.label}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#1D1D1F", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 2 }}>
                      {contact.value}
                    </div>
                    <div style={{ fontSize: 13, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
                      {contact.sub}
                    </div>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div style={{ backgroundColor: "#F5F5F7", border: "1px solid #E8E8ED", borderRadius: 20, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginBottom: 8 }}>
                    <path d="M16 3C11.58 3 8 6.58 8 11c0 7 8 18 8 18s8-11 8-18c0-4.42-3.58-8-8-8zm0 10.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#D70015" opacity="0.3" />
                  </svg>
                  <p style={{ fontSize: 13, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif" }}>
                    123 Industrial Estate Road<br />Lat Krabang, Bangkok
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div id="training" style={{ backgroundColor: "#1D1D1F", borderRadius: 20, padding: "24px 28px" }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF", fontFamily: "'SF Pro TH', sans-serif", marginBottom: 16 }}>
                  {c.hoursTitle}
                </h3>
                {c.hours.map((row) => (
                  <div key={row.day} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #272729", fontSize: 14, fontFamily: "'SF Pro Text', sans-serif" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>{row.day}</span>
                    <span style={{ color: row.time === c.closed ? "#86868B" : "#FFFFFF", fontWeight: 500 }}>{row.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
