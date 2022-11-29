import React from 'react';
import quote from '../../assets/icons/quote.svg'
import people1 from '../../assets/images/people1.png'
import people2 from '../../assets/images/people2.png'
import people3 from '../../assets/images/people3.png'
import Testimonial from './Testimonial';

const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            description:'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people1,
            name: 'Winson Herry',
            location: 'California'
        },
        {
            id: 2,
            description:'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people2,
            name: 'Winson Herry',
            location: 'California'
        },
        {
            id: 3,
            description:'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people3,
            name: 'Winson Herry',
            location: 'California'
        },
    ]
    return (
        <div className='mt-10'>
            <div className='flex justify-between'>
                <div>
                    <h2 className='text-primary font-bold'>Testimonial</h2>
                    <h3 className='text-3xl'>What our patients say</h3>
                </div>
                <figure>
                    <img className='w-24 lg:w-48' src={quote} alt="" />
                </figure>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    reviews.map(review => <Testimonial
                    key={review.id}
                    review={review}
                    ></Testimonial>)
                }
            </div>
            
        </div>
    );
};

export default Testimonials;