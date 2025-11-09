const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (_req, res) => res.send('OK'));

app.post('/api/summarize', (req, res) => {
  const text = (req.body?.text || '').trim();
  if (text.length < 50) return res.status(400).json({ error: '50+ chars please' });

  const sentences = text.match(/[^.!?]+[.!?]/g) || [text];
  const summary = sentences.slice(0, 3).join(' ');
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  res.json({ summary, wordCount: words, readingTime: minutes });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
