const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Importar rotas
const culturasRota = require('./routes/culturas');
const plantacoesRota = require('./routes/plantacoes');

// Usar rotas
app.use('/api/culturas', culturasRota);
app.use('/api/plantacoes', plantacoesRota);

// Rota raiz - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌾 Servidor rodando em http://localhost:${PORT}`);
});
