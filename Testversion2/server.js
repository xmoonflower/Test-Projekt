const express = require('express');
const app = express();
const fs = require('fs');

// Middleware zum Parsen von JSON-Daten
app.use(express.json());

// GET-Route für das Abrufen der aktuellen Fragenliste
app.get('/fragen', (req, res) => {
  fs.readFile('fragen.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Fehler beim Lesen der Fragen.' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// POST-Route zum Hinzufügen einer neuen Frage
app.post('/frage-hinzufuegen', (req, res) => {
  fs.readFile('fragen.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Fehler beim Lesen der Fragen.' });
    } else {
      const questions = JSON.parse(data);
      questions.push(req.body);

      fs.writeFile('fragen.json', JSON.stringify(questions), 'utf8', (err) => {
        if (err) {
          res.status(500).json({ error: 'Fehler beim Speichern der Frage.' });
        } else {
          res.json({ message: 'Die Quizfrage wurde erfolgreich erstellt und gespeichert.' });
        }
      });
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/make-quiz.html');
});

// Server starten
app.listen(7799, () => {
  console.log('Der Server ist gestartet und hört auf dem Port 7799.');
});
