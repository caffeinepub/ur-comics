import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Reader from "./pages/Reader";
import Upload from "./pages/Upload";
import type { Comic, Page } from "./types";

const BLACK_CIRCLE_COMIC: Comic = {
  id: 99,
  title: "BLACK CIRCLE",
  author: "UR Comics Creator",
  genre: "Action / Slice of Life",
  likes: "0",
  views: "0",
  gradient: "linear-gradient(160deg, #0d0020 0%, #2a0060 50%, #6A5AE0 100%)",
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = (page: Page, comic?: Comic) => {
    if (comic) setSelectedComic(comic);
    setCurrentPage(page);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);
    if (searchOpen) setSearchQuery("");
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <Header
        onMenuOpen={() => setSidebarOpen(true)}
        onLogoClick={() => navigate("home")}
        searchOpen={searchOpen}
        onSearchToggle={handleSearchToggle}
        onSearchChange={setSearchQuery}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={navigate}
      />
      <main className="pt-14">
        {currentPage === "home" && (
          <div className="page-enter">
            <Home
              onReadComic={(comic) => navigate("reader", comic)}
              onNavigate={navigate}
              onReadFeatured={() => navigate("reader", BLACK_CIRCLE_COMIC)}
              searchQuery={searchQuery}
            />
          </div>
        )}
        {currentPage === "reader" && (
          <div className="page-enter">
            <Reader comic={selectedComic} onBack={() => navigate("home")} />
          </div>
        )}
        {currentPage === "upload" && (
          <div className="page-enter">
            <Upload onBack={() => navigate("home")} />
          </div>
        )}
      </main>
    </div>
  );
}
