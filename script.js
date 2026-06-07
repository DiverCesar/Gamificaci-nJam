// ==========================================
// CONFIGURACIÓN: QR GENERADO AUTOMÁTICAMENTE
// ==========================================
// Esto convierte tu link de Vercel directamente en un QR funcional
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
    
    // Inyectar el QR dinámicamente
    const container = document.getElementById('qr-container');
    if (container.innerHTML === "") {
        const img = document.createElement('img');
        img.src = URL_IMAGEN_QR;
        img.alt = "Recompensa Secreta";
        container.appendChild(img);
    }

    // Animación de aparición del trofeo
    setTimeout(() => {
        const popup = document.getElementById('trophy-popup');
        popup.style.display = 'flex'; // Asegura que exista
        popup.classList.add('show');
    }, 1500);
}

function showKit() {
    // ELIMINACIÓN FORZADA DEL TROFEO PARA QUE NO ESTORBE EN EL MUNDO GALAXY
    const popup = document.getElementById('trophy-popup');
    popup.classList.remove('show');
    popup.style.display = 'none'; // Lo borra de la pantalla instantáneamente
    
    nextScreen('s-kit');
}

// ==========================================
// MOUSE TRACKER (EFECTO PARALLAX MARIO GALAXY)
// ==========================================
document.addEventListener('mousemove', (e) => {
    // Solo activamos el seguimiento si estamos en la pantalla del Kit
    if (currentScreen === 's-kit') {
        const mochila = document.getElementById('mochila-core');
        if (!mochila) return;

        // Obtenemos el centro de la pantalla actual
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calcula hacia dónde se mueve el mouse (el factor /25 hace que el movimiento sea sutil pero notable)
        const xAxis = (centerX - e.pageX) / 25;
        const yAxis = (centerY - e.pageY) / 25;
        
        // Aplica el movimiento sobre la base de estar centrado (-50%)
        mochila.style.transform = `translate(calc(-50% + ${-xAxis}px), calc(-50% + ${-yAxis}px))`;
    }
});
