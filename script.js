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
    // DESTRUCCIÓN ABSOLUTA DEL TROFEO DEL CÓDIGO HTML
    const popup = document.getElementById('trophy-popup');
    if(popup) {
        popup.remove(); // Esto lo borra del navegador para siempre. No puede solaparse.
    }
    
    nextScreen('s-kit');
}

// ==========================================
// LÓGICA DEL CARRUSEL 3D HORIZONTAL
// ==========================================
let currentAngle = 0;
function rotateCarousel(direction) {
    // direction: -1 para Izquierda, 1 para Derecha
    currentAngle += direction * -45; // 360 / 8 items = 45 grados por paso
    const carousel = document.getElementById('carousel-3d');
    if(carousel) {
        carousel.style.transform = `rotateY(${currentAngle}deg)`;
    }
}

// ==========================================
// MOUSE TRACKER IMPARABLE (Parallax)
// ==========================================
document.addEventListener('mousemove', (e) => {
    if (currentScreen === 's-kit') {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calculamos el desplazamiento
        const xAxis = (e.clientX - centerX) / 25; 
        const yAxis = (e.clientY - centerY) / 25; 
        
        // En lugar de pelear con transform, inyectamos variables CSS al body
        // La clase .center-mochila las lee y se mueve en tiempo real.
        document.body.style.setProperty('--px', `${xAxis}px`);
        document.body.style.setProperty('--py', `${yAxis}px`);
    }
});
