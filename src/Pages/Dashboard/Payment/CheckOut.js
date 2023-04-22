import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const CheckOut = () => {


    const stripe = useStripe();

    const elements = useElements();


    const handleSubmit = async(event) => {

        event.preventDefault();


        if( !stripe || !elements){
            return
        }
    }

  



    return (
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
    );
};

export default CheckOut;