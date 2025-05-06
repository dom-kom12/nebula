import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'Brak statusu' });

  const logPath = join(process.cwd(), 'status-log.json');
  const now = new Date().toISOString();

  let history = [];
  if (existsSync(logPath)) {
    const data = readFileSync(logPath, 'utf-8');
    history = JSON.parse(data);
  }

  history.push({ status, date: now });

  writeFileSync(logPath, JSON.stringify(history, null, 2));

  res.status(200).json({ success: true });
}
