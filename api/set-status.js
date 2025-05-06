export default function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body;
    if (!body.status) {
      return res.status(400).json({ error: 'Brak statusu' });
    }
    // tu ustaw status
    return res.status(200).json({ success: true, status: body.status });
  } else {
    return res.status(405).json({ error: 'Zła metoda' });
  }
}
