// Carrossel de livros
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-items');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const cards = document.querySelectorAll('.livro-card');
    
    let currentIndex = 0;
    const cardWidth = 300 + 32; // Largura do card + gap
    const visibleCards = Math.floor((carousel.parentElement.offsetWidth - 100) / cardWidth);
    const maxIndex = Math.max(0, cards.length - visibleCards);

    function updateCarousel() {
        const translateX = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${translateX}px)`;
        
        // Atualiza estado dos botões
        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= maxIndex;

        // Atualiza visibilidade dos botões
        prevBtn.style.visibility = maxIndex > 0 ? 'visible' : 'hidden';
        nextBtn.style.visibility = maxIndex > 0 ? 'visible' : 'hidden';
    }

    function updateCarouselSize() {
        const newVisibleCards = Math.floor((carousel.parentElement.offsetWidth - 100) / cardWidth);
        const newMaxIndex = Math.max(0, cards.length - newVisibleCards);
        
        if (currentIndex > newMaxIndex) {
            currentIndex = Math.max(0, newMaxIndex);
        }
        
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Atualiza o carrossel quando a janela é redimensionada
    window.addEventListener('resize', updateCarouselSize);

    // Inicialização
    updateCarousel();
});

// Lousa Digital
document.addEventListener('DOMContentLoaded', () => {
    const lousa = document.querySelector('.lousa');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Configurar canvas
    canvas.width = lousa.offsetWidth;
    canvas.height = lousa.offsetHeight;
    canvas.style.cursor = 'crosshair';
    lousa.appendChild(canvas);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Configurar contexto
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;

    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        [lastX, lastY] = [x, y];
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
});

// Navbar fixa com efeito de scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#FFFFFF';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Animação suave ao scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 