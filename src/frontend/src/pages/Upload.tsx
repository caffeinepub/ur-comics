import { useState } from "react";

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

export default function Upload({ onBack }: UploadProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [coverDrag, setCoverDrag] = useState(false);
  const [chapterDrag, setChapterDrag] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
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

  return (
    <div
      style={{ maxWidth: "600px", margin: "0 auto", padding: "28px 16px 60px" }}
    >
      {/* Header */}
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
          onClick={onBack}
          style={{
            background: "rgba(159, 139, 255, 0.1)",
            border: "1px solid rgba(159, 139, 255, 0.2)",
            color: "white",
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0,
          }}
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
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {/* Title */}
        <div>
          <label
            htmlFor="comic-title"
            style={{
              display: "block",
              color: "var(--color-text-muted)",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "8px",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            Comic Title
          </label>
          <input
            id="comic-title"
            data-ocid="upload.title_input"
            type="text"
            className="dark-input"
            placeholder="Enter your comic title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="comic-description"
            style={{
              display: "block",
              color: "var(--color-text-muted)",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "8px",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            Description
          </label>
          <textarea
            id="comic-description"
            data-ocid="upload.description_textarea"
            className="dark-input"
            placeholder="Tell readers what your comic is about..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{ resize: "vertical", minHeight: "100px" }}
          />
        </div>

        {/* Genre */}
        <div>
          <label
            htmlFor="comic-genre"
            style={{
              display: "block",
              color: "var(--color-text-muted)",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "8px",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            Genre
          </label>
          <select
            id="comic-genre"
            data-ocid="upload.genre_select"
            className="dark-input"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
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

        {/* Cover Image */}
        <div>
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            Cover Image
          </p>
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
            style={{ width: "100%", cursor: "pointer", fontFamily: "inherit" }}
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

        {/* Chapter Images */}
        <div>
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            Chapter Pages
          </p>
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
            style={{ width: "100%", cursor: "pointer", fontFamily: "inherit" }}
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

        {/* Submit */}
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
