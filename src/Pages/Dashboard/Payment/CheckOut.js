import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { useEffect } from 'react';

const CheckOut = ({booking}) => {


    const [clientSecret, setClientSecret] = useState('')

    const [CardError, setCardError] = useState('')
    const stripe = useStripe();
    const {price } = booking;


    const elements = useElements();


    const handleSubmit = async(event) => {

        event.preventDefault();
        if( !stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement);


        if(card === null){
            return
        }


        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type :'card',
            card
        })
        if(error){
            console.log(error)
            setCardError(error.message);

        }

        else{
            setCardError('')
        }

    }

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
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



    return (
   <>
   
   <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
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
      <button  className='btn btn-sm mt-4 btn-primary' type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
    
    <p className='text-red-500'> {CardError}  </p>
    
    </>

    
    );
};

export default CheckOut;