import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CustomPagination from '../../../components/Pagination/CustomPagination';
import SingleContent from '../../../components/singleContent/SingleContent';
import './style.scss';

const Trending = () => {

  const [page , setPage] = useState(1);

  const [content , setContent] = useState([]);

  const fetchTrending = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=309751160a05754a9b69ce8170735f5c&page=${page}`);

    
    console.log(data)
    setContent(data.results);
  };

  useEffect (() => {
    fetchTrending();
  },[page])

  return (
    <div className='pageTitle'><span id='trend'>Trending</span>
      <div className='trending'>
        {
          content && content.map((c) => <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type={c.media_type} vote={c.vote_average}/>)
        }
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  )
}

export default Trending

