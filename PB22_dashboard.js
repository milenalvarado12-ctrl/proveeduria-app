const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const data = { Pendiente: 5, Aprobada: 10, Rechazada: 3, Anulada: 1 };

app.get('/', (req, res) => {
  res.render('dashboard', { data });
});

app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
