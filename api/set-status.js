export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metoda niedozwolona' });
  }

  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Brak statusu' });
    }

    // Zapisz status do pliku lub bazy danych
    // Przykład: zapis do pliku JSON w Vercel Edge Config (lub innej bazie)
    console.log(`Nowy status: ${status}`);

    return res.status(200).send('Status zaktualizowany');
  } catch (err) {
    console.error('Błąd serwera:', err);
    return res.status(500).json({ error: 'Błąd serwera' });
  }
}
