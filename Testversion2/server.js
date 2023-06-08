const express = require('express');
const app = express();
const port = 7799;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});