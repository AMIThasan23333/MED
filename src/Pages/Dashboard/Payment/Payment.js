import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {


    const booking = useLoaderData()

    console.log(booking)

    const {treatment, appointmentDate,slot} = booking;



    return (
        <div>
            <h1 className='text-3xl'> Payment for  {treatment} </h1>
            <p className=''> Please pay  {booking.price} for your appointment on {appointmentDate} at {slot}</p>
        </div>
    );
};

export default Payment;