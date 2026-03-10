import { Link } from "@tanstack/react-router";
import { BookOpen, Menu, Search, X } from "lucide-react";
import { useRef, useState } from "react";

interface HeaderProps {
  onDrawerOpen: () => void;
}

export default function Header({ onDrawerOpen }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openSearch = () => {
    setShowSearch(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <header
      className="glass-header sticky top-0 z-50 w-full"
      style={{ boxShadow: "0 2px 20px rgba(106, 90, 224, 0.1)" }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 16px",
          height: 64,
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* Left: Menu button */}
        <button
          type="button"
          data-ocid="header.toggle"
          onClick={onDrawerOpen}
          aria-label="Open navigation menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--nebula-primary)",
            flexShrink: 0,
          }}
        >
          <Menu size={22} />
        </button>

        {/* Center: Logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <BookOpen size={22} color="#6A5AE0" style={{ flexShrink: 0 }} />
          <span
            style={{
              fontWeight: 800,
              fontSize: "clamp(1rem, 4vw, 1.25rem)",
              background: "linear-gradient(135deg, #6A5AE0, #8B7CFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            UR Comics
          </span>
        </Link>

        {/* Right: Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 4,
            flexShrink: 0,
          }}
        >
          {showSearch ? (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <input
                data-ocid="header.search_input"
                ref={inputRef}
                type="search"
                placeholder="Search..."
                onBlur={() => setShowSearch(false)}
                style={{
                  border: "1.5px solid rgba(106, 90, 224, 0.3)",
                  borderRadius: 50,
                  padding: "6px 12px",
                  fontSize: "0.875rem",
                  outline: "none",
                  background: "white",
                  color: "var(--nebula-text)",
                  width: "clamp(100px, 30vw, 180px)",
                  fontFamily: "inherit",
                }}
              />
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                aria-label="Close search"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 6,
                  color: "var(--nebula-primary)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              data-ocid="header.search_input"
              onClick={openSearch}
              aria-label="Search"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                color: "var(--nebula-primary)",
              }}
            >
              <Search size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
