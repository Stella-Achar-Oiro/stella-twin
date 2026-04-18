const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function streamChat(
  message: string,
  sessionId: string,
  onToken: (token: string) => void,
  onDone: () => void
): Promise<void> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, session_id: sessionId }),
  });

  if (!res.ok || !res.body) throw new Error(`API error ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const lines = decoder.decode(value, { stream: true }).split("\n");
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const raw = line.slice(6).trim();
      if (raw === "[DONE]") { onDone(); return; }
      try {
        const { token } = JSON.parse(raw);
        if (token) onToken(token);
      } catch { /* partial chunk */ }
    }
  }
  onDone();
}
