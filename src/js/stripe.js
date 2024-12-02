const express = require('express');
const cors = require('cors'); // Importa el paquete CORS
const stripe = require('stripe')('sk_test_51QPRtJBczHaTVR1WkhIfYXfz9UW0XngPiSiw1VV09t17Cpj0rwTkVGYCZGmGoMrsBxkNbAz7sCP1hzcLfHmpNfVG00cAIXL1jU');
const app = express();

// Configuración para permitir solicitudes CORS desde cualquier origen
app.use(cors()); // Habilita CORS

// Configuración para manejar JSON
app.use(express.json());

// Endpoint para crear la sesión de pago
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { totalAmount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Gorditas de nata',
            },
            unit_amount: totalAmount, // En centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:8080/success.html',
      cancel_url: 'http://localhost:8080/cancel.html',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creando la sesión de pago');
  }
});

// Iniciar servidor en el puerto 8080
app.listen(8080, () => console.log('Servidor corriendo en http://localhost:8080'));