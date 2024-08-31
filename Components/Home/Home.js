import React from 'react';
import Hero from './Hero';
import SaleBanner from './Sale';
import CategorySection from './Category';
import BrandSection from './Brand';
import NewArrivalsSection from './NewArrival';
import InformationSection from './Info';
import './Home.css';

const Home = () => (
    <div className='Home-Container'>
        <Hero />
        <SaleBanner />
        <CategorySection />
        <BrandSection />
        <NewArrivalsSection />
        <InformationSection />
    </div>
);

export default Home;
