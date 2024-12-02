// checkout.js
document.getElementById('checkout-button').addEventListener('click', async () => {
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
    });
  
    const session = await response.json();
    if (session.url) {
      window.location.href = session.url;
    } else {
      alert('Error al crear la sesión de pago');
    }
  });