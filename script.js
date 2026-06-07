// ==========================================
// CONFIGURACIÓN: QR GENERADO AUTOMÁTICAMENTE
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
    
    // Inyectar QR
    const container = document.getElementById('qr-container');
    if (container.innerHTML === "") {
        const img = document.createElement('img');
        img.src = URL_IMAGEN_QR;
        img.alt = "Recompensa Secreta";
        container.appendChild(img);
    }

    // Mostrar Trofeo
    setTimeout(() => {
        const popup = document.getElementById('trophy-popup');
        if(popup) popup.classList.add('show');
    }, 1500);
}

function showKit() {
    // DESTRUCCIÓN DEL TROFEO: Lo eliminamos del HTML por completo para que no estorbe.
    const popup = document.getElementById('trophy-popup');
    if(popup) {
        popup.remove();
    }
    
    // Generar el carrusel de tarjetas la primera vez que entramos
    generateCarousel();
    
    nextScreen('s-kit');
}

// ==========================================
// LÓGICA DEL CARRUSEL 3D HORIZONTAL DE TARJETAS
// ==========================================

// Configuración de los roles con colores individuales ultra representativos
const rolesData = [
    { name: "Programador", icon: "fa-code", color: "#00f3ff" },       // Celeste
    { name: "Game Designer", icon: "fa-gamepad", color: "#ffb703" },   // Naranja / Amarillo
    { name: "Artista", icon: "fa-palette", color: "#ff00ff" },         // Magenta
    { name: "Músico", icon: "fa-music", color: "#00ff00" },            // Verde Lima
    { name: "Marketing", icon: "fa-bullhorn", color: "#ffd700" },      // Oro
    { name: "Level Designer", icon: "fa-cubes", color: "#9d4edd" },    // Morado
    { name: "Storyteller", icon: "fa-book-open", color: "#ef233c" },   // Rojo Carmesí
    { name: "Sound Designer", icon: "fa-volume-high", color: "#4361ee" } // Azul Profundo
];

let carouselGenerated = false;
let currentRotation = 0;

function generateCarousel() {
    if(carouselGenerated) return; // Evitar generarlo dos veces
    
    const track = document.getElementById('track');
    const radius = 380; // La distancia de las tarjetas al centro de rotación
    const angleStep = 360 / rolesData.length;

    rolesData.forEach((role, index) => {
        const angle = index * angleStep;
        
        // Crear la tarjeta
        const card = document.createElement('div');
        card.className = 'role-card';
        // Inyectar el color individual como variable CSS para que el CSS la use
        card.style.setProperty('--role-color', role.color);
        // Posicionar en el círculo 3D horizontal
        card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        
        // Contenido (Ícono + Nombre)
        card.innerHTML = `
            <i class="fa-solid ${role.icon}"></i>
            <span>${role.name}</span>
        `;
        
        track.appendChild(card);
    });

    carouselGenerated = true;
}

function rotateCarousel(direction) {
    // direction: -1 para Izquierda, 1 para Derecha
    const angleStep = 360 / rolesData.length;
    currentRotation += direction * -angleStep; 
    
    const track = document.getElementById('track');
    if(track) {
        track.style.transform = `rotateY(${currentRotation}deg)`;
    }
}
