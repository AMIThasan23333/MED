import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {


    const booking = useLoaderData()

    return (
        <div>
            <h1>Hello Payment {booking?.length} </h1>
        </div>
    );
};

export default Payment;