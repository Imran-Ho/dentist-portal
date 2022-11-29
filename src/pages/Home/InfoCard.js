import React from 'react';

const InfoCard = ({card}) => {
    const {name, description, icon, bgClass} = card;
    return (
        <div>
            <div className={`text-white card md:card-side shadow-xl ${bgClass}`}>
                <figure><img className='p-3' src={icon} alt="icon" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;