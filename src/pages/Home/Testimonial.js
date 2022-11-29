import React from 'react';

const Testimonial = ({ review }) => {
    const { name, description, img, location } = review;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <p>{description}</p>
                    <div className="flex items-center ">
                        <div className="w-20 lg:w-24 rounded-full pr-8">
                            <img src={img} alt='person' />
                        </div>
                        <div>
                            <h2 className="card-title">{name}</h2>
                            <p>{location}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;