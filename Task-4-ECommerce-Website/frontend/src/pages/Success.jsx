import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function Success() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    // Tell backend to create order and reduce stock
    const verifyPayment = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/payment/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ session_id: sessionId })
        });

        if (res.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (status === 'verifying') return <div className="page"><h1>Verifying payment...</h1><p>Please wait.</p></div>;
  if (status === 'error') return <div className="page"><h1>Payment Failed</h1><p>Something went wrong.</p></div>;

  return (
    <div className="page" style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ color: 'green' }}>Payment Successful! 🎉</h1>
      <p>Your order has been placed and inventory has been updated.</p>
      <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>
        Continue Shopping
      </Link>
    </div>
  );
}