import React from 'react';
import TestimonialsStats from '../../../Components/Home/TestimonialsStats';
import HowITWorks from '../../../Components/Home/HowitWorks';
import FAQ from '../../../Components/Home/FAQ';
import ContactCTA from '../../../Components/Home/ContactCTA';
import About from '../../../Components/Home/About';
import Package from '../../DashBoardPages/HR/Package';

const Home = () => {
    return (
        <div>
            <TestimonialsStats></TestimonialsStats>
            <About></About>
            <Package></Package>
            <HowITWorks></HowITWorks>
            <FAQ></FAQ>
            <ContactCTA />
        </div>
    );
};

export default Home;