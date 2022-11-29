import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import Doctor from './Doctor';
import Extra from './Extra';
import InfoCards from './InfoCards';
import Services from './Services';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <Extra></Extra>
            <Doctor></Doctor>
            <Testimonials></Testimonials>
            <Contact></Contact>
        </div>
    );
};

export default Home;