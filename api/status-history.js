import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const logPath = join(process.cwd(), 'status-log.json');

  if (!existsSync(logPath)) {
    return res.status(200).json([]);
  }

  const data = readFileSync(logPath, 'utf-8');
  const history = JSON.parse(data);

  res.status(200).json(history);
}
