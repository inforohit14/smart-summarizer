import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function summarize() {
    setError(""); setResult(null);
    if (text.trim().length < 50) { setError("Enter 50+ characters."); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/summarize', {      // proxy handles /api → localhost:5000
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      if (!res.ok) { setError(data?.error || 'Failed'); return; }
      setResult(data);
    } catch {
      setError('Cannot reach backend. Is the server running on port 5000?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 16, fontFamily: "Inter, system-ui" }}>
      <h1>🧠 Smart Text Summarizer</h1>

      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste a long paragraph (50+ chars)…"
        style={{ width: "100%", padding: 12 }}
      />

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <button onClick={summarize} disabled={loading}>
          {loading ? "Summarizing…" : "Summarize"}
        </button>
        <button onClick={() => { setText(""); setResult(null); setError(""); }}>Clear</button>
      </div>

      {error && <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Summary</h3>
          <pre style={{ whiteSpace: "pre-wrap", background: "#f6f6f7", padding: 12, borderRadius: 8 }}>
            {result.summary}
          </pre>
          <small>Words: {result.wordCount} • Reading time: {result.readingTime} min</small>
        </div>
      )}
    </div>
  );
}
