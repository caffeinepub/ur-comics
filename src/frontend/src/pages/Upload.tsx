import { useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Upload as UploadIcon,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { SAMPLE_GENRES } from "../types";

type Step = 1 | 2 | 3;

interface FormData {
  title: string;
  genre: string;
  description: string;
  author: string;
}

interface PreviewFile {
  name: string;
  url: string;
}

export default function Upload() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormData>({
    title: "",
    genre: "",
    description: "",
    author: "",
  });

  const setField = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateStep1 = () => {
    const e: Partial<FormData> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.genre) e.genre = "Please select a genre";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.author.trim()) e.author = "Author name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newPreviews: PreviewFile[] = [];
    for (const file of Array.from(files)) {
      if (file.type.startsWith("image/")) {
        newPreviews.push({ name: file.name, url: URL.createObjectURL(file) });
      }
    }
    setPreviews((prev) => [...prev, ...newPreviews]);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removePreview = (index: number) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "12px 16px",
    border: hasError
      ? "1.5px solid #e53935"
      : "1.5px solid rgba(106, 90, 224, 0.2)",
    borderRadius: 14,
    fontSize: "0.95rem",
    fontFamily: "inherit",
    outline: "none",
    background: "#FAFAFE",
    color: "var(--nebula-text)",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: 600,
    fontSize: "0.875rem",
    marginBottom: 8,
    color: "var(--nebula-text)",
  };

  const steps = [
    { num: 1, label: "Comic Info" },
    { num: 2, label: "Upload Panels" },
    { num: 3, label: "Review" },
  ];

  if (submitted) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "var(--nebula-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          data-ocid="upload.success_state"
          style={{ textAlign: "center", maxWidth: 420 }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6A5AE0, #8B7CFF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 0 40px rgba(106, 90, 224, 0.4)",
            }}
          >
            <CheckCircle size={40} color="white" />
          </div>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "1.6rem",
              letterSpacing: "-0.02em",
              marginBottom: 12,
              color: "var(--nebula-text)",
            }}
          >
            Comic Submitted!
          </h2>
          <p
            style={{
              color: "var(--nebula-text-muted)",
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            <strong>{form.title || "Your comic"}</strong> has been submitted for
            review. Our team will get back to you within 48 hours.
          </p>
          <button
            type="button"
            className="btn-nebula"
            onClick={() => router.navigate({ to: "/" })}
            style={{ fontSize: "0.9rem" }}
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--nebula-bg)",
        padding: "40px 20px 80px",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <button
          type="button"
          onClick={() => router.navigate({ to: "/" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--nebula-text-muted)",
            fontFamily: "inherit",
            fontSize: "0.875rem",
            fontWeight: 500,
            padding: "4px 0",
            marginBottom: 32,
          }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <h1
          style={{
            fontWeight: 800,
            fontSize: "2rem",
            letterSpacing: "-0.03em",
            color: "var(--nebula-text)",
            marginBottom: 8,
          }}
        >
          Upload Your Comic
        </h1>
        <p
          style={{
            color: "var(--nebula-text-muted)",
            marginBottom: 40,
            lineHeight: 1.5,
          }}
        >
          Share your story with the UR Comics community.
        </p>

        {/* Step indicators */}
        <div style={{ display: "flex", marginBottom: 40 }}>
          {steps.map((s, i) => (
            <div
              key={s.num}
              data-ocid="upload.tab"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                position: "relative",
              }}
            >
              {i < steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: "calc(50% + 20px)",
                    right: "calc(-50% + 20px)",
                    height: 2,
                    background:
                      step > s.num
                        ? "linear-gradient(90deg, #6A5AE0, #8B7CFF)"
                        : "rgba(106, 90, 224, 0.15)",
                  }}
                />
              )}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  background:
                    step >= s.num
                      ? "linear-gradient(135deg, #6A5AE0, #8B7CFF)"
                      : "rgba(106, 90, 224, 0.12)",
                  color: step >= s.num ? "white" : "#6A5AE0",
                  boxShadow:
                    step === s.num
                      ? "0 0 16px rgba(106, 90, 224, 0.4)"
                      : "none",
                }}
              >
                {step > s.num ? "✓" : s.num}
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: step === s.num ? 700 : 500,
                  color:
                    step === s.num
                      ? "var(--nebula-primary)"
                      : "var(--nebula-text-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 24,
            padding: "32px 28px",
            boxShadow: "0 4px 24px rgba(106, 90, 224, 0.1)",
            border: "0.5px solid rgba(106, 90, 224, 0.1)",
          }}
        >
          {step === 1 && (
            <div>
              <h2
                style={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: 24,
                  color: "var(--nebula-text)",
                }}
              >
                Comic Information
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div>
                  <label htmlFor="comic-title" style={labelStyle}>
                    Title *
                  </label>
                  <input
                    id="comic-title"
                    data-ocid="upload.input"
                    type="text"
                    value={form.title}
                    onChange={(e) => setField("title", e.target.value)}
                    placeholder="e.g. Shadow Chronicles"
                    style={inputStyle(!!errors.title)}
                  />
                  {errors.title && (
                    <p
                      style={{
                        color: "#e53935",
                        fontSize: "0.78rem",
                        marginTop: 4,
                      }}
                    >
                      {errors.title}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="comic-genre" style={labelStyle}>
                    Genre *
                  </label>
                  <select
                    id="comic-genre"
                    data-ocid="upload.select"
                    value={form.genre}
                    onChange={(e) => setField("genre", e.target.value)}
                    style={{
                      ...inputStyle(!!errors.genre),
                      cursor: "pointer",
                      appearance: "none",
                      color: form.genre ? "var(--nebula-text)" : "#9ca3af",
                    }}
                  >
                    <option value="" disabled>
                      Select a genre
                    </option>
                    {SAMPLE_GENRES.filter((g) => g !== "All").map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  {errors.genre && (
                    <p
                      style={{
                        color: "#e53935",
                        fontSize: "0.78rem",
                        marginTop: 4,
                      }}
                    >
                      {errors.genre}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="comic-description" style={labelStyle}>
                    Description *
                  </label>
                  <textarea
                    id="comic-description"
                    data-ocid="upload.textarea"
                    value={form.description}
                    onChange={(e) => setField("description", e.target.value)}
                    placeholder="Tell readers what your comic is about..."
                    rows={4}
                    style={{
                      ...inputStyle(!!errors.description),
                      resize: "vertical",
                      lineHeight: 1.6,
                    }}
                  />
                  {errors.description && (
                    <p
                      style={{
                        color: "#e53935",
                        fontSize: "0.78rem",
                        marginTop: 4,
                      }}
                    >
                      {errors.description}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="comic-author" style={labelStyle}>
                    Author Name *
                  </label>
                  <input
                    id="comic-author"
                    data-ocid="upload.input"
                    type="text"
                    value={form.author}
                    onChange={(e) => setField("author", e.target.value)}
                    placeholder="Your pen name"
                    style={inputStyle(!!errors.author)}
                  />
                  {errors.author && (
                    <p
                      style={{
                        color: "#e53935",
                        fontSize: "0.78rem",
                        marginTop: 4,
                      }}
                    >
                      {errors.author}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2
                style={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: 24,
                  color: "var(--nebula-text)",
                }}
              >
                Upload Panels
              </h2>
              <button
                type="button"
                data-ocid="upload.dropzone"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={isDragging ? "dropzone-active" : ""}
                style={{
                  border: "2.5px dashed rgba(106, 90, 224, 0.35)",
                  borderRadius: 20,
                  padding: "48px 24px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: isDragging
                    ? "rgba(106, 90, 224, 0.04)"
                    : "#FAFAFE",
                  marginBottom: 20,
                  width: "100%",
                  fontFamily: "inherit",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, rgba(106,90,224,0.12), rgba(139,124,255,0.12))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <UploadIcon size={24} color="#6A5AE0" />
                </div>
                <p
                  style={{
                    fontWeight: 700,
                    color: "var(--nebula-text)",
                    marginBottom: 4,
                    fontSize: "0.95rem",
                  }}
                >
                  Drop panels here
                </p>
                <p
                  style={{
                    color: "var(--nebula-text-muted)",
                    fontSize: "0.825rem",
                  }}
                >
                  PNG, JPG, WebP · Drag & drop or click to browse
                </p>
                <input
                  data-ocid="upload.upload_button"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </button>
              {previews.length > 0 && (
                <div>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "var(--nebula-text-muted)",
                      marginBottom: 12,
                    }}
                  >
                    {previews.length} panel{previews.length !== 1 ? "s" : ""}{" "}
                    added
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(88px, 1fr))",
                      gap: 10,
                    }}
                  >
                    {previews.map((p, i) => (
                      <div
                        key={p.url}
                        style={{
                          position: "relative",
                          aspectRatio: "2/3",
                          borderRadius: 12,
                          overflow: "hidden",
                          border: "1.5px solid rgba(106,90,224,0.15)",
                        }}
                      >
                        <img
                          src={p.url}
                          alt={`Panel ${i + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePreview(i);
                          }}
                          aria-label={`Remove panel ${i + 1}`}
                          style={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background: "rgba(0,0,0,0.6)",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2
                style={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: 24,
                  color: "var(--nebula-text)",
                }}
              >
                Review & Submit
              </h2>
              <div
                style={{
                  background: "var(--nebula-bg)",
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 24,
                  border: "1px solid rgba(106,90,224,0.1)",
                }}
              >
                <div style={{ display: "grid", gap: 14 }}>
                  {(["Title", "Genre", "Author", "Panels"] as const).map(
                    (label) => {
                      const value =
                        label === "Panels"
                          ? previews.length > 0
                            ? `${previews.length} uploaded`
                            : "None"
                          : form[label.toLowerCase() as keyof FormData] || "—";
                      return (
                        <div
                          key={label}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderBottom: "1px solid rgba(106,90,224,0.08)",
                            paddingBottom: 12,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              color: "var(--nebula-text-muted)",
                              textTransform: "uppercase",
                              letterSpacing: "0.04em",
                            }}
                          >
                            {label}
                          </span>
                          <span
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: 600,
                              color: "var(--nebula-text)",
                            }}
                          >
                            {value}
                          </span>
                        </div>
                      );
                    },
                  )}
                  <div>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "var(--nebula-text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      Description
                    </span>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--nebula-text)",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {form.description || "—"}
                    </p>
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--nebula-text-muted)",
                  lineHeight: 1.5,
                }}
              >
                By submitting, you agree to our community guidelines and confirm
                this is your original work.
              </p>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
            gap: 12,
          }}
        >
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as Step)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: 50,
                border: "1.5px solid rgba(106,90,224,0.25)",
                background: "white",
                color: "var(--nebula-primary)",
                fontFamily: "inherit",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <button
              type="button"
              className="btn-nebula"
              onClick={() => {
                if (step === 1) {
                  if (validateStep1()) setStep(2);
                } else setStep(3);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: "0.9rem",
              }}
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              data-ocid="upload.submit_button"
              className="btn-nebula"
              onClick={() => setSubmitted(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: "0.9rem",
              }}
            >
              <CheckCircle size={16} /> Submit Comic
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
