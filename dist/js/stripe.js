// This is your test secret API key.
const stripe = require('stripe')('pk_test_51QPRtJBczHaTVR1WkhIfYXfz9UW0XngPiSiw1VV09t17Cpj0rwTkVGYCZGmGoMrsBxkNbAz7sCP1hzcLfHmpNfVG00cAIXL1jU');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:8080';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
});

  res.redirect(303, session.url);
});

app.listen(8080, () => console.log('Running on port 8080'));