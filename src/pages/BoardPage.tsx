import { useState, useEffect, useRef, useCallback } from "react";

const INITIAL_SCALE = 2.5;
const MIN_SCALE = 1.8;
const MAX_SCALE = 3.5;

type Photo = { src: string; alt: string; category: string; description: string; left: number; top: number; width: number; height: number };

const photos: Photo[] = [
  { src: "https://images.unsplash.com/photo-1772306592465-98e9f3b5b1ce?w=480&h=640&fit=crop&auto=format", alt: "Woman in flowing pink gown", category: "Fashion", description: "A flowing pink gown captured in soft natural light — effortless elegance in motion.", left: 23.6, top: 29.3, width: 9.3, height: 19.1 },
  { src: "https://images.unsplash.com/photo-1750814019023-4e43037f5075?w=320&h=320&fit=crop&auto=format", alt: "Cozy aesthetic setup", category: "Aesthetic", description: "A curated desk moment: pink journal, soft textures, and the quiet ritual of writing.", left: 35.2, top: 30.5, width: 5.5, height: 8 },
  { src: "https://images.unsplash.com/photo-1748724366770-46500ded69d2?w=700&h=260&fit=crop&auto=format", alt: "Watercolor rose painting", category: "Art", description: "Watercolor botanicals in muted greens and blush — the beauty of imperfect brushwork.", left: 43.3, top: 29.4, width: 14.1, height: 9.1 },
  { src: "https://images.unsplash.com/photo-1700212964111-9e6ce16aeb1e?w=280&h=340&fit=crop&auto=format", alt: "Blue and white flower painting", category: "Art", description: "Deep blue florals painted with dramatic contrast, full of quiet intensity.", left: 59.6, top: 31.5, width: 6.8, height: 11 },
  { src: "https://images.unsplash.com/photo-1608547000023-74beb9fe563a?w=460&h=580&fit=crop&auto=format", alt: "Pearl and lace fabric", category: "Texture", description: "Pearls, lace, and blush fabric — the sensory details of something precious and worn.", left: 67.3, top: 29.3, width: 9.5, height: 19.1 },
  { src: "https://images.unsplash.com/photo-1592873289208-a5de05694ea1?w=240&h=360&fit=crop&auto=format", alt: "Ceramic vase on white table", category: "Aesthetic", description: "A still-life of ceramic vessels and botanicals, arranged with an eye for calm.", left: 35.2, top: 41.4, width: 5.4, height: 10.2 },
  { src: "https://images.unsplash.com/photo-1689946242927-0537a5aa6d19?w=320&h=480&fit=crop&auto=format", alt: "Pink flower on gradient", category: "Nature", description: "A single pink cosmos on a gradient background — minimalist and breathtaking.", left: 59.5, top: 46.8, width: 5, height: 12.3 },
  { src: "https://images.unsplash.com/photo-1710080703554-86dc9a0e9d6e?w=400&h=200&fit=crop&auto=format", alt: "White and yellow flowers", category: "Nature", description: "White and gold petals caught in soft light — delicate, fleeting, beautiful.", left: 67.3, top: 52.2, width: 8.2, height: 7 },
  { src: "https://images.unsplash.com/photo-1775527667555-1f5550b7143e?w=560&h=480&fit=crop&auto=format", alt: "Woman in floral dress", category: "Fashion", description: "A woman in a white floral dress, glowing softly against a field of blooms.", left: 23.5, top: 55, width: 13.4, height: 18.3 },
  { src: "https://images.unsplash.com/photo-1775681486409-39a3ef7ecc63?w=240&h=400&fit=crop&auto=format", alt: "Woman at outdoor cafe", category: "Life", description: "The electric energy of a night city, all neon and movement, captured mid-story.", left: 38.3, top: 56.6, width: 4.2, height: 15.1 },
  { src: "https://images.unsplash.com/photo-1533754005196-69f1c707ecdc?w=240&h=360&fit=crop&auto=format", alt: "Cake with flowers", category: "Aesthetic", description: "A petal-topped cake — where baking becomes a form of floral arrangement.", left: 44.8, top: 62.9, width: 2.6, height: 8 },
  { src: "https://images.unsplash.com/photo-1777462985111-9da64fb2e6e6?w=400&h=300&fit=crop&auto=format", alt: "Light pink blouse fabric", category: "Texture", description: "Linen draped softly, catching light in gentle folds — quiet material beauty.", left: 50.7, top: 61, width: 8.1, height: 12.2 },
  { src: "https://images.unsplash.com/photo-1629788959554-ef4502a45e7d?w=680&h=340&fit=crop&auto=format", alt: "Pink abstract painting", category: "Art", description: "Bold pink brushstrokes layered with intention — abstract expressionism at its most alive.", left: 61.6, top: 63.1, width: 15.2, height: 12.1 },
];

export default function BoardPage() {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(INITIAL_SCALE);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const dragMoved = useRef(false);

  const clamp = useCallback((x: number, y: number, s: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Pan bounds so viewport can reach content edges but no further
    // (canvas_x at viewport edge 0 or 1 → panX = vw*(0.5 - s*(cx - 0.5)))
    const CXMIN = 0.16; const CXMAX = 0.84;
    const CYMIN = 0.20; const CYMAX = 0.82;
    const xA = vw * (s * (0.5 - CXMIN) - 0.5);
    const xB = vw * (0.5 - s * (CXMAX - 0.5));
    const yA = vh * (s * (0.5 - CYMIN) - 0.5);
    const yB = vh * (0.5 - s * (CYMAX - 0.5));
    return {
      x: Math.max(Math.min(xA, xB), Math.min(Math.max(xA, xB), x)),
      y: Math.max(Math.min(yA, yB), Math.min(Math.max(yA, yB), y)),
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const delta = -e.deltaY * 0.008;
        setScale((s) => {
          const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, s + delta * s));
          setPan((p) => clamp(p.x, p.y, next));
          return next;
        });
      } else {
        setPan((p) => clamp(p.x - e.deltaX * 1.2, p.y - e.deltaY * 1.2, scale));
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [scale, clamp]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  };

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragMoved.current = true;
    setPan(clamp(dragStart.current.panX + dx, dragStart.current.panY + dy, scale));
  }, [isDragging, scale, clamp]);

  const onMouseUp = () => { setIsDragging(false); dragStart.current = null; };

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "fixed", inset: 0, background: "#fdf6f1", cursor: isDragging ? "grabbing" : "grab", userSelect: "none" }}
    >
      <div style={{ position: "absolute", width: "100%", height: "100%", transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`, transformOrigin: "center center", willChange: "transform" }}>

        {/* Radial halo */}
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "38vw", height: "38vw", background: "radial-gradient(ellipse at center, rgba(245,215,215,0.38) 0%, rgba(253,246,241,0) 70%)", pointerEvents: "none", zIndex: 1 }} />

        {/* Photos — locked positions */}
        {photos.map((photo, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${photo.left}%`,
              top: `${photo.top}%`,
              width: `${photo.width}%`,
              height: `${photo.height}%`,
              overflow: "hidden",
              border: "1px solid rgba(190,155,155,0.22)",
              borderRadius: "3px",
              backgroundColor: "#ede4de",
              zIndex: 2,
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
              cursor: isDragging ? "grabbing" : "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 44px rgba(180,130,130,0.2)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
              (e.currentTarget as HTMLElement).style.zIndex = "6";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.zIndex = "2";
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img src={photo.src} alt={photo.alt} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
          </div>
        ))}

        {/* Center blob */}
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 10, animation: "float 7s ease-in-out infinite" }}>
          <div style={{ background: "rgba(255, 252, 250, 0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(210,175,175,0.4)", borderRadius: "62% 38% 46% 54% / 58% 44% 56% 42%", animation: "blobMorph 9s ease-in-out infinite", boxShadow: "0 8px 48px rgba(190,140,140,0.15), inset 0 1px 0 rgba(255,255,255,0.8)", padding: "3rem 3.6rem", minWidth: "140px", maxWidth: "19vw", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 500, fontSize: "30px", color: "#3a1f1f", margin: "0 0 0.5rem", lineHeight: 1.2 }}>I'm Angela!</h1>
            <svg width="48" height="8" viewBox="0 0 48 8" style={{ marginBottom: "0.8rem", opacity: 0.5 }}>
              <path d="M2 6 Q12 2 24 5 Q36 8 46 4" stroke="#c4908a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(0.55rem, 0.58vw, 0.68rem)", fontWeight: 600, color: "#7a4f4f", letterSpacing: "0.03em", lineHeight: 1.55, margin: "0 0 0.35rem" }}>Building passion for creativity & strategy</p>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "clamp(0.5rem, 0.52vw, 0.62rem)", fontWeight: 400, color: "#a07878", letterSpacing: "0.02em", lineHeight: 1.5, margin: 0 }}>Studying UX Design & AI @ University of Michigan</p>
          </div>
        </div>

        {/* Accent dots */}
        {[
          { top: "40%", left: "33%", size: 4, opacity: 0.22, delay: "0s" },
          { top: "62%", left: "42%", size: 3, opacity: 0.18, delay: "1.5s" },
          { top: "38%", left: "65%", size: 5, opacity: 0.16, delay: "3s" },
          { top: "60%", left: "58%", size: 3, opacity: 0.2, delay: "2s" },
        ].map((dot, i) => (
          <div key={i} style={{ position: "absolute", top: dot.top, left: dot.left, width: dot.size, height: dot.size, borderRadius: "50%", background: "#c4908a", opacity: dot.opacity, zIndex: 3, animation: `float ${5 + i}s ease-in-out infinite`, animationDelay: dot.delay, pointerEvents: "none" }} />
        ))}
      </div>

      {/* Zoom controls */}
      <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 100, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {[
          { label: "+", onClick: () => setScale((s) => { const n = Math.min(MAX_SCALE, s + 0.25); setPan((p) => clamp(p.x, p.y, n)); return n; }) },
          { label: "−", onClick: () => setScale((s) => { const n = Math.max(MIN_SCALE, s - 0.25); setPan((p) => clamp(p.x, p.y, n)); return n; }) },
          { label: "⌂", onClick: () => { setScale(INITIAL_SCALE); setPan({ x: 0, y: 0 }); } },
        ].map(({ label, onClick }) => (
          <button key={label} onClick={onClick}
            style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid rgba(190,155,155,0.35)", background: "rgba(255,251,249,0.85)", backdropFilter: "blur(8px)", color: "#9a6060", fontSize: label === "⌂" ? "13px" : "16px", fontWeight: 400, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", boxShadow: "0 2px 12px rgba(180,130,130,0.1)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(245,230,230,0.9)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,251,249,0.85)"; }}
          >{label}</button>
        ))}
      </div>

      {/* Bottom hint */}
      <div style={{ position: "fixed", bottom: "1.6rem", left: "50%", transform: "translateX(-50%)", zIndex: 100, pointerEvents: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "17px", fontWeight: 400, color: "#b09a8a", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>scroll to explore</span>
        <span style={{ color: "#c4a898", fontSize: "10px", lineHeight: 1 }}>✦</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "17px", fontWeight: 400, color: "#b09a8a", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>click a photo to open</span>
      </div>

      {/* Photo popup modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", background: "rgba(253,246,241,0.45)" }}
        >
          {/* Folder card wrapper — click inside doesn't close */}
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "min(820px, 88vw)" }}>
            {/* Folder tab */}
            <div style={{ position: "absolute", top: "-38px", left: 0, height: "38px", padding: "0 1.4rem", display: "inline-flex", alignItems: "center", background: "#e8e0b8", borderRadius: "14px 14px 0 0", boxShadow: "0 -2px 10px rgba(160,140,60,0.08)" }}>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.14em", color: "#5a4e1a", textTransform: "uppercase" }}>{selectedPhoto.category}</span>
            </div>

            {/* Folder body */}
            <div style={{ background: "#F8F2D8", borderRadius: "0 20px 20px 20px", boxShadow: "0 24px 80px rgba(140,120,40,0.18), 0 4px 16px rgba(140,120,40,0.1)", display: "flex", overflow: "hidden", minHeight: "340px" }}>
              {/* Left — photo */}
              <div style={{ flexShrink: 0, width: "min(280px, 36vw)", background: "#e0d8a8", overflow: "hidden" }}>
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Right — description */}
              <div style={{ flex: 1, padding: "2.4rem 2.2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.14em", color: "#7a6e2a", textTransform: "uppercase", margin: "0 0 0.8rem" }}>{selectedPhoto.category}</p>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(1.2rem, 2vw, 1.7rem)", color: "#3a3010", margin: "0 0 1.2rem", lineHeight: 1.3 }}>{selectedPhoto.alt}</h2>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 400, fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", color: "#5a5020", lineHeight: 1.75, margin: 0 }}>{selectedPhoto.description}</p>
                </div>
                <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "28px", height: "1px", background: "rgba(90,80,20,0.25)" }} />
                  <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "12px", color: "rgba(90,80,20,0.45)", letterSpacing: "0.04em" }}>Angela Won</span>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              style={{ position: "absolute", top: "-46px", right: 0, width: "34px", height: "34px", borderRadius: "50%", border: "1px solid rgba(100,90,30,0.25)", background: "rgba(248,242,216,0.95)", color: "#5a4e1a", fontSize: "18px", fontWeight: 300, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}
            >×</button>
          </div>
        </div>
      )}
    </div>
  );
}
