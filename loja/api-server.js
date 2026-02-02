// ============================================
// 📚 API REST - LIVRARIA
// ============================================
// Servidor Express para servir dados de livros e mangás
// Instalar dependências: npm install express cors
// Rodar: node api-server.js
// Acesso: http://localhost:3000

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta `loja` (útil se quiser abrir a UI pelo navegador)
app.use(express.static(path.join(__dirname)));

// ============================================
// 📖 DADOS DOS LIVROS
// ============================================
const books = [
    {
        id: 1,
        title: "As Relíquias da Morte",
        author: "J.K. Rowling",
        price: 89.90,
        image: "../fotos/33.jpg",
        images: ["../fotos/33.jpg", "../fotos/33.jpg"],
        description: "O sétimo e último livro da saga Harry Potter. A busca pelas Relíquias da Morte se torna crucial na luta final contra Voldemort.",
        category: "livro"
    },
    {
        id: 2,
        title: "Os Dois Morrem no Final",
        author: "Adam Silvera",
        price: 54.90,
        image: "../fotos/30.jpg",
        images: ["../fotos/30.jpg", "../fotos/30.jpg"],
        description: "Um romance emocionante sobre dois rapazes que recebem a notícia de que morrerão no mesmo dia.",
        category: "livro"
    },
    {
        id: 3,
        title: "A Menina do Outro Lado",
        author: "Nagabe",
        price: 45.00,
        image: "../fotos/17.jpg",
        images: ["../fotos/17.jpg", "../fotos/17.jpg"],
        description: "Um mangá encantador sobre uma menina misteriosa e as histórias que a cercam.",
        category: "manga"
    },
    {
        id: 4,
        title: "A Canção de Aquiles",
        author: "Madeline Miller",
        price: 62.90,
        image: "../fotos/13.jpg",
        images: ["../fotos/13.jpg", "../fotos/13.jpg"],
        description: "Uma reinterpretação poética da história de Aquiles e Pátroclo durante a Guerra de Troia.",
        category: "livro"
    },
    {
        id: 5,
        title: "Jujutsu Kaisen: Batalha de Feiticeiros",
        author: "Gege Akutami",
        price: 35.00,
        image: "../fotos/27.jpg",
        images: ["../fotos/27.jpg", "../fotos/27.jpg"],
        description: "Um mangá de ação e fantasia sobre jovens feiticeiros que combatem espíritos amaldiçoados.",
        category: "manga"
    },
    {
        id: 6,
        title: "O Cara Que Estou a Fim não É um Cara?!",
        author: "Sumiko Arai",
        price: 38.90,
        image: "../fotos/18.jpg",
        images: ["../fotos/18.jpg", "../fotos/18.jpg"],
        description: "Um mangá romântico e cômico que desafia as expectativas de identidade e amor.",
        category: "manga"
    },
    {
        id: 7,
        title: "Dragon Ball Super Vol. 1",
        author: "Akira Toriyama",
        price: 49.90,
        image: "../fotos/paginas/dbz1.jpg",
        images: ["../fotos/paginas/3 (1).jpg", "../fotos/paginas/3 (2).jpg", "../fotos/paginas/3 (3).jpg"],
        description: "A continuação da famosa série Dragon Ball, onde Goku e seus amigos enfrentam novos desafios e inimigos poderosos.",
        category: "manga"
    },
    {
        id: 8,
        title: "O Príncipe Cruel",
        author: "Katherine Arden",
        price: 52.90,
        image: "../fotos/21.jpg",
        images: ["../fotos/21.jpg", "../fotos/21.jpg"],
        description: "Um romance de fantasia sobre um príncipe cruel e uma jovem que se vê envolvida em sua história.",
        category: "livro"
    },
    {
        id: 9,
        title: "Dragon Ball Super Vol. 4",
        author: "Akira Toriyama",
        price: 49.90,
        image: "../fotos/dbz4.jpg",
        images: ["../fotos/dbz4.jpg", "../fotos/dbz4.jpg"],
        description: "Continuação da série com novos desafios intergalácticos e batalhas épicas.",
        category: "manga"
    },
    {
        id: 10,
        title: "Câmara Secreta",
        author: "J.K. Rowling",
        price: 85.00,
        image: "../fotos/22.jpg",
        images: ["../fotos/32.jpg"],
        description: "O segundo livro da saga Harry Potter. Mistérios e perigos rondam Hogwarts.",
        category: "livro"
    }
];

// ============================================
// 🔧 ENDPOINTS DA API
// ============================================

// GET /api/livros - Retorna todos os livros
app.get('/api/livros', (req, res) => {
    res.json({
        success: true,
        data: books,
        count: books.length
    });
});

// Rota raiz: página simples com links úteis para testar a API
app.get('/', (req, res) => {
    res.send(`
        <!doctype html>
        <html lang="pt-BR">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <title>API Livraria</title>
            <style>body{font-family:Arial,Helvetica,sans-serif;padding:24px;background:#f6f8fb;color:#222}a{color:#007385}</style>
        </head>
        <body>
            <h1>API Livraria</h1>
            <p>Endpoints disponíveis:</p>
            <ul>
                <li><a href="/api/status">/api/status</a></li>
                <li><a href="/api/livros">/api/livros</a></li>
                <li><a href="/api/mangas">/api/mangas</a></li>
            </ul>
            <p>Se quiser abrir a interface estática, coloque seus arquivos HTML/CSS/JS nesta pasta e acesse <a href="/">/</a>.</p>
        </body>
        </html>
    `);
});

// GET /api/livros/:id - Retorna um livro específico
app.get('/api/livros/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find(b => b.id === parseInt(id));

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Livro não encontrado"
        });
    }

    res.json({
        success: true,
        data: book
    });
});

// GET /api/livros/autor/:author - Retorna livros por autor
app.get('/api/livros/autor/:author', (req, res) => {
    const { author } = req.params;
    const filtered = books.filter(b => b.author.toLowerCase() === author.toLowerCase());

    res.json({
        success: true,
        data: filtered,
        count: filtered.length
    });
});

// GET /api/mangas - Retorna todos os mangás
app.get('/api/mangas', (req, res) => {
    const mangas = books.filter(b => b.category === 'manga');
    res.json({
        success: true,
        data: mangas,
        count: mangas.length
    });
});

// GET /api/categorias - Retorna livros por categoria
app.get('/api/categorias/:category', (req, res) => {
    const { category } = req.params;
    const filtered = books.filter(b => b.category === category.toLowerCase());

    res.json({
        success: true,
        data: filtered,
        count: filtered.length
    });
});

// GET /api/buscar - Busca por título ou autor
app.get('/api/buscar', (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({
            success: false,
            message: "Parâmetro 'q' é obrigatório"
        });
    }

    const searchTerm = q.toLowerCase();
    const results = books.filter(b =>
        b.title.toLowerCase().includes(searchTerm) ||
        b.author.toLowerCase().includes(searchTerm)
    );

    res.json({
        success: true,
        data: results,
        count: results.length,
        query: q
    });
});

// GET /api/status - Health check
app.get('/api/status', (req, res) => {
    res.json({
        success: true,
        message: "API está funcionando!",
        timestamp: new Date().toISOString()
    });
});

// ============================================
// 🚀 INICIAR SERVIDOR
// ============================================
app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║  📚 API LIVRARIA RODANDO              ║
    ║  Servidor: http://localhost:${PORT}        ║
    ║  Endpoints:                            ║
    ║  - GET  /api/livros                   ║
    ║  - GET  /api/livros/:id               ║
    ║  - GET  /api/mangas                   ║
    ║  - GET  /api/livros/autor/:author     ║
    ║  - GET  /api/categorias/:category     ║
    ║  - GET  /api/buscar?q=termo           ║
    ║  - GET  /api/status                   ║
    ╚════════════════════════════════════════╝
    `);
});
