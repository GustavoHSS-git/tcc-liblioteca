const pages = [
    "../fotos/paginas/dbz1.jpg",
    "../fotos/paginas/3 (1).jpg",
    "../fotos/paginas/3 (2).jpg",
    "../fotos/paginas/3 (3).jpg",
    "../fotos/paginas/3 (4).jpg",
    "../fotos/paginas/3 (5).jpg"
];

let currentPage = 1;
const totalPages = pages.length;
let controlsTimeout;

// Elementos
const pageImage = document.getElementById('pageImage');
const pageSlider = document.getElementById('pageSlider');
const pageInfo = document.getElementById('pageInfo');
const bookTitle = document.getElementById('bookTitle');
const settingsPanel = document.getElementById('settingsPanel');
const readerDisplay = document.getElementById('readerDisplay');

function initReader() {
    bookTitle.textContent = 'Dragon Ball Z';
    pageSlider.max = totalPages;
    updatePage();
    resetTimer();
}

function updatePage() {
    pageImage.style.opacity = '0';
    setTimeout(() => {
        pageImage.src = pages[currentPage - 1];
        pageSlider.value = currentPage;
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
        pageImage.onload = () => pageImage.style.opacity = '1';
    }, 200);
}

function nextPage() { if (currentPage < totalPages) { currentPage++; updatePage(); } }
function prevPage() { if (currentPage > 1) { currentPage--; updatePage(); } }

// Navegação por clique na imagem (clique à direita vai pra próxima, à esquerda volta)
if (pageImage) {
    pageImage.addEventListener('click', (e) => {
        const rect = pageImage.getBoundingClientRect();
        (e.clientX - rect.left > rect.width / 2) ? nextPage() : prevPage();
    });
}

// Eventos de botões e slider
const btnNext = document.getElementById('btnNextPage');
const btnPrev = document.getElementById('btnPrevPage');
if (btnNext) btnNext.onclick = nextPage;
if (btnPrev) btnPrev.onclick = prevPage;
if (pageSlider) pageSlider.oninput = (e) => { currentPage = parseInt(e.target.value); updatePage(); };

// Interface Inteligente
function toggleUI(show) {
    const selectors = ['.page-top', '.reader-toolbar', '.reader-controls', '.reader-nav'];
    selectors.forEach(s => {
        document.querySelectorAll(s).forEach(el => {
            el.style.opacity = show ? '1' : '0';
            el.style.visibility = show ? 'visible' : 'hidden';
        });
    });
}

function resetTimer() {
    toggleUI(true);
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
        if (!settingsPanel.classList.contains('active')) toggleUI(false);
    }, 3000);
}

// Listeners de atividade
['mousemove', 'touchstart', 'keydown'].forEach(evt => 
    document.addEventListener(evt, resetTimer)
);

// Painel e Brilho
const btnSettings = document.getElementById('btnSettings');
const btnCloseSettings = document.getElementById('btnCloseSettings');
const brightnessInput = document.getElementById('brightness');
if (btnSettings) btnSettings.onclick = () => settingsPanel.classList.toggle('active');
if (btnCloseSettings) btnCloseSettings.onclick = () => settingsPanel.classList.remove('active');
if (brightnessInput) brightnessInput.oninput = (e) => { readerDisplay.style.filter = `brightness(${e.target.value}%)`; };

// Fullscreen e Voltar
const btnFullscreen = document.getElementById('btnFullscreen');
const btnBack = document.getElementById('btnBack');
if (btnFullscreen) btnFullscreen.onclick = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
};
if (btnBack) btnBack.onclick = () => window.history.back();

initReader();

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { nextPage(); resetTimer(); }
    if (e.key === 'ArrowLeft') { prevPage(); resetTimer(); }
    if (e.key === 'Escape') { if (settingsPanel.classList.contains('active')) settingsPanel.classList.remove('active'); }
});