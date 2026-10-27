const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const pool = require('../config/db');
const authMiddleware = require('../middleware/auth');

// ============================================
// POST /api/payment/create-checkout-session
// ============================================
router.post('/create-checkout-session', authMiddleware, async (req, res) => {
  try {
    // 1. Get cart items from DB
    const [cartRows] = await pool.query(
      `SELECT c.product_id, c.quantity, p.name, p.price, p.stock 
       FROM cart_items c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = ?`, 
      [req.user.id]
    );

    if (cartRows.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 2. Check if we have enough stock
    for (let item of cartRows) {
      if (item.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${item.name}` });
      }
    }

    // 3. Format items for Stripe
    const lineItems = cartRows.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    // 4. Create the Stripe Session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      client_reference_id: req.user.id, 
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cart`,
    });

    // 5. Send the URL to the frontend
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ message: err.message });
  }
});

// ============================================
// POST /api/payment/verify-payment
// ============================================
router.post('/verify-payment', authMiddleware, async (req, res) => {
  const { session_id } = req.body;
  const conn = await pool.getConnection();

  try {
    // 1. Verify with Stripe that this session was actually paid
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (session.payment_status !== 'paid') {
      conn.release();
      return res.status(400).json({ message: 'Payment not successful' });
    }

    // 2. Start transaction
    await conn.beginTransaction();

    // 3. Get cart items
    const [cartRows] = await conn.query(
      `SELECT c.product_id, c.quantity, p.price FROM cart_items c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?`,
      [req.user.id]
    );

    if (cartRows.length === 0) {
      await conn.rollback();
      conn.release();
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 4. Calculate total
    const total = cartRows.reduce((sum, r) => sum + Number(r.price) * r.quantity, 0);

    // 5. Create the order (Status set to 'paid')
    const [orderResult] = await conn.query(
      'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)',
      [req.user.id, total.toFixed(2), 'paid'] 
    );
    const orderId = orderResult.insertId;

    // 6. Create order items AND Reduce Stock
    for (let item of cartRows) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price]
      );
      
      await conn.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    // 7. Clear the cart
    await conn.query('DELETE FROM cart_items WHERE user_id = ?', [req.user.id]);

    await conn.commit();
    console.log('✅ Order placed successfully! ID:', orderId);
    res.json({ message: 'Order placed successfully', order_id: orderId });

  } catch (err) {
    await conn.rollback();
    console.error('🚨 Verify error:', err);
    res.status(500).json({ message: 'Error verifying payment' });
  } finally {
    conn.release();
  }
});

module.exports = router;