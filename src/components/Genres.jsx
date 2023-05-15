import { Chip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

const Genres = ({selectedGenres , setSelectedGenres , genres , setGenres , setpage, type}) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres , genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setpage(1);
    };

    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
        setGenres([...genres , genre]);
        setpage(1);
    };

    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=309751160a05754a9b69ce8170735f5c&language=en-US`)

        setGenres(data.genres);
    }


    console.log(genres)

    useEffect(() => {
        fetchGenres();
        // return () => {
        //     setGenres({});
        // };
    },[])

  return (
    <div style={{padding : "1rem 0"}}>
        {selectedGenres && selectedGenres.map((genre) => (
            <Chip label={genre.name} style={{margin : 3  }} color="success" background = "white" size="small" key={genre.id} clickable onDelete={() => handleRemove(genre)} />
        ))}
        {genres && genres.map((genre) => (
            <Chip label={genre.name} style={{margin : 3 }} color="primary" size="small" key={genre.id} clickable onClick={() => handleAdd(genre)}/>
        ))}
    </div>
  )
}

export default Genres
