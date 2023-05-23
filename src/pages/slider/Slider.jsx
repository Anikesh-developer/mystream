import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../config/Config';
import './style.scss';

const Slider = ({media_type , id}) => {

  const [credits ,setCredits] = useState();

  const fetchCredits = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=309751160a05754a9b69ce8170735f5c&language=en-US`);

    setCredits(data.cast);
  }

  const responsive = {
    0: {
      items:4,
    },
    512: {
      items:5,
    },
    1024:{
      items:7,
    },
  }; 

  const handleDragStart = (e) => e.preventDefault();

  const items = credits?.map((c) => (
    <div className='carouselItem'>
      <img src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture} alt={c?.name} onDragStart={handleDragStart} className="carouselItem__img" />
      <b className='carouselItem__txt'>{c?.name}</b>
    </div>
  ))

  useEffect(() => {
    fetchCredits();
  },[])

  return (
    <div>
        <AliceCarousel infinite responsive={responsive} autoPlay disableButtonsControls disableDotsControls mouseTracking items={items} />
    </div>
  );
};

export default Slider ;