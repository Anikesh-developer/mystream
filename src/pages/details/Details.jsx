import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.scss';
import {img_500 , unavailable ,unavailableLandscape} from "../config/Config";

const Details = () => {

  const {media_type , id} = useParams();
  const [content ,setContent] = useState();
  const [video, setVideo] = useState();

  const fetchData =async () => {
    const { data} =await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=309751160a05754a9b69ce8170735f5c&language=en-US`);

    setContent(data);
  };

  const fetchVideo = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=309751160a05754a9b69ce8170735f5c&language=en-US`);

    console.log(data)
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  },[])

  return (
    <div className='details'>
      {content && (      
        <div className='poster'>
          {/* <img alt={content.name || content.title} src={content.poster_path?`${img_500}/${content.poster_path}` : unavailable} /> */}

          <img className='poster-landscape' alt={content.name || content.title} src={content.backdrop_path?`${img_500}/${content.backdrop_path}` : unavailableLandscape} />

          <div className="content_about">
            <span className='content_title'>
              {content.name || content.title} (
                {(
                  content.first_air_date || content.release_date || "_ _ _ _"
                ).substring(0,4)}
              )
            </span>
            
          </div>
        </div>
      )}
    </div>
  )
}

export default Details
