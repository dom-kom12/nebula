export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    // Możesz tu np. dodać zabezpieczenie hasłem
    if (req.headers.authorization !== 'domino2012r') {
      return res.status(403).json({ error: 'Brak dostępu' });
    }

    // Zamiast pliku – Redis, Supabase, Upstash, etc.
    globalThis.status = message;
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}

