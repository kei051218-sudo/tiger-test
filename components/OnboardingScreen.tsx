import Image from "next/image";
import { useEffect, useState } from "react";
import { ONBOARDING } from "@/lib/data";

type Props = { step: number; onNext: () => void };

export default function OnboardingScreen({ step, onNext }: Props) {
  const [visible, setVisible] = useState(false);
  const data = ONBOARDING[step];

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="screen" key={step}>
      <Image
        src={data.image}
        alt=""
        fill
        style={{ objectFit: "cover" }}
        className="bg-full"
        priority
      />
      <div className="overlay" style={{
        background: "linear-gradient(to bottom, rgba(26,20,16,0.2) 0%, rgba(26,20,16,0.5) 35%, rgba(26,20,16,0.88) 65%, rgba(26,20,16,0.98) 100%)"
      }} />

      {/* 상단 스텝 표시 */}
      <div style={{ position: "relative", zIndex: 2, padding: "20px 28px 0", display: "flex", alignItems: "center", gap: 8 }}>
        {ONBOARDING.map((_, i) => (
          <div key={i} style={{
            height: 1,
            flex: 1,
            background: i <= step ? "rgba(201,168,76,0.7)" : "rgba(245,240,232,0.15)",
            transition: "background 0.4s ease"
          }} />
        ))}
      </div>

      <div className="content" style={{ justifyContent: "flex-end", paddingBottom: 52 }}>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease" }}>
          <p className="body-text" style={{ fontSize: "0.93rem", lineHeight: 2.1 }}>
            {data.text}
          </p>
        </div>

        <div style={{ height: 36 }} />

        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>
          <button className="btn-primary" onClick={onNext}>
            {data.cta || "계속"}
            {step < ONBOARDING.length - 1 ? null : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
