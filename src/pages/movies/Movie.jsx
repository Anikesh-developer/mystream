import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './style.scss';
import SingleContent from '../../components/singleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/Genres';
import useGenre from '../../hooks/useGenre';

const Movie = () => {

    const [selectedGenres,setSelectedGenres] = useState([]);
    const [genres,setGenres] = useState([]);

    const [page,setPage] = useState(1);

    const [content ,setContent] = useState([]);

    const [numofPages ,setNumOfPages] =useState();
    const genreforurl = useGenre(selectedGenres)

    const fetchTrending = async () => {
      const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=309751160a05754a9b69ce8170735f5c&page=${page}&with_genres=${genreforurl}`);
  
      console.log(data)
      setContent(data.results);
      setNumOfPages(data.total_pages)
    };
  
    useEffect (() => {
        fetchTrending();
      },[page, genreforurl])
    

  return (
    <div className='pageTitle'><h1>Movies</h1>
    <Genres type="movie" selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres} setpage={setPage}/>
      <div className='movies'>
        {
          content && content?.map((c) => <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type="movie" vote={c.vote_average}/>)
        }
      </div>
      <CustomPagination setpage={setPage} numofPages={numofPages} />
    </div>
  )
}

export default Movie