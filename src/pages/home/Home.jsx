import React from 'react';
import HeroBanner from './herobanner/HeroBanner';
import './style.scss';
import Trending from './trending/Trending';

const Home = () => {

  return (
    <div className='home'>
      <HeroBanner />
      <Trending />
        <div style={{height : 1000}}></div>
    </div>
  )
}

export default Home