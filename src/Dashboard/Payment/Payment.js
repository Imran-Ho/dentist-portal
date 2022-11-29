
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useNavigation } from 'react-day-picker';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../shared/Loading';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise)

const Payment = () => {

    const bookings = useLoaderData()
    // const navigation = useNavigation();
    const { treatmentName, price, slot, appointmentDate } = bookings;

    // if(navigation.state === "loading"){
    //     return <Loading></Loading>
    // }
    return (
        <div className='text-center w-auto my-10 border'>
            <h2 className='text-3xl py-6'>Payment for {treatmentName}</h2>
            <p>Please pay <strong>$ {price}</strong> for your appointment on {appointmentDate} at {slot}</p>
            <h2 className='text-2xl text-blue-900 mt-6'>Provide Card information below.</h2>
            <div className='w-auto mx-16 mb-12 '>
                <Elements stripe={stripePromise}>
                    <CheckoutForm bookings={bookings}/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;