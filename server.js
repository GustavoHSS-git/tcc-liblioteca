const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Servir arquivos estáticos das subpastas
app.use('/Login', express.static(path.join(__dirname, 'Login')));
app.use('/inicial', express.static(path.join(__dirname, 'inicial')));
app.use('/biblioteca', express.static(path.join(__dirname, 'biblioteca')));
app.use('/dadoslivros', express.static(path.join(__dirname, 'dadoslivros')));
app.use('/leitura', express.static(path.join(__dirname, 'leitura')));
app.use('/loja', express.static(path.join(__dirname, 'loja')));
app.use('/fotos', express.static(path.join(__dirname, 'fotos')));
app.use('/api', express.static(path.join(__dirname, 'api')));

// Rota principal - Serve o Login como página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Login', 'Login.html'));
});

// Rota para pages antigas (compatibilidade)
app.get('/Login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Login', 'Login.html'));
});

app.get('/inicial', (req, res) => {
  res.sendFile(path.join(__dirname, 'inicial', 'i.html'));
});

app.get('/biblioteca', (req, res) => {
  res.sendFile(path.join(__dirname, 'biblioteca', 'bibliotecaindex.html'));
});

app.get('/loja', (req, res) => {
  res.sendFile(path.join(__dirname, 'loja', 'catalogo.html'));
});

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'Login', 'Login.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Biblioteca Digital - Página inicial: Login`);
});
