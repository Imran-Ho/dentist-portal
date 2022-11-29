import React from 'react';
import clock from '../../assets/icons/clock.svg';
import marker from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = () => {

    const info = [{
        id: 1,
        name: 'Opening Hours',
        description: 'from 9:30 am to 5:30pm',
        icon: clock,
        bgClass: 'bg-gradient-to-r from-primary to-secondary'
    },
        {
        id: 2,
        name: 'Visit our location',
        description: 'Brooklyn, United States',
        icon: marker,
        bgClass: 'bg-accent'
    },
        {
        id: 3,
        name: 'Contact us now',
        description: '+000 123 456789',
        icon: phone,
        bgClass: 'bg-gradient-to-r from-primary to-secondary'
    },]
    return (
        <div className='grid mt-8 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                info.map(card => <InfoCard
                key={card.id}
                card={card}
                ></InfoCard>)
            }
        </div>
    );
};

export default InfoCards;