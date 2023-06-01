import React, {useEffect, useState} from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyloadimage/Img';
import Contentwrapper from '../../../components/contentwrapper/Contentwrapper';

const HeroBanner = () => {
  const navigate = useNavigate();
  const [background ,setBackground] = useState('');
  const [query , setQuery] = useState('');
  const {url} = useSelector((state) => state.home);

  const {data ,loading} = useFetch("/trending/all/week")

  // optional chaining {?} is used in below useEffect . date? ---->optinal chaining , this is used to prevent the code giving error , becuse sometimes fetching data from api takes time so untill that it should not give err0r

  useEffect (() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground (bg);
  },[data])

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0){
      navigate(`/search/${query}`)
    }
  }

  const searchOnClick = () => {
    if (query.length > 0){
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className='herobanner'>
      <div style={{height : 1000}}></div>
      {!loading && <div className='backdrop-img'>
        <Img src={background} ></Img>
      </div>}

      <div className="opacity-layer"></div>
      <Contentwrapper>
        <div className='home__content'>
          <span className='title'>Welcome.</span>
          <br></br>
          <span className='subtitle'>Stream millions of Movies and TV shows .<br></br>Explore Now</span>
          <div className='search'>
            <input type='text' placeholder='Search for a movie or Tv Show....' onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} />
            <button onClick={searchOnClick}>Search</button>
          </div>
        </div>
      </Contentwrapper>
    </div>
  )
}
export default HeroBanner