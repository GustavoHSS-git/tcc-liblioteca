// ============================================
// 📚 LEITOR DE LIVROS (READER) - FUNCIONALIDADES
// ============================================
// Script que gerencia leitura de livros: navegação de páginas, marcadores,
// configurações de leitura (fonte, brilho, tema), persistência em localStorage,
// e eventos de teclado/mouse para facilitar a navegação.

// ============================================
// 📋 ARRAY DE PÁGINAS
// ============================================
// Lista com todos os caminhos das imagens de páginas do livro.
// Cada entrada é uma página da sequência de leitura.
const pages = [
  "../fotos/paginas/dbz1.jpg",
  "../fotos/paginas/dbz2.jpg",
  "../fotos/paginas/dbz3.jpg",
  "../fotos/paginas/dbz5.jpg",
  "../fotos/paginas/dbz6.jpg",
  "../fotos/paginas/dbz7.jpg",
  "../fotos/paginas/dbz8.jpg",
  "../fotos/paginas/dbz9.jpg",
  "../fotos/paginas/dbz10.jpg",
  "../fotos/paginas/dbz11.jpg",
  "../fotos/paginas/dbz12.jpg",
  "../fotos/paginas/dbz13.jpg",
  "../fotos/paginas/dbz14.jpg",
];

// ============================================
// 💾 ESTADO DO READER
// ============================================
// Variáveis que armazenam:
// - currentPage: página atual exibida (começa em 1)
// - totalPages: número total de páginas do livro
// - bookmarks: array de números de página com marcadores (salvo em localStorage)
// - settings: configurações do leitor (fonte, brilho, tema) salvas em localStorage
let currentPage = 1;
let totalPages = pages.length;
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
let settings = JSON.parse(localStorage.getItem('readerSettings')) || {
  fontSize: 'normal',
  brightness: 100,
  theme: 'light',
  lineHeight: 1.5
};

// ============================================
// 🎯 REFERÊNCIAS DO DOM (Elementos HTML)
// ============================================
// Seletores para elementos-chave da interface (botões, imagem, sliders, etc.).
// Usados para manipular a UI em resposta a eventos do usuário.
const pageImage = document.getElementById('pageImage');
const pageSlider = document.getElementById('pageSlider');
const pageInfo = document.getElementById('pageInfo');
const bookTitle = document.getElementById('bookTitle');
const btnPrevPage = document.getElementById('btnPrevPage');
const btnNextPage = document.getElementById('btnNextPage');
const btnBack = document.getElementById('btnBack');
const btnSettings = document.getElementById('btnSettings');
const btnBookmark = document.getElementById('btnBookmark');
const btnNotes = document.getElementById('btnNotes');
const btnSearch = document.getElementById('btnSearch');
const btnMenu = document.getElementById('btnMenu');
const btnFullscreen = document.getElementById('btnFullscreen');

const settingsPanel = document.getElementById('settingsPanel');
const bookmarksPanel = document.getElementById('bookmarksPanel');
const searchPanel = document.getElementById('searchPanel');

const pageContainer = document.querySelector('.page-container');

// ============================================
// 🚀 INICIALIZAÇÃO (DOMContentLoaded)
// ============================================
// Executado quando o HTML carrega completamente.
// Configura o leitor: título, total de páginas, carrega primeira página.
document.addEventListener('DOMContentLoaded', () => {
  initReader();
  loadSettings();
});

function initReader() {
  bookTitle.textContent = 'Dragon Ball Z';
  pageSlider.max = totalPages;
  loadPage(currentPage);
  updatePageInfo();
}

// ============================================
// 📖 NAVEGAÇÃO DE PÁGINAS
// ============================================
// loadPage(pageNum): carrega uma página específica pela imagem.
// Atualiza slider, info de página e imagem exibida.
function loadPage(pageNum) {
  if (pageNum < 1 || pageNum > totalPages) return;
  
  currentPage = pageNum;
  pageImage.src = pages[pageNum - 1];
  pageSlider.value = pageNum;
  updatePageInfo();
}

function nextPage() {
  if (currentPage < totalPages) {
    loadPage(currentPage + 1);
  }
}

function prevPage() {
  if (currentPage > 1) {
    loadPage(currentPage - 1);
  }
}

function updatePageInfo() {
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
}

// ============================================
// 🖱️ EVENT LISTENERS
// ============================================

// Navegação com botões
btnNextPage.addEventListener('click', nextPage);
btnPrevPage.addEventListener('click', prevPage);

// Slider de páginas
pageSlider.addEventListener('input', (e) => {
  loadPage(parseInt(e.target.value));
});

// Voltar
btnBack.addEventListener('click', () => {
  window.location.href = '../biblioteca/bibliotecaindex.html';
});

// Teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextPage();
  if (e.key === 'ArrowLeft') prevPage();
});

// ============================================
// ⚙️ CONFIGURAÇÕES DE LEITURA
// ============================================
// Painel que permite ajustar: tamanho da fonte, brilho, tema (claro/sépia/escuro).
// Configurações são salvas em localStorage para persistir entre sessões.

btnSettings.addEventListener('click', () => {
  settingsPanel.classList.toggle('active');
  closeOtherPanels('settings');
});

document.getElementById('btnCloseSettings').addEventListener('click', () => {
  settingsPanel.classList.remove('active');
});

// Tamanho da fonte
document.getElementById('btnFontSmall').addEventListener('click', () => {
  applyFontSize('small');
});

document.getElementById('btnFontNormal').addEventListener('click', () => {
  applyFontSize('normal');
});

document.getElementById('btnFontLarge').addEventListener('click', () => {
  applyFontSize('large');
});

function applyFontSize(size) {
  document.querySelectorAll('.btn-size').forEach(btn => btn.classList.remove('btn-size-active'));
  
  if (size === 'small') {
    document.getElementById('btnFontSmall').classList.add('btn-size-active');
    pageImage.style.maxWidth = '80%';
  } else if (size === 'normal') {
    document.getElementById('btnFontNormal').classList.add('btn-size-active');
    pageImage.style.maxWidth = '100%';
  } else if (size === 'large') {
    document.getElementById('btnFontLarge').classList.add('btn-size-active');
    pageImage.style.maxWidth = '120%';
  }
  
  settings.fontSize = size;
  localStorage.setItem('readerSettings', JSON.stringify(settings));
}

// Brilho
document.getElementById('brightness').addEventListener('input', (e) => {
  const value = e.target.value;
  pageContainer.style.filter = `brightness(${value}%)`;
  settings.brightness = value;
  localStorage.setItem('readerSettings', JSON.stringify(settings));
});

// Tema
document.getElementById('btnThemeLight').addEventListener('click', () => {
  applyTheme('light');
});

document.getElementById('btnThemeSepia').addEventListener('click', () => {
  applyTheme('sepia');
});

document.getElementById('btnThemeDark').addEventListener('click', () => {
  applyTheme('dark');
});

function applyTheme(theme) {
  document.querySelectorAll('.btn-theme').forEach(btn => btn.classList.remove('active'));
  
  if (theme === 'light') {
    document.getElementById('btnThemeLight').classList.add('active');
    document.body.style.backgroundColor = '#fff';
    pageContainer.style.backgroundColor = '#fff';
  } else if (theme === 'sepia') {
    document.getElementById('btnThemeSepia').classList.add('active');
    document.body.style.backgroundColor = '#f4ecd8';
    pageContainer.style.backgroundColor = '#f4ecd8';
  } else if (theme === 'dark') {
    document.getElementById('btnThemeDark').classList.add('active');
    document.body.style.backgroundColor = '#1a1a1a';
    pageContainer.style.backgroundColor = '#1a1a1a';
  }
  
  settings.theme = theme;
  localStorage.setItem('readerSettings', JSON.stringify(settings));
}

function loadSettings() {
  applyTheme(settings.theme);
  applyFontSize(settings.fontSize);
  document.getElementById('brightness').value = settings.brightness;
  document.getElementById('lineHeight').value = settings.lineHeight;
  pageContainer.style.filter = `brightness(${settings.brightness}%)`;
}

// ============================================
// 🔖 MARCADORES
// ============================================

btnBookmark.addEventListener('click', () => {
  const bookmark = {
    page: currentPage,
    title: `Página ${currentPage}`,
    timestamp: new Date().toLocaleString()
  };
  
  const exists = bookmarks.find(b => b.page === currentPage);
  
  if (exists) {
    bookmarks = bookmarks.filter(b => b.page !== currentPage);
    btnBookmark.style.opacity = '0.5';
  } else {
    bookmarks.push(bookmark);
    btnBookmark.style.opacity = '1';
  }
  
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  updateBookmarksPanel();
  showNotification(exists ? 'Marcador removido' : 'Marcador adicionado');
});

bookmarksPanel.addEventListener('click', (e) => {
  if (e.target.classList.contains('bookmark-item')) {
    const page = parseInt(e.target.dataset.page);
    loadPage(page);
    bookmarksPanel.classList.remove('active');
  }
});

function updateBookmarksPanel() {
  const list = document.getElementById('bookmarksList');
  
  if (bookmarks.length === 0) {
    list.innerHTML = '<p class="empty-message">Nenhum marcador ainda</p>';
    return;
  }
  
  list.innerHTML = bookmarks.map(b => `
    <div class="bookmark-item" data-page="${b.page}">
      <strong>${b.title}</strong>
      <small>${b.timestamp}</small>
    </div>
  `).join('');
}

// ============================================
// 🖥️ TELA CHEIA
// ============================================

btnFullscreen.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('Erro ao entrar em tela cheia:', err);
    });
  } else {
    document.exitFullscreen();
  }
});

// ============================================
// 🛠️ FUNÇÕES AUXILIARES
// ============================================

function closeOtherPanels(openPanel) {
  if (openPanel !== 'settings') settingsPanel.classList.remove('active');
  if (openPanel !== 'bookmarks') bookmarksPanel.classList.remove('active');
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    padding: 12px 20px;
    background: var(--primary-color);
    color: white;
    border-radius: 8px;
    z-index: 9999;
    animation: slideUp 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideDown 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Adicionar animações
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideDown {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);
