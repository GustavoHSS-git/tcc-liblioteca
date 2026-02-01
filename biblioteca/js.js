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
    ];

    listImages.forEach(img => {
        const imgUrl = encodeURI(img);

        const wrapper = document.createElement('div');
        wrapper.className = 'd-steam-card-wrapper';

        const card = document.createElement('div');
        card.className = 'd-steam-card';
        card.style.backgroundImage = `url('${imgUrl}')`;

        card.addEventListener('click', () => {
            window.location.href = "../leitura/leitura.html?page=1";
        });

        wrapper.appendChild(card);
        steamCards.appendChild(wrapper);
    });
})();
