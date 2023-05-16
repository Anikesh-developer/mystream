import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './style.scss';
import SingleContent from '../../components/singleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import useGenre from '../../hooks/useGenre';
import Genres from '../../components/Genres';

const TV = () => {

    const [page,setPage] = useState(1);
    const [numofPages ,setNumOfPages] =useState();
    const [content ,setContent] = useState([]);
    const [selectedGenres,setSelectedGenres] = useState([]);
    const [genres,setGenres] = useState([]);
    const genreforurl = useGenre(selectedGenres)

    const fetchTrending = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=309751160a05754a9b69ce8170735f5c&page=${page}&with_genres=${genreforurl}`);
    
        console.log(data)
        setContent(data.results);
        setNumOfPages(data.total_pages)
      };
    
      useEffect (() => {
          fetchTrending();
        },[page, genreforurl])

  return (
    <div className='pageTitle-1'><h1>TV Shows</h1>
    <Genres type="tv" selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres} setpage={setPage}/>
        <div className='tvshow'>
        {
          content && content.map((c) => <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type="tv" vote={c.vote_average}/>)
        }
      </div>
      <CustomPagination setpage={setPage} numofPages={numofPages} />
    </div>

  )
}

export default TV
