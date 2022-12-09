import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({bookings}) => {
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [cardProcessing, setCardProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const {price, patientName, email, _id} = bookings;

// bring api from server side for payment method
useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://doctor-site-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem('accessToken')}`
    },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

    const handleSubmit = async(event) =>{
        event.preventDefault();

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
          return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
      
          if (error) {
            console.log('[error]', error);
            setCardError(error.message)
          }
          else{
            setCardError('')
          }
          setSuccess('')
          


// confirm payment code
          const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: patientName,
                  email: email
                },
              },
            },
          );

          if(confirmError){
            setCardError(confirmError.message);
            return;
          }
          if(paymentIntent.status === "succeeded"){
            console.log('card info', card)
            // store payment info in the database
            const payment ={
                price,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            }

            fetch('https://doctor-site-server.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.insertedId){
                    setSuccess('your payment successfully submitted')
                    setTransactionId(paymentIntent.id)
                }
            })
          }
          setCardProcessing(true)
    }
    return (
        <div className='border bg-slate-200 rounded-lg p-5 '>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button 
                className='btn btn-sm btn-primary mt-6' 
                type="submit" 
                disabled={!stripe || !clientSecret || cardProcessing}>
                    Pay
                </button>
            </form>
            <div>
                <p className="text-red-600">{cardError}</p>
               {
                success && <div>
                        <p className="text-green-500">{success}</p>
                        <p className="text-blue-400">Your transaction Id is {transactionId}</p>
                </div>
               }
            </div>
        </div>
    );
};

export default CheckoutForm;