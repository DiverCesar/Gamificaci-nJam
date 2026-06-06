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

    // Animación de aparición
    setTimeout(() => {
        const popup = document.getElementById('trophy-popup');
        popup.style.display = 'flex'; // Asegura que exista
        popup.classList.add('show');
    }, 1500);
}

function showKit() {
    // ELIMINACIÓN FORZADA DEL TROFEO PARA QUE NO ESTORBE AL SOUND DESIGNER
    const popup = document.getElementById('trophy-popup');
    popup.classList.remove('show');
    popup.style.display = 'none'; // Lo borra de la pantalla instantáneamente
    
    nextScreen('s-kit');
}
