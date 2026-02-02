// Dados e interações da página de detalhes
document.addEventListener('DOMContentLoaded', async () => {
    const stars = document.querySelectorAll('.rating-stars .star');
    const result = document.getElementById('rating-result');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = star.getAttribute('data-value');
            stars.forEach(s => s.classList.remove('selected'));
            for (let i = 0; i < value; i++) stars[i].classList.add('selected');
            if (result) result.textContent = `Você avaliou com ${value} estrela${value > 1 ? 's' : ''}!`;
        });
    });

    // Buy button (comportamento simples)
    const buyBtn = document.querySelector('.btn-buy');
    if (buyBtn) buyBtn.addEventListener('click', () => alert('Adicionado ao carrinho com sucesso!'));

    // Ler id da query string
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return; // nada a fazer sem id

    try {
        const res = await fetch(`/api/livros/${id}`);
        if (!res.ok) throw new Error('Livro não encontrado');
        const json = await res.json();
        if (!json.success) throw new Error('Erro ao buscar livro');
        const book = json.data;

        // Preencher campos da página
        const titleEl = document.querySelector('.book-title');
        const authorEl = document.querySelector('.book-meta .author');
        const categoryEl = document.querySelector('.book-meta .category');
        const descEl = document.querySelector('.book-description');
        const coverImg = document.querySelector('.book-cover img');
        const priceEl = document.querySelector('.price-amount');
        const detailsList = document.querySelector('.details-list');
        const authorBio = document.querySelector('.author-bio-box p');
        const relatedGrid = document.querySelector('.related-books-grid');

        if (titleEl) titleEl.textContent = book.title || '';
        if (authorEl) authorEl.innerHTML = `por <strong>${book.author || ''}</strong>`;
        if (categoryEl) categoryEl.textContent = book.category || '';
        if (descEl) descEl.textContent = book.description || '';
        if (coverImg) coverImg.src = (book.images && book.images[0]) || book.image || '';
        if (priceEl && typeof book.price === 'number') priceEl.textContent = `R$ ${book.price.toFixed(2)}`;

        // Detalhes adicionais (autor, editora, páginas, isbn) - usa os campos se existirem
        if (detailsList) {
            const info = [];
            if (book.author) info.push(`<li><strong>Autor:</strong> ${book.author}</li>`);
            if (book.publisher) info.push(`<li><strong>Editora:</strong> ${book.publisher}</li>`);
            if (book.category) info.push(`<li><strong>Gênero:</strong> ${book.category}</li>`);
            if (book.pages) info.push(`<li><strong>Páginas:</strong> ${book.pages.length ? book.pages.length : book.pageCount || '—'}</li>`);
            if (book.isbn) info.push(`<li><strong>ISBN:</strong> ${book.isbn}</li>`);
            detailsList.innerHTML = info.join('') || detailsList.innerHTML;
        }

        if (authorBio) {
            authorBio.textContent = book.authorBio && book.authorBio.trim()
                ? book.authorBio
                : `${book.author} — informações biográficas não disponíveis.`;
        }

        // Popular relacionados: buscar todos e filtrar pela mesma categoria (exclui o atual)
        if (relatedGrid) {
            try {
                const allRes = await fetch('/api/livros');
                const allJson = await allRes.json();
                const allBooks = allJson.success ? allJson.data : [];
                const related = allBooks.filter(b => b.id !== book.id && (b.category === book.category || b.author === book.author)).slice(0, 6);

                if (related.length) {
                    relatedGrid.innerHTML = related.map(b => `
                        <div class="related-book-card" onclick="location.href='/dadoslivros/?id=${b.id}'">
                            <img src="${b.image}" alt="${b.title}">
                            <h4>${b.title}</h4>
                            <p class="author-small">${b.author}</p>
                            <span class="price-small">R$ ${b.price.toFixed(2)}</span>
                        </div>
                    `).join('');
                }
            } catch (err) {
                console.warn('Erro ao carregar livros relacionados', err);
            }
        }

    } catch (err) {
        console.error('Erro ao carregar livro:', err);
    }
});
