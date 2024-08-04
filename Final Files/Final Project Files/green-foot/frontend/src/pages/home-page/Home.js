import React, {useEffect} from 'react';
import '../../App.css';
import HeroSection from '../../components/home-page/HeroSection';
import Cards from '../../components/home-page/Cards';
import Footer from '../../components/general/Footer';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'

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