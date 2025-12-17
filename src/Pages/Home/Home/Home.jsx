import React from 'react';
import TestimonialsStats from '../../../Components/Home/TestimonialsStats';
import HowITWorks from '../../../Components/Home/HowitWorks';
import FAQ from '../../../Components/Home/FAQ';
import ContactCTA from '../../../Components/Home/ContactCTA';

const Home = () => {
    return (
        <div>
            <TestimonialsStats></TestimonialsStats>
            <HowITWorks></HowITWorks>
            <FAQ></FAQ>
            <ContactCTA />
        </div>
    );
};

export default Home;