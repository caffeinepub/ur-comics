export default function SkeletonCard() {
  return (
    <div
      style={{
        borderRadius: 24,
        overflow: "hidden",
        background: "white",
        border: "0.5px solid rgba(106, 90, 224, 0.1)",
        boxShadow: "0 2px 8px rgba(106, 90, 224, 0.08)",
      }}
    >
      <div className="shimmer" style={{ height: 220 }} />
      <div style={{ padding: "12px 14px 14px" }}>
        <div
          className="shimmer"
          style={{ height: 14, borderRadius: 8, marginBottom: 8, width: "80%" }}
        />
        <div
          className="shimmer"
          style={{
            height: 11,
            borderRadius: 8,
            marginBottom: 12,
            width: "55%",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="shimmer"
            style={{ height: 10, borderRadius: 8, width: 60 }}
          />
          <div
            className="shimmer"
            style={{ height: 10, borderRadius: 8, width: 40 }}
          />
        </div>
      </div>
    </div>
  );
}
