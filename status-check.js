// status-check.js

async function checkSystemStatus() {
  try {
    const response = await fetch('/status-page.html');
    const text = await response.text();

    // Stwórz tymczasowy DOM z pobranej strony
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    const statusElement = doc.getElementById('system-status');
    const systemStatus = statusElement?.textContent.trim().toLowerCase();

    // Jeśli status to 'offline', przekieruj
    if (systemStatus === 'offline') {
      if (!window.location.pathname.includes('system-offline.html')) {
        window.location.href = '/system-offline.html';
      }
    }
  } catch (error) {
    console.error('Błąd pobierania statusu systemu:', error);
  }
}

// Sprawdzaj co 5 sekund
setInterval(checkSystemStatus, 5000);
