import { useEffect, useRef, useState } from "react";
import { TIGER_TYPES, OFFERINGS } from "@/lib/data";

type Props = { tigerType: number; offering: number; onRestart: () => void };

export default function ResultScreen({ tigerType, offering, onRestart }: Props) {
  const [animIn, setAnimIn] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const tiger = TIGER_TYPES[tigerType];
  const offer = OFFERINGS[offering];

  useEffect(() => {
    const t = setTimeout(() => setAnimIn(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleShare = async () => {
    setSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: "내 안의 호랑이",
          text: `나의 호랑이: ${tiger.name}\n나의 위로: ${offer.name}\n\n카마 〈세심굿 - 응공이야기〉`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          `나의 호랑이: ${tiger.name}\n나의 위로: ${offer.name}\n\n카마 〈세심굿 - 응공이야기〉\n${window.location.href}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      // ignore
    }
    setSharing(false);
  };

  const handleSaveImage = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      if (!cardRef.current) return;

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#1a1410",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageTimeout: 15000,
        onclone: (doc) => {
          doc.querySelectorAll("img").forEach((img) => {
            img.crossOrigin = "anonymous";
          });
        },
      });

      const dataUrl = canvas.toDataURL("image/png");
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        // 모바일: 새 탭에서 이미지 열기 → 길게 눌러서 저장
        const newTab = window.open();
        if (newTab) {
          newTab.document.write(
            `<html><body style="margin:0;background:#1a1410;display:flex;flex-direction:column;align-items:center;padding:20px;">` +
            `<p style="color:#c9a84c;font-family:sans-serif;font-size:14px;margin-bottom:16px;">이미지를 길게 눌러 저장하세요</p>` +
            `<img src="${dataUrl}" style="max-width:100%;border-radius:4px;" />` +
            `</body></html>`
          );
        }
      } else {
        // PC: 다운로드
        const link = document.createElement("a");
        link.download = `내안의호랑이_${tiger.name}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (e) {
      console.error("이미지 저장 실패:", e);
      alert("이미지 저장에 실패했어요. 스크린샷을 이용해 주세요.");
    }
    setSaving(false);
  };

  return (
    <div className="screen" style={{ background: "var(--ink)", overflowY: "auto" }}>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% -10%, rgba(139,69,19,0.12) 0%, transparent 55%)"
      }} />

      <div style={{ position: "relative", zIndex: 1, padding: "24px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="mini-logo">내 안의 호랑이</span>
        <span className="label-text">결과</span>
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "0 0 60px" }}>
        {/* 캡처 영역 */}
        <div ref={cardRef} id="share-card" style={{ padding: "0 28px", background: "#1a1410" }}>

          {/* 호랑이 유형 카드 */}
          <div style={{
            marginTop: 28,
            opacity: animIn ? 1 : 0,
            transform: animIn ? "translateY(0)" : "translateY(18px)",
            transition: "all 0.6s ease"
          }}>
            <div className="label-text" style={{ marginBottom: 12 }}>당신 안의 호랑이</div>
            <div className="result-card">
              <div style={{ position: "relative", width: "100%", aspectRatio: "1", marginBottom: 20, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tiger.image}
                  alt={tiger.name}
                  crossOrigin="anonymous"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, transparent 45%, rgba(44,37,32,0.97) 100%)"
                }} />
                <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                  <h2 style={{
                    fontFamily: "'Noto Serif KR', serif",
                    fontSize: "1.15rem",
                    fontWeight: 500,
                    color: "var(--paper)",
                    marginBottom: 8
                  }}>
                    {tiger.name}
                  </h2>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {tiger.keywords.map((kw) => (
                      <span key={kw} className="keyword-tag">{kw}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="body-text" style={{ fontSize: "0.85rem", lineHeight: 1.95 }}>
                {tiger.description}
              </p>
            </div>
          </div>

          {/* 구분선 */}
          <div style={{ margin: "24px 0", opacity: animIn ? 1 : 0, transition: "opacity 0.5s ease 0.35s" }}>
            <div className="divider" />
          </div>

          {/* 오브제 결과 카드 */}
          <div style={{
            opacity: animIn ? 1 : 0,
            transform: animIn ? "translateY(0)" : "translateY(18px)",
            transition: "all 0.6s ease 0.4s"
          }}>
            <div className="label-text" style={{ marginBottom: 12 }}>당신이 놓아둔 위로</div>
            <div className="result-card">
              <div style={{ position: "relative", width: "calc(100% + 48px)", marginLeft: -24, marginTop: -28, marginBottom: 0, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={offer.image}
                  alt={offer.name}
                  crossOrigin="anonymous"
                  style={{ width: "100%", aspectRatio: "1.5", objectFit: "cover", display: "block" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, transparent 50%, rgba(44,37,32,0.98) 100%)"
                }} />
              </div>
              <div style={{ padding: "20px 0 16px" }}>
                <h3 style={{
                  fontFamily: "'Noto Serif KR', serif",
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  color: "var(--paper)",
                  marginBottom: 10
                }}>
                  {offer.name}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {offer.keywords.map((kw) => (
                    <span key={kw} className="keyword-tag">{kw}</span>
                  ))}
                </div>
              </div>
              <p style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "0.88rem",
                fontWeight: 400,
                lineHeight: 1.8,
                color: "var(--gold)",
                whiteSpace: "pre-line",
                marginBottom: 16,
                paddingBottom: 16,
                borderBottom: "1px solid rgba(245,240,232,0.08)"
              }}>
                {offer.summary}
              </p>
              <p className="body-text" style={{ fontSize: "0.85rem", lineHeight: 1.95 }}>
                {offer.description}
              </p>
            </div>
          </div>

          {/* 공연 정보 */}
          <div style={{
            marginTop: 24,
            padding: "16px 20px",
            background: "rgba(201,168,76,0.06)",
            border: "1px solid rgba(201,168,76,0.15)",
            opacity: animIn ? 1 : 0,
            transition: "opacity 0.5s ease 0.6s"
          }}>
            <p style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "0.8rem",
              lineHeight: 1.9,
              color: "rgba(245,240,232,0.65)",
              textAlign: "center"
            }}>
              당신이 만난 두려움과 당신이 고른 위로가{"\n"}
              어떤 이야기로 이어지는지 만나보세요.
            </p>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div style={{
          padding: "24px 28px 0",
          opacity: animIn ? 1 : 0,
          transition: "opacity 0.5s ease 0.75s"
        }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <button className="btn-share" onClick={handleShare} disabled={sharing}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M10 2L13 5L10 8M13 5H5M5 2v11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {copied ? "복사됨!" : "공유하기"}
            </button>
            <button className="btn-share" onClick={handleSaveImage} disabled={saving}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 2v8M4 7l3.5 3.5L11 7M2 13h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {saving ? "저장 중..." : "이미지 저장"}
            </button>
          </div>

          <a
            href="https://www.playticket.co.kr/nav/detail.html?idx=4203"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "block", marginBottom: 16 }}
          >
            <div className="btn-cta">
              카마의 〈세심굿 - 응공이야기〉 공연 보러 가기 →
            </div>
          </a>

          <button
            onClick={onRestart}
            style={{
              width: "100%",
              padding: "12px",
              background: "transparent",
              border: "none",
              color: "rgba(245,240,232,0.3)",
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: "0.75rem",
              cursor: "pointer",
              letterSpacing: "0.08em",
              transition: "color 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.3)")}
          >
            다시 하기
          </button>
        </div>
      </div>
    </div>
  );
}
