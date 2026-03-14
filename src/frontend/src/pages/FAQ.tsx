import { useEffect, useRef, useState } from "react";
import type { FaqItem } from "../backend.d";
import { useActor } from "../hooks/useActor";
import type { Page } from "../types";

interface FAQProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

const CATEGORIES = [
  "All",
  "Getting Started",
  "Reading Comics",
  "Uploading Comics",
  "Uploading Novels",
  "Creator Accounts",
  "Bookmarks & Library",
  "Technical Issues",
];

function SkeletonCard() {
  return (
    <div
      style={{
        background: "rgba(230,228,240,0.6)",
        borderRadius: "16px",
        padding: "20px 24px",
        marginBottom: "12px",
        border: "1px solid rgba(159,139,255,0.1)",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    >
      <div
        style={{
          height: "18px",
          background: "rgba(159,139,255,0.15)",
          borderRadius: "8px",
          width: "70%",
        }}
      />
    </div>
  );
}

function AccordionItem({
  faq,
  index,
  onOpen,
}: {
  faq: FaqItem;
  index: number;
  onOpen: (id: bigint) => void;
}) {
  const [open, setOpen] = useState(false);
  const [voted, setVoted] = useState<"helpful" | "not" | null>(null);
  const [helpfulCount, setHelpfulCount] = useState(Number(faq.helpfulCount));
  const [notHelpfulCount, setNotHelpfulCount] = useState(
    Number(faq.notHelpfulCount),
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const { actor } = useActor();

  useEffect(() => {
    if (open && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  const handleToggle = () => {
    if (!open) onOpen(faq.id);
    setOpen((v) => !v);
  };

  const handleVote = async (helpful: boolean) => {
    if (voted || !actor) return;
    try {
      await actor.voteHelpful(faq.id, helpful);
      if (helpful) {
        setHelpfulCount((c) => c + 1);
      } else {
        setNotHelpfulCount((c) => c + 1);
      }
      setVoted(helpful ? "helpful" : "not");
    } catch {
      // silent
    }
  };

  return (
    <div
      data-ocid={`faq.item.${index + 1}`}
      style={{
        background: "rgba(255,255,255,0.92)",
        borderRadius: "16px",
        marginBottom: "10px",
        border: "1px solid rgba(106,90,224,0.15)",
        borderLeft: "4px solid #6A5AE0",
        overflow: "hidden",
        transition: "box-shadow 0.2s",
        boxShadow: open
          ? "0 4px 24px rgba(106,90,224,0.18)"
          : "0 2px 12px rgba(106,90,224,0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      <button
        type="button"
        onClick={handleToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px",
          background: "none",
          border: "none",
          color: "#1A1A2E",
          cursor: "pointer",
          textAlign: "left",
          gap: "12px",
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "1.4",
            flex: 1,
            color: "#5A3BFF",
          }}
        >
          {faq.question}
        </span>
        <span
          style={{
            fontSize: "18px",
            flexShrink: 0,
            background: "linear-gradient(135deg, #6A5AE0, #9F8BFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            display: "inline-block",
          }}
        >
          ▾
        </span>
      </button>

      <div
        style={{
          maxHeight: `${height}px`,
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div ref={contentRef} style={{ padding: "0 20px 20px" }}>
          <p
            style={{
              color: "#4A4A6A",
              fontSize: "14px",
              lineHeight: "1.7",
              marginBottom: "16px",
            }}
          >
            {faq.answer}
          </p>
          {/* Voting */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              paddingTop: "12px",
              borderTop: "1px solid rgba(106,90,224,0.12)",
            }}
          >
            <span style={{ fontSize: "12px", color: "#8888AA" }}>
              Was this helpful?
            </span>
            <button
              type="button"
              data-ocid={`faq.helpful_button.${index + 1}`}
              onClick={() => handleVote(true)}
              disabled={voted !== null}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "20px",
                border: "1px solid rgba(106,90,224,0.3)",
                background:
                  voted === "helpful" ? "rgba(106,90,224,0.15)" : "transparent",
                color: voted === "helpful" ? "#6A5AE0" : "#8888AA",
                cursor: voted ? "default" : "pointer",
                fontSize: "13px",
                transition: "all 0.2s",
                opacity: voted === "not" ? 0.4 : 1,
              }}
            >
              👍 {helpfulCount}
            </button>
            <button
              type="button"
              data-ocid={`faq.not_helpful_button.${index + 1}`}
              onClick={() => handleVote(false)}
              disabled={voted !== null}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "20px",
                border: "1px solid rgba(159,139,255,0.2)",
                background:
                  voted === "not" ? "rgba(255,100,100,0.1)" : "transparent",
                color: voted === "not" ? "#CC4477" : "#8888AA",
                cursor: voted ? "default" : "pointer",
                fontSize: "13px",
                transition: "all 0.2s",
                opacity: voted === "helpful" ? 0.4 : 1,
              }}
            >
              👎 {notHelpfulCount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ onBack, onNavigate: _onNavigate }: FAQProps) {
  const { actor } = useActor();
  const [allFaqs, setAllFaqs] = useState<FaqItem[]>([]);
  const [popularFaqs, setPopularFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  // Ask a Question form
  const [askName, setAskName] = useState("");
  const [askEmail, setAskEmail] = useState("");
  const [askQuestion, setAskQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!actor) return;
    const load = async () => {
      setLoading(true);
      try {
        const [all, popular] = await Promise.all([
          actor.getAllApprovedFaqs(),
          actor.getPopularFaqs(),
        ]);
        setAllFaqs(all);
        setPopularFaqs(popular.slice(0, 6));
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [actor]);

  const handleFaqOpen = async (id: bigint) => {
    if (!actor) return;
    try {
      await actor.recordFaqView(id);
    } catch {
      // silent
    }
  };

  const filteredFaqs = allFaqs.filter((faq) => {
    const matchCat =
      activeCategory === "All" || faq.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!askQuestion.trim() || !actor) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await actor.submitQuestion(
        askName.trim() || null,
        askEmail.trim() || null,
        askQuestion.trim(),
      );
      setSubmitSuccess(true);
      setAskName("");
      setAskEmail("");
      setAskQuestion("");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryButtonStyle = (cat: string): React.CSSProperties => {
    const isActive = activeCategory === cat;
    const isHovered = hoveredCat === cat && !isActive;
    if (isActive) {
      return {
        flexShrink: 0,
        padding: "8px 18px",
        borderRadius: "40px",
        border: "1px solid rgba(106,90,224,0.4)",
        background: "linear-gradient(135deg, #6A5AE0, #9F8BFF)",
        color: "#fff",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: 600,
        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow:
          "0 4px 16px rgba(106,90,224,0.4), 0 0 0 1px rgba(159,139,255,0.2)",
        transform: "scale(1.02)",
      };
    }
    return {
      flexShrink: 0,
      padding: "8px 18px",
      borderRadius: "40px",
      border: "1px solid rgba(180,175,210,0.5)",
      background: isHovered
        ? "rgba(210,206,235,0.95)"
        : "rgba(230,228,240,0.8)",
      color: isHovered ? "#5A3BFF" : "#6B6B8A",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: 400,
      transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
      boxShadow: isHovered
        ? "0 6px 20px rgba(106,90,224,0.2), inset 0 1px 0 rgba(255,255,255,0.9)"
        : "0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
      transform: isHovered ? "scale(1.05)" : "scale(1)",
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg, #F4F7FF)",
        paddingBottom: "60px",
      }}
    >
      {/* Hero Header */}
      <div
        style={{
          background:
            "linear-gradient(160deg, #1A1630 0%, #2A1A60 60%, #3A2080 100%)",
          padding: "40px 20px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(106,90,224,0.3) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <button
          type="button"
          onClick={onBack}
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            background: "rgba(159,139,255,0.12)",
            border: "1px solid rgba(159,139,255,0.25)",
            color: "#9F8BFF",
            cursor: "pointer",
            borderRadius: "10px",
            padding: "8px 14px",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          ← Back
        </button>
        <div
          style={{
            fontSize: "48px",
            marginBottom: "12px",
            position: "relative",
          }}
        >
          💬
        </div>
        <h1
          style={{
            fontFamily: "'Sora', system-ui, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(28px, 6vw, 40px)",
            background: "linear-gradient(135deg, #6A5AE0, #9F8BFF, #C96EFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0 0 10px",
            position: "relative",
          }}
        >
          Help & FAQs
        </h1>
        <div
          style={{
            width: "60px",
            height: "4px",
            background: "linear-gradient(90deg, #6A5AE0, #9F8BFF)",
            borderRadius: "2px",
            margin: "0 auto 16px",
          }}
        />
        <p
          style={{
            color: "rgba(240,238,255,0.7)",
            fontSize: "15px",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: "1.6",
            position: "relative",
          }}
        >
          Find answers to common questions or ask our community.
        </p>

        {/* Search bar */}
        <div
          style={{
            maxWidth: "480px",
            margin: "24px auto 0",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            data-ocid="faq.search_input"
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 20px 14px 46px",
              borderRadius: "40px",
              border: "1px solid rgba(159,139,255,0.3)",
              background: "rgba(255,255,255,0.08)",
              color: "#F0EEFF",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
              backdropFilter: "blur(8px)",
            }}
          />
        </div>
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 16px" }}>
        {/* Popular Questions */}
        {!searchQuery && popularFaqs.length > 0 && (
          <section style={{ marginTop: "36px" }}>
            <h2
              style={{
                fontFamily: "'Sora', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                background: "linear-gradient(135deg, #6A5AE0, #9F8BFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "6px",
              }}
            >
              Popular Questions
            </h2>
            <div
              style={{
                width: "40px",
                height: "3px",
                background: "linear-gradient(90deg, #6A5AE0, #9F8BFF)",
                borderRadius: "2px",
                marginBottom: "16px",
              }}
            />
            {popularFaqs.map((faq, i) => (
              <AccordionItem
                key={String(faq.id)}
                faq={faq}
                index={i}
                onOpen={handleFaqOpen}
              />
            ))}
          </section>
        )}

        {/* Category Tabs */}
        <section style={{ marginTop: "36px" }}>
          <div
            style={{
              overflowX: "auto",
              paddingBottom: "8px",
              display: "flex",
              gap: "8px",
              scrollbarWidth: "none",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid="faq.category.tab"
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => setHoveredCat(cat)}
                onMouseLeave={() => setHoveredCat(null)}
                style={getCategoryButtonStyle(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* FAQ List */}
        <section style={{ marginTop: "20px" }}>
          {loading ? (
            <>
              {[...Array(5)].map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <SkeletonCard key={i} />
              ))}
            </>
          ) : filteredFaqs.length === 0 ? (
            <div
              data-ocid="faq.empty_state"
              style={{
                textAlign: "center",
                padding: "48px 20px",
                color: "#8888AA",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔎</div>
              <p style={{ fontSize: "15px" }}>
                No questions found.
                {searchQuery && " Try a different search term."}
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, i) => (
              <AccordionItem
                key={String(faq.id)}
                faq={faq}
                index={i}
                onOpen={handleFaqOpen}
              />
            ))
          )}
        </section>

        {/* Ask a Question */}
        <section
          style={{
            marginTop: "48px",
            background: "rgba(255,255,255,0.88)",
            borderRadius: "20px",
            border: "1px solid rgba(106,90,224,0.15)",
            padding: "28px 24px",
            boxShadow: "0 4px 24px rgba(106,90,224,0.08)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              background: "linear-gradient(135deg, #6A5AE0, #9F8BFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "6px",
            }}
          >
            Ask a Question
          </h2>
          <div
            style={{
              width: "40px",
              height: "3px",
              background: "linear-gradient(90deg, #6A5AE0, #9F8BFF)",
              borderRadius: "2px",
              marginBottom: "20px",
            }}
          />
          {submitSuccess ? (
            <div
              data-ocid="faq.ask.success_state"
              style={{ textAlign: "center", padding: "32px", color: "#6A5AE0" }}
            >
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
              <p style={{ fontSize: "15px", fontWeight: 600 }}>
                Your question has been submitted!
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#8888AA",
                  marginTop: "6px",
                }}
              >
                Our team will review it and add an answer soon.
              </p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                style={{
                  marginTop: "16px",
                  padding: "10px 24px",
                  borderRadius: "20px",
                  border: "none",
                  background: "linear-gradient(135deg, #6A5AE0, #9F8BFF)",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Ask Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <input
                  data-ocid="faq.ask_name_input"
                  type="text"
                  placeholder="Your name (optional)"
                  value={askName}
                  onChange={(e) => setAskName(e.target.value)}
                  style={inputStyle}
                />
                <input
                  data-ocid="faq.ask_email_input"
                  type="email"
                  placeholder="Your email (optional)"
                  value={askEmail}
                  onChange={(e) => setAskEmail(e.target.value)}
                  style={inputStyle}
                />
                <textarea
                  data-ocid="faq.ask_question_textarea"
                  placeholder="What would you like to know?"
                  value={askQuestion}
                  onChange={(e) => setAskQuestion(e.target.value)}
                  required
                  rows={4}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "100px",
                  }}
                />
                {submitError && (
                  <p
                    data-ocid="faq.ask.error_state"
                    style={{ color: "#CC3366", fontSize: "13px", margin: 0 }}
                  >
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  data-ocid="faq.ask_submit_button"
                  disabled={submitting || !askQuestion.trim()}
                  style={{
                    padding: "14px",
                    borderRadius: "40px",
                    border: "none",
                    background: "linear-gradient(135deg, #6A5AE0, #9F8BFF)",
                    color: "white",
                    cursor: submitting ? "default" : "pointer",
                    fontWeight: 700,
                    fontSize: "15px",
                    opacity: submitting || !askQuestion.trim() ? 0.6 : 1,
                    transition: "opacity 0.2s",
                    boxShadow: "0 4px 16px rgba(106,90,224,0.35)",
                  }}
                >
                  {submitting ? "Submitting…" : "Submit Question"}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(106,90,224,0.2)",
  background: "rgba(255,255,255,0.8)",
  color: "#1A1A2E",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};
