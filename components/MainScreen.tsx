import Image from "next/image";
import { META } from "@/lib/data";

type Props = { onStart: () => void };

export default function MainScreen({ onStart }: Props) {
  return (
    <div className="screen">
      <Image
        src="/bg_house.png"
        alt="닫힌 방문"
        fill
        className="bg-full"
        priority
        style={{ objectFit: "cover" }}
      />
      <div className="overlay" />
      <div className="content" style={{ justifyContent: "flex-end", paddingBottom: 56 }}>
        <div className="animate-fadeUp anim-delay-1">
          <div className="label-text" style={{ marginBottom: 16 }}>카마 공연 〈세심굿 - 응공이야기〉</div>
          <h1 className="display-title">{META.title}</h1>
          <p className="display-subtitle">{META.subtitle}</p>
        </div>

        <div style={{ height: 48 }} />

        <div className="animate-fadeUp anim-delay-3">
          <div className="divider" style={{ marginBottom: 40, marginLeft: 0 }} />
          <button className="btn-primary" onClick={onStart}>
            테스트 시작하기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div style={{ height: 20 }} />
        <div className="animate-fadeUp anim-delay-4">
          <p style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.3)", textAlign: "center", fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: "0.08em" }}>
            2026.04.18 · 공연 예정
          </p>
        </div>
      </div>
    </div>
  );
}
