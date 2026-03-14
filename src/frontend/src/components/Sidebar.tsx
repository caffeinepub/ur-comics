import type { Page } from "../types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
}

const navItems = [
  {
    label: "Home",
    ocid: "sidebar.home_link",
    page: "home" as Page,
    icon: "🏠",
  },
  {
    label: "Trending",
    ocid: "sidebar.trending_link",
    page: "home" as Page,
    icon: "🔥",
  },
  {
    label: "New Releases",
    ocid: "sidebar.new_releases_link",
    page: "home" as Page,
    icon: "✨",
  },
  {
    label: "Genres",
    ocid: "sidebar.genres_link",
    page: "home" as Page,
    icon: "📚",
  },
  {
    label: "Bookmarks",
    ocid: "sidebar.bookmarks_link",
    page: "bookmarks" as Page,
    icon: "🔖",
  },
  {
    label: "Help & FAQs",
    ocid: "sidebar.faq_link",
    page: "faq" as Page,
    icon: "❓",
  },
  {
    label: "Upload",
    ocid: "sidebar.upload_link",
    page: "upload" as Page,
    icon: "⬆️",
  },
  {
    label: "Become a Creator",
    ocid: "sidebar.creator_link",
    page: "upload" as Page,
    icon: "🎨",
  },
  {
    label: "Login / Sign Up",
    ocid: "sidebar.login_link",
    page: "home" as Page,
    icon: "👤",
  },
];

export default function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div
        data-ocid="sidebar.overlay"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        role="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close menu"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 55,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Sidebar Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "280px",
          background: "#1A1630",
          zIndex: 60,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(159, 139, 255, 0.15)",
          overflowY: "auto",
        }}
      >
        {/* Sidebar header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 20px",
            borderBottom: "1px solid rgba(159, 139, 255, 0.15)",
            minHeight: "72px",
          }}
        >
          <span
            className="gradient-text"
            style={{
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "22px",
              letterSpacing: "-0.02em",
            }}
          >
            UR Comics
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            style={{
              background: "rgba(159, 139, 255, 0.1)",
              border: "none",
              color: "white",
              cursor: "pointer",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* Nav items */}
        <nav style={{ padding: "12px 12px", flex: 1 }}>
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              data-ocid={item.ocid}
              onClick={() => onNavigate(item.page)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                width: "100%",
                padding: "14px 16px",
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 500,
                fontFamily: "inherit",
                textAlign: "left",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(106, 90, 224, 0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "none";
              }}
            >
              <span style={{ fontSize: "18px", flexShrink: 0 }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: "16px 20px",
            borderTop: "1px solid rgba(159, 139, 255, 0.15)",
            color: "var(--color-text-muted)",
            fontSize: "12px",
          }}
        >
          © {new Date().getFullYear()} UR Comics
        </div>
      </div>
    </>
  );
}
