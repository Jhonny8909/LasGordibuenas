// Importaciones necesarias
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { auth } from "./appconfig.js";
import emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@3.10.0/dist/email.min.js";

// Inicializar EmailJS
emailjs.init("FsVYY4omexd3DyQ6k"); // Reemplaza con tu User ID de EmailJS

let userEmail = null;

// Detectar cambios en el estado de autenticación del usuario
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmail = user.email;
    console.log("Usuario autenticado:", userEmail);
  } else {
    console.log("No hay usuario autenticado.");
  }
});

// Función para enviar el correo de confirmación
function sendConfirmationEmail(email) {
  const templateParams = {
    user_email: email,
    message: "Gracias por tu compra. Tu pedido está en proceso.",
  };

  emailjs
    .send("service_rlu8wfv", "template_ictiavv", templateParams)
    .then(
      (response) => {
        console.log("Correo enviado con éxito:", response.status, response.text);
      },
      (error) => {
        console.error("Error al enviar el correo:", error);
      }
    );
}

// Función para manejar el clic en el botón de Stripe
const stripeButton = document.querySelector("stripe-buy-button");

if (stripeButton) {
  stripeButton.addEventListener("click", (event) => {
    console.log("Botón de Stripe clicado."); // Depuración
    if (!userEmail) {
      console.error("No se encontró el correo del usuario.");
      return;
    }

    // Enviar el correo antes de iniciar el pago
    console.log("Enviando correo al usuario:", userEmail);
    sendConfirmationEmail(userEmail);
  });
} else {
  console.error("No se encontró el botón de Stripe en el DOM.");
}