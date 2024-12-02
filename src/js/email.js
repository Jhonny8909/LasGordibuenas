import { onUserAuthChanged } from './firebaseConfig.js';  // Importa la función de autenticación de Firebase
import emailjs from 'https://cdn.emailjs.com/dist/email.min.js';  // Importa EmailJS

// Inicializa EmailJS con tu ID de usuario
emailjs.init('TU_USER_ID');  // Reemplaza con tu ID de usuario de EmailJS

// Escuchar cambios de autenticación
onUserAuthChanged((user) => {
  if (user) {
    // Si el usuario está autenticado, obtenemos su correo
    const userEmail = user.email;
    console.log("Usuario autenticado:", userEmail);

    // Aquí es donde puedes manejar el pago con Stripe
    // Suponiendo que el pago fue exitoso, enviamos el correo de confirmación
    sendEmailConfirmation(userEmail);
  } else {
    console.log("No hay usuario autenticado.");
  }
});

// Función para enviar el correo de confirmación con EmailJS
function sendEmailConfirmation(userEmail) {
  const templateParams = {
    user_email: userEmail,
    subject: "Confirmación de pago",
    message: "¡Gracias por tu compra! Tu pago ha sido exitoso.",
  };

  // Enviar el correo utilizando EmailJS
  emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', templateParams)
    .then((response) => {
      console.log('Correo enviado exitosamente', response);
    })
    .catch((error) => {
      console.error('Error al enviar el correo', error);
    });
}
