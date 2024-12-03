// Importaciones necesarias
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { auth } from "./appconfig.js";  // Archivo con la configuración de Firebase
import emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@3.10.0/dist/email.min.js";

// Inicializar EmailJS
emailjs.init("FsVYY4omexd3DyQ6k");  // Reemplaza con tu User ID de EmailJS

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

stripeButton.addEventListener("click", (event) => {
  // Verificar si el usuario está autenticado y tiene correo
  if (!userEmail) {
    console.error("No se encontró el correo del usuario.");
    return;
  }

  // Enviar el correo antes de que inicie el pago
  console.log("Botón de Stripe clicado. Enviando correo...");
  sendConfirmationEmail(userEmail);

  // Continuar con la funcionalidad del botón de Stripe (iniciar el pago)
  // Puedes agregar aquí el código que inicia el proceso de pago de Stripe si no lo tienes configurado.
});