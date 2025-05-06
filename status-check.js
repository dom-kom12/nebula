
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1368603126298312784/0QcdUfmxRXiog9Tooxdvs25pV6pz7hOLS9I5dtnCRyHJX7f2m3BsD9WMoG1NRuLBM9v_';

let previousStatus = {};

async function getStatusFromPage() {
  const res = await fetch('/status-page.html', { cache: 'no-store' });
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const rows = doc.querySelectorAll('#status-table tr');
  const statusData = {};

  rows.forEach((row, i) => {
    if (i === 0) return; // pomiń nagłówek
    const cells = row.querySelectorAll('td');
    if (cells.length === 2) {
      const system = cells[0].textContent.trim();
      const status = cells[1].textContent.trim().toLowerCase();
      statusData[system] = status;
    }
  });

  return statusData;
}

async function sendStatusToDiscord(statusData, changedOnly = false) {
  const lines = [];

  for (const [system, status] of Object.entries(statusData)) {
    const prev = previousStatus[system];
    if (!changedOnly || prev !== status) {
      lines.push(`**${system}**: \`${status.toUpperCase()}\``);
    }
  }

  if (lines.length === 0) return;

  previousStatus = { ...statusData };

  await fetch(DISCORD_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `🖥️ Status systemów:\n` + lines.join('\n')
    })
  });
}

async function monitorStatus() {
  try {
    const data = await getStatusFromPage();
    await sendStatusToDiscord(data, true);
  } catch (err) {
    console.error('Błąd podczas sprawdzania statusów:', err);
  }
}

async function hourlyReport() {
  try {
    const data = await getStatusFromPage();
    await sendStatusToDiscord(data, false);
  } catch (err) {
    console.error('Błąd podczas raportowania:', err);
  }
}

// Co godzinę – pełny raport
setInterval(hourlyReport, 60 * 60 * 1000);

// Co 1 minuta – zmiany statusu
setInterval(monitorStatus, 60 * 1000);

monitorStatus();
            
setInterval(checkLocalSystemStatus, 5000);
