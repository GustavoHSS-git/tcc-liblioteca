(function () {
    const steamCards = document.querySelector('.js-steamCards');

    const listImages = [
        "../fotos/1.jpg",
        "../fotos/2.jpg",
        "../fotos/3.jpg",
        "../fotos/4.jpg",
        "../fotos/5.jpg",
        "../fotos/6.jpg",
        "../fotos/7.jpg",
        "../fotos/8.jpg",
        "../fotos/9.jpg",
        "../fotos/10.jpg",
        "../fotos/11.jpg",
        "../fotos/12.jpg",
        "../fotos/13.jpg",
        "../fotos/14.jpg",
        "../fotos/15.jpg",
        "../fotos/16.jpg",
        "../fotos/17.jpg",
        "../fotos/18.jpg",
        "../fotos/19.jpg",
        "../fotos/20.jpg",
        "../fotos/21.jpg",
        "../fotos/22.jpg",
        "../fotos/23.jpg",
        "../fotos/24.jpg",
        "../fotos/25.jpg",
        "../fotos/26.jpg",
        "../fotos/27.jpg",
        "../fotos/28.jpg",
        "../fotos/29.jpg",
        "../fotos/30.jpg",
        "../fotos/31.jpg",
        "../fotos/32.jpg",
        "../fotos/33.jpg",
        "../fotos/34.jpg",
        "../fotos/35.jpg",
        "../fotos/36.webp",
        "../fotos/37.jpg",
        "../fotos/38.jpg",
        "../fotos/39.jpg",
        "../fotos/40.jpg",
        "../fotos/41.jpg",
        "../fotos/paginas/dbz1.jpg",
        "../fotos/paginas/dbz3.jpg",

    ];

    listImages.forEach((img, idx) => {
        const imgUrl = encodeURI(img);

        const wrapper = document.createElement('div');
        wrapper.className = 'd-steam-card-wrapper';

        const card = document.createElement('div');
        card.className = 'd-steam-card';
        card.style.backgroundImage = `url('${imgUrl}')`;

        card.addEventListener('click', async () => {
            // tenta encontrar metadados do livro na API pelo caminho da imagem
            const normalized = img.replace(/^\.\./, ''); // '../fotos/xxx' -> '/fotos/xxx'
            let pagesForReader = null;
            let bookId = `book-${idx}`;
            let bookTitle = `Livro ${idx + 1}`;

            try {
                const res = await fetch('/api/livros');
                if (res.ok) {
                    const json = await res.json();
                    const found = (json.data || []).find(b => {
                        if (!b) return false;
                        if (b.image === normalized) return true;
                        if (Array.isArray(b.images) && b.images.includes(normalized)) return true;
                        return false;
                    });
                            if (found) {
                                bookId = `book-${found.id}`;
                                bookTitle = found.title || bookTitle;
                                // tenta buscar as páginas via novo endpoint
                                try {
                                    const pagesRes = await fetch(`/api/livros/${found.id}/pages`);
                                    if (pagesRes.ok) {
                                        const pj = await pagesRes.json();
                                        if (Array.isArray(pj.data) && pj.data.length) pagesForReader = pj.data;
                                    }
                                } catch (err) {
                                    console.warn('Erro buscando páginas do livro', err);
                                }
                                // fallback para image/capas se endpoint não retornou nada
                                if (!pagesForReader) {
                                    if (Array.isArray(found.images) && found.images.length) pagesForReader = found.images;
                                    else if (found.image) pagesForReader = [found.image];
                                }
                            }
                }
            } catch (err) {
                console.warn('Erro consultando API de livros', err);
            }

            // se não encontrou páginas, usar fallback simples (imagem da capa)
            if (!pagesForReader) {
                pagesForReader = [normalized];
                alert('Páginas completas não encontradas para este livro. Abrindo imagem da capa como fallback.');
            }

            try {
                localStorage.setItem('readerPages', JSON.stringify(pagesForReader));
                localStorage.setItem('readerBookId', bookId);
                localStorage.setItem('readerTitle', bookTitle);
            } catch (err) {
                console.warn('Erro armazenando dados do leitor', err);
            }

            window.location.href = "../leitura/Leitura.html?page=1";
        });

        wrapper.appendChild(card);
        steamCards.appendChild(wrapper);
    });
})();
