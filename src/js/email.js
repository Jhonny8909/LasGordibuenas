// Importaciones de Firebase y EmailJS
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { auth } from "./appconfig.js";
import emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@3.10.0/dist/email.min.js";

emailjs.init("FsVYY4omexd3DyQ6k"); // Configura EmailJS

let userEmail = null;

// Detectar cambios en el estado del usuario autenticado
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmail = user.email;
    console.log("Usuario autenticado:", userEmail);
  } else {
    console.log("No hay usuario autenticado.");
  }
});

// Obtener el session_id de la URL
const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get("session_id");

if (sessionId) {
  checkPaymentStatus(sessionId); // Llamar al método para verificar el pago
}

// Verificar estado del pago
async function checkPaymentStatus(sessionId) {
  try {
    const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer sk_test_51QRODrGI6fXirCLpL7ec6xZyjCQtJnKDrPtvSyndMzJoeMXBl05T6eeREmoWo17DAnzRXkJIXTxRznsaJeGGZtyH00UjzIs9nc`, // Reemplaza con tu clave secreta de Stripe
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener el estado del pago.");
    }

    const session = await response.json();

    if (session.payment_status === "paid") {
      console.log("Pago exitoso.");
      document.dispatchEvent(new Event("stripeCheckoutCompleted"));
    } else {
      console.log("El pago no fue exitoso o está pendiente.");
    }
  } catch (error) {
    console.error("Error al verificar el estado del pago:", error);
  }
}

// Enviar correo con EmailJS
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

// Detectar el evento personalizado y enviar el correo
document.addEventListener("stripeCheckoutCompleted", () => {
  if (!userEmail) {
    console.error("No se encontró el correo del usuario.");
    return;
  }

  console.log("Evento Stripe detectado. Enviando correo...");
  sendConfirmationEmail(userEmail);
});