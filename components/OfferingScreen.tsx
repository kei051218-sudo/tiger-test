import Image from "next/image";
import { useState, useEffect } from "react";
import { OFFERINGS, TIGER_TYPES } from "@/lib/data";

type Props = { tigerType: number; onSelect: (id: number) => void };

export default function OfferingScreen({ tigerType, onSelect }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [animIn, setAnimIn] = useState(false);
  const tiger = TIGER_TYPES[tigerType];

  useEffect(() => {
    const t = setTimeout(() => setAnimIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (id: number) => {
    setSelected(id);
    setTimeout(() => onSelect(id), 420);
  };

  return (
    <div className="screen">
      <Image
        src="/bg_house.png"
        alt="응공이의 방문"
        fill
        style={{ objectFit: "cover" }}
        className="bg-full"
        priority
      />
      <div className="overlay" style={{
        background: "linear-gradient(to bottom, rgba(26,20,16,0.55) 0%, rgba(26,20,16,0.75) 40%, rgba(26,20,16,0.97) 70%, rgba(26,20,16,1) 100%)"
      }} />

      {/* 상단 유형 힌트 */}
      <div style={{ position: "relative", zIndex: 2, padding: "20px 28px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 24, height: 1, background: "var(--gold-dim)" }} />
          <span className="label-text">{tiger.name}</span>
        </div>
      </div>

      <div className="content" style={{ paddingTop: 0, justifyContent: "center" }}>
        {/* 안내 텍스트 */}
        <div style={{
          marginTop: 0, marginBottom: 24,
          opacity: animIn ? 1 : 0,
          transform: animIn ? "translateY(0)" : "translateY(14px)",
          transition: "all 0.6s ease"
        }}>
          <p className="body-text" style={{ fontSize: "0.95rem", lineHeight: 2 }}>
            잠시, 문 앞에 서서 바라보아요.{"\n"}
            닫혀 있는 응공이의 방문 앞에{"\n"}
            당신은 무엇을 놓아두고 싶나요?
          </p>
        </div>

        {/* 오브제 그리드 */}
        <div className="offering-grid" style={{
          opacity: animIn ? 1 : 0,
          transition: "opacity 0.6s ease 0.25s"
        }}>
          {Object.values(OFFERINGS).map((item, i) => (
            <button
              key={item.id}
              className={`offering-item${selected === item.id ? " selected" : ""}`}
              onClick={() => handleSelect(item.id)}
              style={{
                opacity: animIn ? 1 : 0,
                transform: animIn ? "scale(1)" : "scale(0.95)",
                transition: `all 0.4s ease ${0.3 + i * 0.06}s`,
                padding: 0,
                background: "none",
                border: selected === item.id
                  ? "1px solid var(--gold)"
                  : "1px solid rgba(245,240,232,0.1)"
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="item-label" style={{ whiteSpace: "pre-line" }}>
                {item.id === 5 ? "맑은 물\n한 사발" : item.name}
              </div>
              {selected === item.id && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(201,168,76,0.15)",
                  pointerEvents: "none"
                }} />
              )}
            </button>
          ))}
        </div>

        <div style={{ height: 16 }} />
        <p style={{
          textAlign: "center",
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: "0.72rem",
          color: "rgba(245,240,232,0.3)",
          letterSpacing: "0.08em",
          opacity: animIn ? 1 : 0,
          transition: "opacity 0.6s ease 0.7s"
        }}>
          하나를 선택해주세요
        </p>
      </div>
    </div>
  );
}
