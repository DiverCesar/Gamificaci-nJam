// ==========================================
// CONFIGURACIÓN: QR
// ==========================================
const URL_IMAGEN_QR = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://dashboard-eight-rho-65.vercel.app/";

let currentScreen = 's-intro';

function nextScreen(targetId) {
    document.getElementById(currentScreen).classList.remove('active');
    document.getElementById(targetId).classList.add('active');
    currentScreen = targetId;
}

function wrongChoice(message, returnScreenId) {
    document.getElementById('error-msg').innerText = message;
    document.getElementById('error-overlay').classList.add('show');
}

function closeError() {
    document.getElementById('error-overlay').classList.remove('show');
}

function triggerSuccess() {
    nextScreen('s-success');
    
    const container = document.getElementById('qr-container');
    if (container.innerHTML === "") {
        const img = document.createElement('img');
        img.src = URL_IMAGEN_QR;
        img.alt = "Recompensa Secreta";
        container.appendChild(img);
    }

    setTimeout(() => {
        const popup = document.getElementById('trophy-popup');
        if(popup) popup.classList.add('show');
    }, 1500);
}

function showKit() {
    // DESTRUCCIÓN DEL TROFEO PARA SIEMPRE
    const popup = document.getElementById('trophy-popup');
    if(popup) popup.remove();
    
    generateCarousel();
    nextScreen('s-kit');
}

// ==========================================
// LÓGICA DE COVER FLOW (EL CARRUSEL DEFINITIVO)
// ==========================================
const rolesData = [
    { name: "Programador", icon: "fa-code", color: "#00f3ff" },
    { name: "Game Designer", icon: "fa-gamepad", color: "#ffb703" },
    { name: "Artista", icon: "fa-palette", color: "#ff00ff" },
    { name: "Músico", icon: "fa-music", color: "#00ff00" },
    { name: "Marketing", icon: "fa-bullhorn", color: "#ffd700" },
    { name: "Level Designer", icon: "fa-cubes", color: "#9d4edd" },
    { name: "Storyteller", icon: "fa-book-open", color: "#ef233c" },
    { name: "Sound Designer", icon: "fa-volume-high", color: "#4361ee" }
];

let carouselGenerated = false;
let currentIndex = 0;

function generateCarousel() {
    if(carouselGenerated) return;
    
    const track = document.getElementById('track');

    rolesData.forEach((role) => {
        const card = document.createElement('div');
        card.className = 'role-card';
        card.style.setProperty('--role-color', role.color);
        
        card.innerHTML = `
            <i class="fa-solid ${role.icon}"></i>
            <span>${role.name}</span>
        `;
        
        track.appendChild(card);
    });

    carouselGenerated = true;
    updateCarousel(); // Acomoda las cartas en su posición inicial
}

function rotateCarousel(direction) {
    // direction: -1 Izquierda, 1 Derecha
    // Avanza el índice y hace el loop si llega al final o al inicio
    currentIndex = (currentIndex + direction + rolesData.length) % rolesData.length;
    updateCarousel();
}

function updateCarousel() {
    const cards = document.querySelectorAll('.role-card');
    const total = rolesData.length;

    cards.forEach((card, index) => {
        // Calcula la distancia de esta carta al centro
        let offset = index - currentIndex;

        // Lógica de "camino más corto" para que las cartas den la vuelta sin saltos raros
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        // APLICAMOS LA MAGIA DEL COVER FLOW
        if (offset === 0) {
            // CARTA CENTRAL (ACTIVA)
            card.style.transform = `translateX(0) translateZ(50px) rotateY(0deg) scale(1.1)`;
            card.style.zIndex = 10;
            card.style.opacity = 1;
            // Efecto Neón
            card.style.boxShadow = `0 0 40px var(--role-color), inset 0 0 15px var(--role-color)`;
            card.querySelector('i').style.color = '#fff';
            card.querySelector('i').style.filter = `drop-shadow(0 0 15px #fff)`;
            card.querySelector('span').style.color = '#fff';
            card.querySelector('span').style.textShadow = `0 0 10px #fff`;

        } else if (offset === 1) {
            // CARTA DERECHA (1 PASO)
            card.style.transform = `translateX(180px) translateZ(-100px) rotateY(-30deg) scale(0.9)`;
            card.style.zIndex = 5;
            card.style.opacity = 0.6;
            // Apaga neón
            card.style.boxShadow = `none`;
            card.querySelector('i').style.color = `var(--role-color)`;
            card.querySelector('i').style.filter = `none`;
            card.querySelector('span').style.color = `rgba(255,255,255,0.6)`;
            card.querySelector('span').style.textShadow = `none`;

        } else if (offset === -1) {
            // CARTA IZQUIERDA (1 PASO)
            card.style.transform = `translateX(-180px) translateZ(-100px) rotateY(30deg) scale(0.9)`;
            card.style.zIndex = 5;
            card.style.opacity = 0.6;
            // Apaga neón
            card.style.boxShadow = `none`;
            card.querySelector('i').style.color = `var(--role-color)`;
            card.querySelector('i').style.filter = `none`;
            card.querySelector('span').style.color = `rgba(255,255,255,0.6)`;
            card.querySelector('span').style.textShadow = `none`;

        } else {
            // CARTAS ESCONDIDAS ATRÁS
            // Se van a los extremos y se hacen pequeñas para esconderse
            card.style.transform = `translateX(${Math.sign(offset) * 300}px) translateZ(-300px) scale(0.5)`;
            card.style.zIndex = 1;
            card.style.opacity = 0; // Invisibles
            card.style.boxShadow = `none`;
        }
    });
}
