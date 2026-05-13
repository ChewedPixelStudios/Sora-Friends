"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  async function generateVideo(): Promise<void> {
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    setResult(data.result);
    setLoading(false);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>AI Video Generator</h1>

      <textarea
        rows={5}
        style={{ width: "100%" }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your video..."
      />

      <button onClick={generateVideo} disabled={loading || !prompt}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Result</h3>
          <pre>{result}</pre>
        </div>
      )}
    </main>
  );
}
