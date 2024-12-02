// netlify/functions/create-checkout-session.js
const stripe = require('stripe')('sk_test_51QPRtJBczHaTVR1WkhIfYXfz9UW0XngPiSiw1VV09t17Cpj0rwTkVGYCZGmGoMrsBxkNbAz7sCP1hzcLfHmpNfVG00cAIXL1jU');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método no permitido' }),
    };
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Producto de prueba',
            },
            unit_amount: 2000, // Precio en centavos (2000 = 20 USD)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://lasgordibuenas.netlify.app/success.html`,
      cancel_url: `https://lasgordibuenas.netlify.app/cancel.html`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};