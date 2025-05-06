export default async function handler(req, res) {
  res.status(200).json({ message: globalThis.status || 'Brak statusu' });
}

