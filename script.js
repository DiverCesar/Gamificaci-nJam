// ==========================================
// CONFIGURACIÓN: ¡AQUÍ PON LA URL DE TU QR!
// ==========================================
// Sube tu imagen de QR a ImgBB o Postimages y pega el link directo (.png/.jpg) aquí.
const URL_IMAGEN_QR = "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg";

let currentScreen = 's-intro';

function nextScreen(targetId) {
    document.getElementById(currentScreen).classList.remove('active');
    document.getElementById(targetId).classList.add('active');
    currentScreen = targetId;
}

function wrongChoice(message, returnScreenId) {
    // Inyecta el mensaje de error personalizado para su explicación en vivo
    document.getElementById('error-msg').innerText = message;
    document.getElementById('error-overlay').classList.add('show');
}

function closeError() {
    document.getElementById('error-overlay').classList.remove('show');
}

function triggerSuccess() {
    nextScreen('s-success');
    
    // Inyectar el QR dinámicamente para prevenir trampas en el inspector HTML
    const container = document.getElementById('qr-container');
    if (container.innerHTML === "") {
        const img = document.createElement('img');
        img.src = URL_IMAGEN_QR;
        img.alt = "Recompensa Secreta";
        container.appendChild(img);
    }

    // Retraso épico para mostrar el trofeo
    setTimeout(() => {
        document.getElementById('trophy-popup').classList.add('show');
    }, 1500);
}

function showKit() {
    // Esconder trofeo para no tapar elementos y pasar a la pantalla final
    document.getElementById('trophy-popup').classList.remove('show');
    nextScreen('s-kit');
}
