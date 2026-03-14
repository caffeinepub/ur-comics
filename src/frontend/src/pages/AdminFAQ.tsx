import { useCallback, useEffect, useState } from "react";
import type { FaqItem, SubmittedQuestion } from "../backend.d";
import { useActor } from "../hooks/useActor";
import type { Page } from "../types";

interface AdminFAQProps {
  onNavigate: (page: Page) => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 15px",
  borderRadius: "10px",
  border: "1px solid rgba(159,139,255,0.25)",
  background: "rgba(255,255,255,0.06)",
  color: "#F0EEFF",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    pending: { bg: "rgba(255,180,0,0.15)", color: "#FFD060" },
    approved: { bg: "rgba(80,200,120,0.15)", color: "#60D080" },
    rejected: { bg: "rgba(255,80,80,0.15)", color: "#FF8080" },
  };
  const c = colors[status] ?? colors.pending;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        background: c.bg,
        color: c.color,
      }}
    >
      {status}
    </span>
  );
}

function SubmittedQuestionsTab({
  questions,
  password,
  onRefresh,
}: {
  questions: SubmittedQuestion[];
  password: string;
  onRefresh: () => void;
}) {
  const { actor } = useActor();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState<Record<string, boolean>>({});

  const handleApprove = async (q: SubmittedQuestion) => {
    if (!actor) return;
    const key = String(q.id);
    const answer = answers[key]?.trim();
    if (!answer) {
      alert("Please write an answer before approving.");
      return;
    }
    setProcessing((p) => ({ ...p, [key]: true }));
    try {
      await actor.approveQuestion(password, q.id, answer);
      onRefresh();
    } catch {
      alert("Error approving question.");
    } finally {
      setProcessing((p) => ({ ...p, [key]: false }));
    }
  };

  const handleReject = async (q: SubmittedQuestion) => {
    if (!actor) return;
    setProcessing((p) => ({ ...p, [String(q.id)]: true }));
    try {
      await actor.rejectQuestion(password, q.id);
      onRefresh();
    } catch {
      alert("Error rejecting question.");
    } finally {
      setProcessing((p) => ({ ...p, [String(q.id)]: false }));
    }
  };

  if (questions.length === 0) {
    return (
      <div
        data-ocid="admin.questions.empty_state"
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "rgba(240,238,255,0.4)",
        }}
      >
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
        <p style={{ fontSize: "15px" }}>No submitted questions yet.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {questions.map((q, i) => (
        <div
          key={String(q.id)}
          data-ocid={`admin.questions.item.${i + 1}`}
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: "14px",
            border: "1px solid rgba(159,139,255,0.15)",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "12px",
              marginBottom: "10px",
              flexWrap: "wrap",
            }}
          >
            <div>
              {q.name && (
                <span
                  style={{
                    fontSize: "13px",
                    color: "#9F8BFF",
                    fontWeight: 600,
                  }}
                >
                  {q.name}
                </span>
              )}
              {q.email && (
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(240,238,255,0.4)",
                    marginLeft: "8px",
                  }}
                >
                  {q.email}
                </span>
              )}
            </div>
            <StatusBadge status={q.status} />
          </div>
          <p
            style={{
              color: "#F0EEFF",
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: "1.5",
              marginBottom: "14px",
            }}
          >
            {q.question}
          </p>
          {q.status === "pending" && (
            <>
              <textarea
                placeholder="Write an answer…"
                value={answers[String(q.id)] ?? ""}
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [String(q.id)]: e.target.value }))
                }
                rows={3}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "80px",
                  marginBottom: "12px",
                }}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  data-ocid={`admin.approve_button.${i + 1}`}
                  disabled={processing[String(q.id)]}
                  onClick={() => handleApprove(q)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(135deg, #6A5AE0, #9F8BFF)",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "13px",
                    opacity: processing[String(q.id)] ? 0.6 : 1,
                  }}
                >
                  ✅ Approve
                </button>
                <button
                  type="button"
                  data-ocid={`admin.reject_button.${i + 1}`}
                  disabled={processing[String(q.id)]}
                  onClick={() => handleReject(q)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,100,100,0.3)",
                    background: "rgba(255,80,80,0.08)",
                    color: "#FF8080",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "13px",
                    opacity: processing[String(q.id)] ? 0.6 : 1,
                  }}
                >
                  ❌ Reject
                </button>
              </div>
            </>
          )}
          {q.status !== "pending" && q.answer && (
            <div
              style={{
                marginTop: "8px",
                padding: "12px",
                background: "rgba(106,90,224,0.08)",
                borderRadius: "10px",
                fontSize: "13px",
                color: "rgba(240,238,255,0.7)",
              }}
            >
              <strong style={{ color: "#9F8BFF" }}>Answer: </strong>
              {q.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ManageFaqsTab({ faqs }: { faqs: FaqItem[] }) {
  if (faqs.length === 0) {
    return (
      <div
        data-ocid="admin.faqs.empty_state"
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "rgba(240,238,255,0.4)",
        }}
      >
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>📚</div>
        <p style={{ fontSize: "15px" }}>No FAQs available yet.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {faqs.map((faq, i) => (
        <div
          key={String(faq.id)}
          data-ocid={`admin.faqs.item.${i + 1}`}
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: "14px",
            border: "1px solid rgba(159,139,255,0.12)",
            borderLeft: "4px solid #6A5AE0",
            padding: "16px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                color: "#9F8BFF",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {faq.category}
            </span>
            <div
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "12px",
                color: "rgba(240,238,255,0.4)",
              }}
            >
              <span>👁 {String(faq.viewCount)}</span>
              <span>👍 {String(faq.helpfulCount)}</span>
            </div>
          </div>
          <p
            style={{
              color: "#F0EEFF",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "1.5",
              marginBottom: "8px",
            }}
          >
            {faq.question}
          </p>
          <p
            style={{
              color: "rgba(240,238,255,0.6)",
              fontSize: "13px",
              lineHeight: "1.6",
            }}
          >
            {faq.answer}
          </p>
        </div>
      ))}
    </div>
  );
}

function PasswordGateWrapper({ onUnlock }: { onUnlock: (pw: string) => void }) {
  const { actor } = useActor();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || !actor) return;
    setLoading(true);
    setError("");
    try {
      const ok = await actor.verifyAdminPassword(password);
      if (ok) {
        onUnlock(password);
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0D0B1A 0%, #1A1240 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(159,139,255,0.2)",
          borderRadius: "20px",
          padding: "40px 32px",
          width: "100%",
          maxWidth: "380px",
          boxShadow: "0 8px 40px rgba(106,90,224,0.2)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔐</div>
          <h1
            style={{
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "24px",
              background: "linear-gradient(135deg, #6A5AE0, #9F8BFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}
          >
            Admin Access
          </h1>
          <p
            style={{
              color: "rgba(240,238,255,0.5)",
              fontSize: "13px",
              marginTop: "8px",
            }}
          >
            Enter the admin password to continue.
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <input
              data-ocid="admin.password_input"
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
            {error && (
              <p
                data-ocid="admin.login.error_state"
                style={{ color: "#FF8BAA", fontSize: "13px", margin: 0 }}
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              data-ocid="admin.login_button"
              disabled={loading || !password.trim()}
              style={{
                padding: "14px",
                borderRadius: "40px",
                border: "none",
                background: "linear-gradient(135deg, #6A5AE0, #9F8BFF)",
                color: "white",
                cursor: loading ? "default" : "pointer",
                fontWeight: 700,
                fontSize: "15px",
                opacity: loading || !password.trim() ? 0.6 : 1,
                boxShadow: "0 4px 16px rgba(106,90,224,0.35)",
                transition: "opacity 0.2s",
              }}
            >
              {loading ? "Verifying…" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminFAQ({ onNavigate }: AdminFAQProps) {
  const { actor } = useActor();
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"questions" | "faqs">("questions");
  const [questions, setQuestions] = useState<SubmittedQuestion[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    if (!actor) return;
    setLoading(true);
    try {
      const [qs, fs] = await Promise.all([
        actor.getAllSubmittedQuestions(),
        actor.getAllApprovedFaqs(),
      ]);
      setQuestions(qs);
      setFaqs(fs);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (unlocked) loadData();
  }, [unlocked, loadData]);

  const handleUnlock = (pw: string) => {
    setPassword(pw);
    setUnlocked(true);
  };

  if (!unlocked) {
    return <PasswordGateWrapper onUnlock={handleUnlock} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0D0B1A 0%, #1A1240 100%)",
        paddingBottom: "60px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(159,139,255,0.12)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "20px",
              background: "linear-gradient(135deg, #6A5AE0, #9F8BFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}
          >
            FAQ Admin Dashboard
          </h1>
          <p
            style={{
              fontSize: "12px",
              color: "rgba(240,238,255,0.4)",
              margin: "4px 0 0",
            }}
          >
            UR Comics • Admin
          </p>
        </div>
        <button
          type="button"
          data-ocid="admin.back_button"
          onClick={() => onNavigate("home")}
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            border: "1px solid rgba(159,139,255,0.25)",
            background: "transparent",
            color: "#9F8BFF",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          ← Back to Site
        </button>
      </div>

      <div
        style={{ maxWidth: "760px", margin: "0 auto", padding: "24px 16px" }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "24px",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "14px",
            padding: "6px",
          }}
        >
          {(
            [
              {
                key: "questions",
                label: "Submitted Questions",
                ocid: "admin.submitted_questions.tab",
              },
              {
                key: "faqs",
                label: "Manage FAQs",
                ocid: "admin.manage_faqs.tab",
              },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              data-ocid={tab.ocid}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                background:
                  activeTab === tab.key
                    ? "linear-gradient(135deg, #6A5AE0, #9F8BFF)"
                    : "transparent",
                color:
                  activeTab === tab.key ? "white" : "rgba(240,238,255,0.5)",
                cursor: "pointer",
                fontWeight: activeTab === tab.key ? 700 : 500,
                fontSize: "14px",
                transition: "all 0.2s",
                boxShadow:
                  activeTab === tab.key
                    ? "0 2px 10px rgba(106,90,224,0.3)"
                    : "none",
              }}
            >
              {tab.label}
              {tab.key === "questions" && (
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "11px",
                    background: "rgba(255,255,255,0.2)",
                    padding: "2px 7px",
                    borderRadius: "20px",
                  }}
                >
                  {questions.filter((q) => q.status === "pending").length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Refresh */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "16px",
          }}
        >
          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            style={{
              padding: "7px 16px",
              borderRadius: "10px",
              border: "1px solid rgba(159,139,255,0.2)",
              background: "transparent",
              color: "rgba(240,238,255,0.6)",
              cursor: "pointer",
              fontSize: "12px",
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? "Loading…" : "↻ Refresh"}
          </button>
        </div>

        {activeTab === "questions" ? (
          <SubmittedQuestionsTab
            questions={questions}
            password={password}
            onRefresh={loadData}
          />
        ) : (
          <ManageFaqsTab faqs={faqs} />
        )}
      </div>
    </div>
  );
}
