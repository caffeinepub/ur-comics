interface FeaturedCreatorProps {
  onReadNow: () => void;
}

export default function FeaturedCreator({ onReadNow }: FeaturedCreatorProps) {
  return (
    <section
      aria-label="Featured Creator"
      style={{
        margin: "0 0 0",
        padding: "0 16px",
        paddingTop: "20px",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          background:
            "linear-gradient(160deg, #0d0020 0%, #2a0060 50%, #6A5AE0 100%)",
          border: "1px solid rgba(159, 139, 255, 0.35)",
          boxShadow:
            "0 8px 40px rgba(106, 90, 224, 0.45), 0 0 80px rgba(106, 90, 224, 0.12)",
          padding: "28px 24px 28px",
          minHeight: "230px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Decorative orb */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(159,139,255,0.25) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "20px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(106,90,224,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'Sora', system-ui, sans-serif",
              }}
            >
              ⭐ FEATURED CREATOR
            </span>
          </div>

          {/* Genre badge */}
          <span
            style={{
              display: "inline-block",
              background: "rgba(159, 139, 255, 0.25)",
              border: "1px solid rgba(159, 139, 255, 0.4)",
              color: "#c4b5ff",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              padding: "3px 10px",
              borderRadius: "999px",
              marginBottom: "12px",
              fontFamily: "'Sora', system-ui, sans-serif",
            }}
          >
            Action · Slice of Life
          </span>

          {/* Title */}
          <h2
            style={{
              color: "white",
              fontSize: "clamp(28px, 8vw, 42px)",
              fontWeight: 900,
              fontFamily: "'Sora', system-ui, sans-serif",
              margin: "0 0 10px",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            BLACK CIRCLE
          </h2>

          {/* Description */}
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "13px",
              lineHeight: 1.6,
              margin: "0 0 20px",
              fontFamily: "'Sora', system-ui, sans-serif",
              maxWidth: "420px",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            Two brothers are forced to leave their town after getting involved
            in a dangerous gang situation. As they start a new life, they face
            enemies, survival challenges, and the struggle to escape their past.
          </p>
        </div>

        {/* CTA button */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <button
            type="button"
            data-ocid="featured.read_now_button"
            onClick={onReadNow}
            style={{
              background: "linear-gradient(135deg, #6A5AE0, #9F8BFF)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "14px 32px",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: "'Sora', system-ui, sans-serif",
              cursor: "pointer",
              letterSpacing: "0.04em",
              boxShadow: "0 4px 20px rgba(106, 90, 224, 0.6)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.transform = "translateY(-2px) scale(1.03)";
              btn.style.boxShadow = "0 8px 28px rgba(106, 90, 224, 0.75)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.transform = "none";
              btn.style.boxShadow = "0 4px 20px rgba(106, 90, 224, 0.6)";
            }}
          >
            READ NOW
          </button>
        </div>
      </div>
    </section>
  );
}
