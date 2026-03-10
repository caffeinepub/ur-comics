import { useRouter } from "@tanstack/react-router";
import {
  BookOpen,
  Grid3x3,
  Home,
  Sparkles,
  TrendingUp,
  Upload,
  X,
} from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: Home, label: "Home", to: "/" },
  { icon: TrendingUp, label: "Trending", to: "/" },
  { icon: Sparkles, label: "New Releases", to: "/" },
  { icon: Grid3x3, label: "Genres", to: "/" },
  { icon: Upload, label: "Upload", to: "/upload" },
];

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const router = useRouter();

  const handleNav = (to: string) => {
    router.navigate({ to });
    onClose();
  };

  return (
    <>
      <div
        className={`drawer-overlay ${isOpen ? "" : "hidden"}`}
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
      />
      <nav
        data-ocid="drawer.panel"
        className={`side-drawer ${isOpen ? "open" : ""}`}
        aria-label="Main navigation"
      >
        <div style={{ padding: "20px 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 32,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <BookOpen size={20} color="#6A5AE0" />
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  background: "linear-gradient(135deg, #6A5AE0, #8B7CFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                UR Comics
              </span>
            </div>
            <button
              type="button"
              data-ocid="drawer.close_button"
              onClick={onClose}
              aria-label="Close menu"
              style={{
                background: "rgba(106, 90, 224, 0.08)",
                border: "none",
                borderRadius: 12,
                padding: 8,
                cursor: "pointer",
                color: "#6A5AE0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={18} />
            </button>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isHome = item.label === "Home";
              const isUpload = item.label === "Upload";
              return (
                <li key={item.label} style={{ marginBottom: 4 }}>
                  <button
                    type="button"
                    data-ocid={
                      isHome
                        ? "nav.home_link"
                        : isUpload
                          ? "nav.upload_link"
                          : undefined
                    }
                    onClick={() => handleNav(item.to)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      borderRadius: 16,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                      color: "var(--nebula-text)",
                      fontFamily: "inherit",
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    <Icon size={18} color="#6A5AE0" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            style={{
              height: 1,
              background: "rgba(106, 90, 224, 0.1)",
              margin: "20px 0",
            }}
          />

          <button
            type="button"
            className="btn-nebula"
            style={{ width: "100%", fontSize: "0.9rem" }}
            onClick={() => handleNav("/upload")}
          >
            <Upload
              size={16}
              style={{
                display: "inline",
                marginRight: 8,
                verticalAlign: "middle",
              }}
            />
            Become a Creator
          </button>
        </div>
      </nav>
    </>
  );
}
