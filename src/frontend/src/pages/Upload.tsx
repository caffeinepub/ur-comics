import { useState } from "react";

type UploadType = "comic" | "novel" | null;

interface UploadProps {
  onBack: () => void;
}

const genres = [
  "Action",
  "Romance",
  "Drama",
  "Fantasy",
  "Comedy",
  "Sci-Fi",
  "Horror",
];

interface ChapterDraft {
  id: number;
  title: string;
  text: string;
}

export default function Upload({ onBack }: UploadProps) {
  const [uploadType, setUploadType] = useState<UploadType>(null);

  // Comic form state
  const [comicTitle, setComicTitle] = useState("");
  const [comicDescription, setComicDescription] = useState("");
  const [comicGenre, setComicGenre] = useState("");
  const [comicSubmitted, setComicSubmitted] = useState(false);
  const [coverDrag, setCoverDrag] = useState(false);
  const [chapterDrag, setChapterDrag] = useState(false);

  // Novel form state
  const [novelTitle, setNovelTitle] = useState("");
  const [novelDescription, setNovelDescription] = useState("");
  const [novelGenre, setNovelGenre] = useState("");
  const [novelChapters, setNovelChapters] = useState<ChapterDraft[]>([
    { id: 1, title: "", text: "" },
  ]);
  const [novelCoverDrag, setNovelCoverDrag] = useState(false);
  const [novelSubmitted, setNovelSubmitted] = useState(false);

  const addChapter = () => {
    setNovelChapters((prev) => [
      ...prev,
      { id: prev.length + 1, title: "", text: "" },
    ]);
  };

  const removeChapter = (id: number) => {
    setNovelChapters((prev) => prev.filter((c) => c.id !== id));
  };

  const updateChapter = (
    id: number,
    field: "title" | "text",
    value: string,
  ) => {
    setNovelChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  const backButtonStyle = {
    background: "rgba(159, 139, 255, 0.1)",
    border: "1px solid rgba(159, 139, 255, 0.2)",
    color: "white" as const,
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  };

  const labelStyle = {
    display: "block",
    color: "var(--color-text-muted)",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "8px",
    letterSpacing: "0.03em",
    textTransform: "uppercase" as const,
  };

  // — Comic success —
  if (comicSubmitted) {
    return (
      <div
        data-ocid="upload.success_state"
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
        <h2
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: 800,
            fontFamily: "'Sora', system-ui, sans-serif",
            margin: "0 0 12px",
          }}
        >
          Comic Published!
        </h2>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "15px",
            margin: "0 0 28px",
          }}
        >
          Your comic has been submitted for review.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="btn-gradient"
          style={{
            padding: "12px 32px",
            borderRadius: "999px",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "inherit",
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  // — Novel success —
  if (novelSubmitted) {
    return (
      <div
        data-ocid="upload.success_state"
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>📖</div>
        <h2
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: 800,
            fontFamily: "'Sora', system-ui, sans-serif",
            margin: "0 0 12px",
          }}
        >
          Novel Published!
        </h2>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "15px",
            margin: "0 0 28px",
          }}
        >
          Your novel has been submitted for review.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="btn-gradient"
          style={{
            padding: "12px 32px",
            borderRadius: "999px",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "inherit",
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  // — Type selection screen —
  if (uploadType === null) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "28px 16px 60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <button
            type="button"
            onClick={onBack}
            style={backButtonStyle}
            aria-label="Go back"
          >
            ←
          </button>
          <h1
            style={{
              color: "white",
              fontSize: "22px",
              fontWeight: 800,
              fontFamily: "'Sora', system-ui, sans-serif",
              margin: 0,
            }}
          >
            What would you like to upload?
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {/* Upload Comic card */}
          <button
            type="button"
            data-ocid="upload.comic_button"
            onClick={() => setUploadType("comic")}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              padding: "32px 20px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "var(--color-surface-2)";
              el.style.borderColor = "rgba(159, 139, 255, 0.5)";
              el.style.boxShadow = "0 0 20px rgba(106, 90, 224, 0.2)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "var(--color-surface)";
              el.style.borderColor = "var(--color-border)";
              el.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #4A0080, #9F8BFF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
            >
              🎨
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "16px",
                  margin: "0 0 4px",
                  fontFamily: "'Sora', system-ui, sans-serif",
                }}
              >
                Upload Comic
              </p>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "12px",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Manga, manhwa, webtoon with image pages
              </p>
            </div>
          </button>

          {/* Upload Novel card */}
          <button
            type="button"
            data-ocid="upload.novel_button"
            onClick={() => setUploadType("novel")}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              padding: "32px 20px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "var(--color-surface-2)";
              el.style.borderColor = "rgba(159, 139, 255, 0.5)";
              el.style.boxShadow = "0 0 20px rgba(106, 90, 224, 0.2)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "var(--color-surface)";
              el.style.borderColor = "var(--color-border)";
              el.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #600030, #FF6BAA)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
            >
              📖
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "16px",
                  margin: "0 0 4px",
                  fontFamily: "'Sora', system-ui, sans-serif",
                }}
              >
                Upload Novel
              </p>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "12px",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Written story with chapter text
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // — Comic upload form —
  if (uploadType === "comic") {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "28px 16px 60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          <button
            type="button"
            onClick={() => setUploadType(null)}
            style={backButtonStyle}
            aria-label="Back to selection"
          >
            ←
          </button>
          <h1
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: 800,
              fontFamily: "'Sora', system-ui, sans-serif",
              margin: 0,
            }}
          >
            Upload Comic
          </h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setComicSubmitted(true);
          }}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label htmlFor="comic-title" style={labelStyle}>
              Comic Title
            </label>
            <input
              id="comic-title"
              data-ocid="upload.title_input"
              type="text"
              className="dark-input"
              placeholder="Enter your comic title"
              value={comicTitle}
              onChange={(e) => setComicTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="comic-description" style={labelStyle}>
              Description
            </label>
            <textarea
              id="comic-description"
              data-ocid="upload.description_textarea"
              className="dark-input"
              placeholder="Tell readers what your comic is about..."
              value={comicDescription}
              onChange={(e) => setComicDescription(e.target.value)}
              rows={4}
              style={{ resize: "vertical", minHeight: "100px" }}
            />
          </div>

          <div>
            <label htmlFor="comic-genre" style={labelStyle}>
              Genre
            </label>
            <select
              id="comic-genre"
              data-ocid="upload.genre_select"
              className="dark-input"
              value={comicGenre}
              onChange={(e) => setComicGenre(e.target.value)}
              required
              style={{ cursor: "pointer" }}
            >
              <option value="" disabled>
                Select a genre
              </option>
              {genres.map((g) => (
                <option key={g} value={g} style={{ background: "#1A1630" }}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p style={{ ...labelStyle, margin: "0 0 8px" }}>Cover Image</p>
            <button
              type="button"
              data-ocid="upload.cover_dropzone"
              className={`upload-zone${coverDrag ? " drag-over" : ""}`}
              onDragEnter={() => setCoverDrag(true)}
              onDragLeave={() => setCoverDrag(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => setCoverDrag(false)}
              onClick={() => document.getElementById("cover-input")?.click()}
              aria-label="Upload cover image"
              style={{
                width: "100%",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <input
                id="cover-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
              />
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🖼️</div>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "14px",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Click or drag to upload cover
              </p>
              <p
                style={{
                  color: "rgba(168, 158, 201, 0.5)",
                  fontSize: "12px",
                  margin: "4px 0 0",
                }}
              >
                PNG, JPG up to 5MB
              </p>
            </button>
          </div>

          <div>
            <p style={{ ...labelStyle, margin: "0 0 8px" }}>Chapter Pages</p>
            <button
              type="button"
              data-ocid="upload.chapter_dropzone"
              className={`upload-zone${chapterDrag ? " drag-over" : ""}`}
              onDragEnter={() => setChapterDrag(true)}
              onDragLeave={() => setChapterDrag(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => setChapterDrag(false)}
              onClick={() => document.getElementById("chapter-input")?.click()}
              aria-label="Upload chapter pages"
              style={{
                width: "100%",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <input
                id="chapter-input"
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
              />
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📚</div>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "14px",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Upload chapter pages (multiple)
              </p>
              <p
                style={{
                  color: "rgba(168, 158, 201, 0.5)",
                  fontSize: "12px",
                  margin: "4px 0 0",
                }}
              >
                Upload pages in order · PNG, JPG
              </p>
            </button>
          </div>

          <button
            data-ocid="upload.submit_button"
            type="submit"
            className="btn-gradient"
            style={{
              padding: "14px 32px",
              borderRadius: "999px",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "inherit",
              marginTop: "8px",
            }}
          >
            Publish Comic 🚀
          </button>
        </form>
      </div>
    );
  }

  // — Novel upload form —
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "28px 16px 60px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        <button
          type="button"
          onClick={() => setUploadType(null)}
          style={backButtonStyle}
          aria-label="Back to selection"
        >
          ←
        </button>
        <h1
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: 800,
            fontFamily: "'Sora', system-ui, sans-serif",
            margin: 0,
          }}
        >
          Upload Novel
        </h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNovelSubmitted(true);
        }}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div>
          <label htmlFor="novel-title" style={labelStyle}>
            Novel Title
          </label>
          <input
            id="novel-title"
            data-ocid="upload.title_input"
            type="text"
            className="dark-input"
            placeholder="Enter your novel title"
            value={novelTitle}
            onChange={(e) => setNovelTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <p style={{ ...labelStyle, margin: "0 0 8px" }}>Cover Image</p>
          <button
            type="button"
            data-ocid="upload.cover_dropzone"
            className={`upload-zone${novelCoverDrag ? " drag-over" : ""}`}
            onDragEnter={() => setNovelCoverDrag(true)}
            onDragLeave={() => setNovelCoverDrag(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => setNovelCoverDrag(false)}
            onClick={() =>
              document.getElementById("novel-cover-input")?.click()
            }
            aria-label="Upload novel cover image"
            style={{ width: "100%", cursor: "pointer", fontFamily: "inherit" }}
          >
            <input
              id="novel-cover-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🖼️</div>
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "14px",
                margin: 0,
                fontWeight: 500,
              }}
            >
              Click or drag to upload cover
            </p>
            <p
              style={{
                color: "rgba(168, 158, 201, 0.5)",
                fontSize: "12px",
                margin: "4px 0 0",
              }}
            >
              PNG, JPG up to 5MB
            </p>
          </button>
        </div>

        <div>
          <label htmlFor="novel-description" style={labelStyle}>
            Description
          </label>
          <textarea
            id="novel-description"
            data-ocid="upload.description_textarea"
            className="dark-input"
            placeholder="Tell readers what your novel is about..."
            value={novelDescription}
            onChange={(e) => setNovelDescription(e.target.value)}
            rows={4}
            style={{ resize: "vertical", minHeight: "100px" }}
          />
        </div>

        <div>
          <label htmlFor="novel-genre" style={labelStyle}>
            Genre
          </label>
          <select
            id="novel-genre"
            data-ocid="upload.genre_select"
            className="dark-input"
            value={novelGenre}
            onChange={(e) => setNovelGenre(e.target.value)}
            required
            style={{ cursor: "pointer" }}
          >
            <option value="" disabled>
              Select a genre
            </option>
            {genres.map((g) => (
              <option key={g} value={g} style={{ background: "#1A1630" }}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Chapters */}
        <div>
          <p
            style={{
              color: "white",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "'Sora', system-ui, sans-serif",
              margin: "0 0 14px",
            }}
          >
            Chapters
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {novelChapters.map((chapter, i) => (
              <div
                key={chapter.id}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <p
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    Chapter {i + 1}
                  </p>
                  {novelChapters.length > 1 && (
                    <button
                      type="button"
                      data-ocid={`upload.remove_chapter_button.${i + 1}`}
                      onClick={() => removeChapter(chapter.id)}
                      style={{
                        background: "rgba(255, 80, 80, 0.1)",
                        border: "1px solid rgba(255, 80, 80, 0.2)",
                        color: "#ff6b6b",
                        width: "28px",
                        height: "28px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontFamily: "inherit",
                      }}
                      aria-label={`Remove chapter ${i + 1}`}
                    >
                      ×
                    </button>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <input
                    data-ocid={`upload.chapter_title_input.${i + 1}`}
                    type="text"
                    className="dark-input"
                    placeholder={`Chapter ${i + 1} title`}
                    value={chapter.title}
                    onChange={(e) =>
                      updateChapter(chapter.id, "title", e.target.value)
                    }
                    required
                  />
                  <textarea
                    data-ocid={`upload.chapter_textarea.${i + 1}`}
                    className="dark-input"
                    placeholder="Write or paste your chapter text here..."
                    value={chapter.text}
                    onChange={(e) =>
                      updateChapter(chapter.id, "text", e.target.value)
                    }
                    rows={8}
                    style={{ resize: "vertical", minHeight: "160px" }}
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            data-ocid="upload.add_chapter_button"
            onClick={addChapter}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(106, 90, 224, 0.1)",
              border: "1px dashed rgba(159, 139, 255, 0.4)",
              color: "var(--color-primary-light)",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "inherit",
              marginTop: "12px",
              width: "100%",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            + Add Chapter
          </button>
        </div>

        <button
          data-ocid="upload.submit_button"
          type="submit"
          className="btn-gradient"
          style={{
            padding: "14px 32px",
            borderRadius: "999px",
            fontSize: "16px",
            fontWeight: 700,
            fontFamily: "inherit",
            marginTop: "8px",
          }}
        >
          Publish Novel 🚀
        </button>
      </form>
    </div>
  );
}
