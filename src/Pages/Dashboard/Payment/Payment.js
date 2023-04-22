import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOut from './CheckOut';

const Payment = () => {


    const booking = useLoaderData()

    console.log(booking)

    const {treatment, appointmentDate,slot} = booking;

    const stripePromise = loadStripe('process.env.REACT_APP_pk');

    console.log(stripePromise)

    return (
        <div>
            <h1 className='text-3xl'> Payment for  {treatment} </h1>
            <p className=''> Please pay  {booking.price} for your appointment on {appointmentDate} at {slot}</p>

         <div className='w-96 my-12'>
    
    <Elements stripe={stripePromise}>

      <CheckOut/>

    </Elements>

         </div>


        </div>
    );
};

export default Payment;