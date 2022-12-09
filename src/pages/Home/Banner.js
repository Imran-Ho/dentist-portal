import React from 'react';
import chair from '../../assets/images/chair.png'

const Banner = () => {
    return (
        <div>
            <div className="hero mb-5">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className="rounded-lg shadow-2xl lg:w-1/2"  alt=''/>
                    <div>
                        <h1 className="text-5xl font-bold">A qualified and reliable Treatment center</h1>
                        <p className="py-6">Patient will experience a good and standard treatment here.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;