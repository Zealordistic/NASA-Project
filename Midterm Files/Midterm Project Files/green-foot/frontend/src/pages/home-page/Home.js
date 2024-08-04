import React from 'react';
import '../../App.css';
import HeroSection from '../../components/home-page/HeroSection';
import Cards from '../../components/home-page/Cards';
import Footer from '../../components/general/Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;