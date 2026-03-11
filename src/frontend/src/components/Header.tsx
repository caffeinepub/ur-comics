import { useRef } from "react";

interface HeaderProps {
  onMenuOpen: () => void;
  onLogoClick: () => void;
  searchOpen: boolean;
  onSearchToggle: () => void;
  onSearchChange: (q: string) => void;
}

export default function Header({
  onMenuOpen,
  onLogoClick,
  searchOpen,
  onSearchToggle,
  onSearchChange,
}: HeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    onSearchToggle();
    if (!searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
    } else {
      onSearchChange("");
    }
  };

  return (
    <header className="glass fixed top-0 left-0 right-0" style={{ zIndex: 50 }}>
      {/* Main bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "56px 1fr 56px",
          alignItems: "center",
          height: "56px",
          paddingLeft: "4px",
          paddingRight: "4px",
        }}
      >
        {/* Left: Hamburger */}
        <button
          type="button"
          data-ocid="header.menu_button"
          onClick={onMenuOpen}
          aria-label="Open menu"
          style={{
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5px",
            background: "linear-gradient(135deg, #7B5CFF, #1a0035)",
            border: "1px solid rgba(168, 85, 247, 0.45)",
            boxShadow: "0 0 10px rgba(123, 92, 255, 0.5)",
            cursor: "pointer",
            padding: "10px",
            borderRadius: "10px",
            transition: "filter 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.filter = "brightness(1.25)";
            el.style.boxShadow = "0 0 16px rgba(168, 85, 247, 0.7)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.filter = "none";
            el.style.boxShadow = "0 0 10px rgba(123, 92, 255, 0.5)";
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "2.5px",
                background: "linear-gradient(90deg, #A855F7, #7B5CFF)",
                borderRadius: "2px",
                boxShadow: "0 0 4px rgba(168, 85, 247, 0.7)",
              }}
            />
          ))}
        </button>

        {/* Center: Logo badge/emblem */}
        <button
          type="button"
          data-ocid="header.logo_button"
          onClick={onLogoClick}
          aria-label="Go to home"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(159,139,255,0.3)",
              boxShadow: "0 0 10px rgba(106,90,224,0.4)",
              borderRadius: "10px",
              padding: "4px",
            }}
          >
            <img
              src="/assets/uploads/IMG_20260310_141210_0148-1.jpg"
              alt="UR Comics"
              style={{
                height: "40px",
                width: "40px",
                objectFit: "cover",
                borderRadius: "8px",
                display: "block",
              }}
            />
          </span>
        </button>

        {/* Right: Search toggle */}
        <button
          type="button"
          data-ocid="header.search_button"
          aria-label="Toggle search"
          onClick={handleToggle}
          style={{
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: searchOpen
              ? "rgba(159, 139, 255, 0.25)"
              : "linear-gradient(135deg, #6A5AE0, #1a0035)",
            border: "1px solid rgba(159,139,255,0.4)",
            boxShadow: "0 0 8px rgba(106,90,224,0.5)",
            cursor: "pointer",
            borderRadius: "10px",
            marginLeft: "auto",
            transition: "filter 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.filter =
              "brightness(1.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.filter = "none";
          }}
        >
          {searchOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <title>Close search</title>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Search</title>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          )}
        </button>
      </div>

      {/* Expandable search row */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: searchOpen ? "60px" : "0",
          transition: "max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          style={{
            padding: "8px 12px 10px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background:
              "linear-gradient(135deg, rgba(106,90,224,0.15), rgba(0,0,0,0.4))",
            borderLeft: "1px solid rgba(159,139,255,0.2)",
            borderRight: "1px solid rgba(159,139,255,0.2)",
            borderBottom: "1px solid rgba(159,139,255,0.2)",
            borderRadius: "0 0 12px 12px",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <title>Search icon</title>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            data-ocid="header.search_input"
            type="text"
            placeholder="Search comics..."
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "15px",
              fontFamily: "'Sora', system-ui, sans-serif",
            }}
          />
        </div>
      </div>

      {/* Placeholder text color for search input */}
      <style>{`
        [data-ocid="header.search_input"]::placeholder {
          color: rgba(255,255,255,0.5);
        }
      `}</style>
    </header>
  );
}
