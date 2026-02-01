// ============================================
// 📚 DADOS DOS LIVROS - Centralizados
// ============================================
const books = [
	{ 
		title: "As Relíquias da Morte", 
		author: "J.K. Rowling",
		image: "/fotos/33.jpg"
	},
	{ 
		title: "Os Dois Morrem no Final", 
		author: "Adam Silvera",
		image: "/fotos/30.jpg"
	},
	{ 
		title: "A Menina do Outro Lado", 
		author: "Nagabe",
		image: "/fotos/17.jpg"
	},
	{ 
		title: "A Canção de Aquiles", 
		author: "Madeline Miller",
		image: "/fotos/13.jpg"
	},
	{ 
		title: "Jujutsu Kaisen: Batalha de Feiticeiros", 
		author: "Gege Akutami",
		image: "/fotos/27.jpg"
	},
	{ 
		title: "O Cara Que Estou a Fim não É um Cara?!", 
		author: "Sumiko Arai",
		image: "/fotos/18.jpg"
	}
];

// ============================================
// 🎨 ELEMENTOS DO DOM
// ============================================
const carouselTrack = document.getElementById("carousel-track");
const dotsContainer = document.getElementById("dots-container");
const memberName = document.querySelector(".member-name");
const memberRole = document.querySelector(".member-role");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");

let currentIndex = 0;
let isAnimating = false;

// ============================================
// 🏗️ CRIAR CARDS DINAMICAMENTE
// ============================================
function createCards() {
	books.forEach((book, index) => {
		const card = document.createElement("div");
		card.className = "card";
		card.dataset.index = index;

		card.innerHTML = `
			<div class="card-inner">
				<div class="card-face card-front">
					<img src="${book.image}" alt="${book.title}">
				</div>
				<div class="card-face card-back">
					<h3>${book.title}</h3>
					<p>${book.author}</p>
					<button class="btn-read">Ler</button>
				</div>
			</div>
		`;

		carouselTrack.appendChild(card);
	});
}

// ============================================
// 🔘 CRIAR DOTS DINAMICAMENTE
// ============================================
function createDots() {
	books.forEach((_, index) => {
		const dot = document.createElement("div");
		dot.className = "dot";
		if (index === 0) dot.classList.add("active");
		dot.dataset.index = index;
		dotsContainer.appendChild(dot);
	});
}

// ============================================
// 🔄 ATUALIZAR CARROSSEL
// ============================================
function updateCarousel(newIndex) {
	if (isAnimating) return;
	isAnimating = true;

	currentIndex = (newIndex + books.length) % books.length;
	const cards = document.querySelectorAll(".card");

	// Atualizar posição dos cards
	cards.forEach((card, i) => {
		const offset = (i - currentIndex + books.length) % books.length;

		card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");

		if (offset === 0) card.classList.add("center");
		else if (offset === 1) card.classList.add("right-1");
		else if (offset === 2) card.classList.add("right-2");
		else if (offset === books.length - 1) card.classList.add("left-1");
		else if (offset === books.length - 2) card.classList.add("left-2");
		else card.classList.add("hidden");
	});

	// Atualizar dots
	const dots = document.querySelectorAll(".dot");
	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === currentIndex);
	});

	// Atualizar informações com fade
	memberName.style.opacity = "0";
	memberRole.style.opacity = "0";

	setTimeout(() => {
		memberName.textContent = books[currentIndex].title;
		memberRole.textContent = books[currentIndex].author;
		memberName.style.opacity = "1";
		memberRole.style.opacity = "1";
	}, 300);

	setTimeout(() => {
		isAnimating = false;
	}, 800);
}

// ============================================
// 🎯 EVENT LISTENERS
// ============================================
function attachEventListeners() {
	// Setas de navegação
	leftArrow.addEventListener("click", () => updateCarousel(currentIndex - 1));
	rightArrow.addEventListener("click", () => updateCarousel(currentIndex + 1));

	// Dots
	document.querySelectorAll(".dot").forEach((dot, i) => {
		dot.addEventListener("click", () => updateCarousel(i));
	});

	// Cards
	document.querySelectorAll(".card").forEach((card, i) => {
		card.addEventListener("click", () => updateCarousel(i));
	});

	// Teclado
	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowLeft") updateCarousel(currentIndex - 1);
		else if (e.key === "ArrowRight") updateCarousel(currentIndex + 1);
	});

	// Touch/Swipe
	let touchStartX = 0;
	document.addEventListener("touchstart", (e) => {
		touchStartX = e.changedTouches[0].screenX;
	});
	document.addEventListener("touchend", (e) => {
		const touchEndX = e.changedTouches[0].screenX;
		const diff = touchStartX - touchEndX;
		const threshold = 50;

		if (Math.abs(diff) > threshold) {
			updateCarousel(currentIndex + (diff > 0 ? 1 : -1));
		}
	});
}

// ============================================
// 🚀 INICIALIZAR
// ============================================
function init() {
	createCards();
	createDots();
	attachEventListeners();
	updateCarousel(0);
}

// Iniciar quando o DOM estiver pronto
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
