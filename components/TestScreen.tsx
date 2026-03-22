import { useEffect, useState } from "react";
import { QUESTIONS } from "@/lib/data";

type Props = { currentQ: number; onAnswer: (type: number) => void };

export default function TestScreen({ currentQ, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [animIn, setAnimIn] = useState(false);
  const q = QUESTIONS[currentQ];
  const progress = ((currentQ) / QUESTIONS.length) * 100;

  useEffect(() => {
    setSelected(null);
    setAnimIn(false);
    const t = setTimeout(() => setAnimIn(true), 60);
    return () => clearTimeout(t);
  }, [currentQ]);

  const handleSelect = (type: number) => {
    setSelected(type);
    setTimeout(() => onAnswer(type), 380);
  };

  return (
    <div className="screen" style={{ background: "var(--ink)" }}>
      {/* 배경 텍스처 */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse at 50% 0%, rgba(139,69,19,0.08) 0%, transparent 60%)",
        pointerEvents: "none"
      }} />

      {/* 진행 바 */}
      <div style={{ position: "relative", zIndex: 2, padding: "20px 28px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span className="label-text">질문 {currentQ + 1} / {QUESTIONS.length}</span>
          <span className="mini-logo">내 안의 호랑이</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="content" style={{ paddingTop: 0, justifyContent: "center" }}>
        {/* 질문 */}
        <div style={{
          opacity: animIn ? 1 : 0,
          transform: animIn ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.5s ease",
          marginBottom: 32, marginTop: 32
        }}>
          {/* 장식 */}
          <div style={{
            width: 1, height: 32, background: "linear-gradient(to bottom, transparent, var(--gold-dim))",
            marginBottom: 20
          }} />
          <h2 style={{
            fontFamily: "'Noto Serif KR', serif",
            fontSize: "clamp(1rem, 4.5vw, 1.2rem)",
            fontWeight: 400,
            lineHeight: 1.9,
            color: "var(--paper)",
            whiteSpace: "pre-line"
          }}>
            {q.text}
          </h2>
        </div>

        {/* 선택지 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`option-card${selected === opt.type ? " selected" : ""}`}
              onClick={() => handleSelect(opt.type)}
              style={{
                opacity: animIn ? 1 : 0,
                transform: animIn ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.4s ease ${0.1 + i * 0.08}s`,
                textAlign: "left"
              }}
            >
              <span style={{
                display: "inline-block",
                width: 20, height: 20,
                border: "1px solid rgba(245,240,232,0.2)",
                borderRadius: "50%",
                marginRight: 12,
                verticalAlign: "middle",
                flexShrink: 0,
                background: selected === opt.type ? "var(--gold)" : "transparent",
                transition: "background 0.2s ease",
                position: "relative",
                top: -1
              }} />
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
