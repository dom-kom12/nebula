async function checkSystemStatus() {
  try {
    const response = await fetch('/admin-status-page.html');
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const status = doc.querySelector('#system-status')?.textContent.trim().toLowerCase();

    if (status === 'offline' && !location.pathname.includes('system-offline.html')) {
      window.location.href = '/system-offline.html';
    }
  } catch (e) {
    console.error('Nie można sprawdzić statusu systemu:', e);
  }
}

setInterval(checkSystemStatus, 5000);
