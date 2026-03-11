export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "24px 20px",
        textAlign: "center",
        color: "var(--color-text-muted)",
        fontSize: "13px",
        marginTop: "40px",
      }}
    >
      © {year}. Built with ❤️ using{" "}
      <a
        href={`https://caffeine.ai?${utm}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "var(--color-primary-light)", textDecoration: "none" }}
      >
        caffeine.ai
      </a>
    </footer>
  );
}
