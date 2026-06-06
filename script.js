// ==========================================
// CONFIGURACIÓN: ¡AQUÍ PON LA URL DE TU QR!
// ==========================================
const URL_IMAGEN_QR = "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"; // <-- CAMBIA ESTO SEÑOR

let currentScreen = 's-intro';

function nextScreen(targetId) {
    document.getElementById(currentScreen).classList.remove('active');
    document.getElementById(targetId).classList.add('active');
    currentScreen = targetId;
}

function wrongChoice(message, returnScreenId) {
    // Evita que el usuario salte inspeccionando el HTML
    document.getElementById('error-msg').innerText = message;
    document.getElementById('error-overlay').classList.add('show');
}

function closeError() {
    document.getElementById('error-overlay').classList.remove('show');
}

function triggerSuccess() {
    nextScreen('s-success');
    
    // Inyectar el QR dinámicamente para que no lo espíen en el código fuente
    const container = document.getElementById('qr-container');
    if (container.innerHTML === "") {
        const img = document.createElement('img');
        img.src = URL_IMAGEN_QR;
        img.alt = "Llave de Steam";
        container.appendChild(img);
    }

    // Animación de aparición del trofeo con retraso épico
    setTimeout(() => {
        document.getElementById('trophy-popup').classList.add('show');
    }, 1500);
}

function showKit() {
    // Esconder trofeo y pasar a la mochila de roles
    document.getElementById('trophy-popup').classList.remove('show');
    nextScreen('s-kit');
}
