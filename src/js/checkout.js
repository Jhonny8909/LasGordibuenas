const stripe = Stripe('pk_test_51QPRtJBczHaTVR1WkhIfYXfz9UW0XngPiSiw1VV09t17Cpj0rwTkVGYCZGmGoMrsBxkNbAz7sCP1hzcLfHmpNfVG00cAIXL1jU');

const checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', async () => {
  const response = await fetch('http://localhost:8080/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ totalAmount: 5000 }), // El monto total en centavos (ej. 5000 = $50.00)
  });

  const session = await response.json(); // Obtener la URL de la sesión de pago
  const { url } = session;

  stripe.redirectToCheckout({ sessionId: url });
});