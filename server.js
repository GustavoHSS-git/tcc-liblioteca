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
app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use('/fotos', express.static(path.join(__dirname, 'fotos')));

// ============================================
// 📖 DADOS DOS LIVROS (API)
// ============================================
const books = [
    {
        id: 1,
        title: "As Relíquias da Morte",
        author: "J.K. Rowling",
        price: 89.90,
        image: "/fotos/33.jpg",
        images: ["/fotos/33.jpg", "/fotos/33.jpg"],
        description: "O sétimo e último livro da saga Harry Potter. A busca pelas Relíquias da Morte se torna crucial na luta final contra Voldemort.",
        category: "livro"
    },
    {
        id: 2,
        title: "Os Dois Morrem no Final",
        author: "Adam Silvera",
        price: 54.90,
        image: "/fotos/30.jpg",
        images: ["/fotos/30.jpg", "/fotos/30.jpg"],
        description: "Um romance emocionante sobre dois rapazes que recebem a notícia de que morrerão no mesmo dia.",
        category: "livro"
    },
    {
        id: 3,
        title: "A Menina do Outro Lado",
        author: "Nagabe",
        price: 45.00,
        image: "/fotos/17.jpg",
        images: ["/fotos/17.jpg", "/fotos/17.jpg"],
        description: "Um mangá encantador sobre uma menina misteriosa e as histórias que a cercam.",
        category: "manga"
    },
    {
        id: 4,
        title: "A Canção de Aquiles",
        author: "Madeline Miller",
        price: 62.90,
        image: "/fotos/13.jpg",
        images: ["/fotos/13.jpg", "/fotos/13.jpg"],
        description: "Uma reinterpretação poética da história de Aquiles e Pátroclo durante a Guerra de Troia.",
        category: "livro"
    },
    {
        id: 5,
        title: "Jujutsu Kaisen: Batalha de Feiticeiros",
        author: "Gege Akutami",
        price: 35.00,
        image: "/fotos/27.jpg",
        images: ["/fotos/27.jpg", "/fotos/27.jpg"],
        description: "Um mangá de ação e fantasia sobre jovens feiticeiros que combatem espíritos amaldiçoados.",
        category: "manga"
    },
    {
        id: 6,
        title: "O Cara Que Estou a Fim não É um Cara?!",
        author: "Sumiko Arai",
        price: 38.90,
        image: "/fotos/18.jpg",
        images: ["/fotos/18.jpg", "/fotos/18.jpg"],
        description: "Um mangá romântico e cômico que desafia as expectativas de identidade e amor.",
        category: "manga"
    },
    {
        id: 7,
        title: "Dragon Ball Super Vol. 1",
        author: "Akira Toriyama",
        price: 49.90,
        image: "/fotos/paginas/dbz1.jpg",
        images: [
            "/fotos/paginas/dbz1.jpg",
            "/fotos/paginas/3 (1).jpg",
        ],
        description: "A continuação da famosa série Dragon Ball, onde Goku e seus amigos enfrentam novos desafios e inimigos poderosos.",
        category: "manga",
        pages: [
            "/fotos/paginas/3 (1).jpg",
            "/fotos/paginas/3 (2).jpg",
            "/fotos/paginas/3 (3).jpg",
            "/fotos/paginas/3 (4).jpg",
            "/fotos/paginas/3 (5).jpg",
            "/fotos/paginas/3 (6).jpg",
            "/fotos/paginas/3 (7).jpg"
        ]
    },
    {
        id: 8,
        title: "O Príncipe Cruel",
        author: "Katherine Arden",
        price: 52.90,
        image: "/fotos/21.jpg",
        images: ["/fotos/21.jpg", "/fotos/21.jpg"],
        description: "Um romance de fantasia sobre um príncipe cruel e uma jovem que se vê envolvida em sua história.",
        category: "livro"
    },
    {
        id: 9,
        title: "Dragon Ball Super Vol. 3",
        author: "Akira Toriyama",
        price: 49.90,
        image: "/fotos/paginas/dbz3.jpg",
        images: [
            "/fotos/paginas/dbz3.jpg",
            "/fotos/paginas/3 (6).jpg",
            "/fotos/paginas/3 (7).jpg",
        ],
        description: "Continuação da série com novos desafios intergalácticos e batalhas épicas.",
        category: "manga"
    },
    {
        id: 10,
        title: "Câmara Secreta",
        author: "J.K. Rowling",
        price: 85.00,
        image: "/fotos/37.jpg",
        images: ["/fotos/32.jpg"],
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

// GET /api/livros/:id/pages - Retorna as páginas (imagens) de um livro
app.get('/api/livros/:id/pages', (req, res) => {
    const { id } = req.params;
    const book = books.find(b => b.id === parseInt(id));

    if (!book) {
        return res.status(404).json({ success: false, message: 'Livro não encontrado' });
    }

    // Se o livro contém um array `pages` (para leitura completa), usa esse
    if (Array.isArray(book.pages) && book.pages.length) {
        return res.json({ success: true, data: book.pages, bookId: book.id, bookTitle: book.title });
    }

    // Se o livro já contém um array `images` (preview), retorna diretamente
    if (Array.isArray(book.images) && book.images.length) {
        return res.json({ success: true, data: book.images });
    }

    // Caso contrário, tenta ler um índice em /fotos/paginas/book-<id>/index.json
    const fs = require('fs');
    const pagesDir = path.join(__dirname, 'fotos', 'paginas', `book-${id}`);
    const indexFile = path.join(pagesDir, 'index.json');

    // se existir index.json, usa-o (permite apontar para imagens existentes sem copiar)
    if (fs.existsSync(indexFile)) {
        try {
            const content = fs.readFileSync(indexFile, 'utf8');
            const images = JSON.parse(content);
            return res.json({ success: true, data: images });
        } catch (err) {
            console.warn('Erro lendo index.json para', book.id, err);
            const fallback = [];
            if (book.image) fallback.push(book.image);
            return res.json({ success: true, data: fallback });
        }
    }

    // se não houver index.json, tenta listar arquivos na pasta book-<id>
    fs.readdir(pagesDir, (err, files) => {
        if (err) {
            // pasta não existe ou erro de leitura: usar imagem de capa (se existir)
            const fallback = [];
            if (book.image) fallback.push(book.image);
            return res.json({ success: true, data: fallback });
        }

        const images = files
            .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f))
            .sort()
            .map(f => path.posix.join('/fotos/paginas', `book-${id}`, f));

        return res.json({ success: true, data: images });
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

// GET /api/categorias/:category - Retorna livros por categoria
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
// 📝 ENDPOINTS CRUD (POST, PUT, DELETE)
// ============================================

// POST /api/livros - Criar novo livro
app.post('/api/livros', (req, res) => {
    const { title, author, price, image, category, description, pages } = req.body;

    // Validação
    if (!title || !author || !price || !image || !category) {
        return res.status(400).json({
            success: false,
            message: "Campos obrigatórios: title, author, price, image, category"
        });
    }

    // Gerar novo ID
    const newId = Math.max(...books.map(b => b.id), 0) + 1;

    const newBook = {
        id: newId,
        title: title.trim(),
        author: author.trim(),
        price: parseFloat(price),
        image: image.trim(),
        images: [image.trim()],
        category: category.toLowerCase(),
        description: description || "",
        pages: Array.isArray(pages) ? pages : (pages ? pages.split(',').map(p => p.trim()).filter(p => p) : [])
    };

    books.push(newBook);

    res.status(201).json({
        success: true,
        message: "Livro criado com sucesso",
        data: newBook
    });
});

// PUT /api/livros/:id - Atualizar livro
app.put('/api/livros/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author, price, image, category, description, pages } = req.body;

    const book = books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Livro não encontrado"
        });
    }

    // Atualizar campos
    if (title) book.title = title.trim();
    if (author) book.author = author.trim();
    if (price) book.price = parseFloat(price);
    if (image) book.image = image.trim();
    if (category) book.category = category.toLowerCase();
    if (description !== undefined) book.description = description;
    if (pages) {
        book.pages = Array.isArray(pages) ? pages : pages.split(',').map(p => p.trim()).filter(p => p);
    }

    res.json({
        success: true,
        message: "Livro atualizado com sucesso",
        data: book
    });
});

// DELETE /api/livros/:id - Deletar livro
app.delete('/api/livros/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Livro não encontrado"
        });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        success: true,
        message: "Livro deletado com sucesso",
        data: deletedBook[0]
    });
});

// ============================================
// 🌐 ROTAS DO SITE
// ============================================

// Rota principal - Serve o Login como página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Login', 'Login.html'));
});

// Rota para pages antigas (compatibilidade)
app.get('/inicial', (req, res) => {
  res.sendFile(path.join(__dirname, 'inicial', 'i.html'));
});

app.get('/biblioteca', (req, res) => {
  res.sendFile(path.join(__dirname, 'biblioteca', 'bibliotecaindex.html'));
});

app.get('/loja', (req, res) => {
  res.sendFile(path.join(__dirname, 'loja', 'catalogo.html'));
});

app.get('/leitura', (req, res) => {
  res.sendFile(path.join(__dirname, 'leitura', 'Leitura.html'));
});

app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'admin-login.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'admin.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Biblioteca Digital - Página inicial: Login`);
});
