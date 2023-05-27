import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.scss';
import {img_500 , unavailable ,unavailableLandscape} from "../config/Config";
import dayjs from 'dayjs';
import { Button } from '@mui/base';
import YouTubePlayer from 'react-player/youtube';
import Slider from "../slider/Slider";

function Details() {

  const { media_type, id } = useParams();
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const fetchData = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=309751160a05754a9b69ce8170735f5c&language=en-US`);

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=309751160a05754a9b69ce8170735f5c&language=en-US`);

    console.log(data);
    const arry = data.results;
    setVideo(arry[arry.length - 1]?.key);
  };

  console.log(content);
  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <div className='details'>
        {content && (
          <div className='poster'>
            <img className="poster_portrait" alt={content.name || content.title} src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} />
            <img className='poster-landscape' alt={content.name || content.title} src={content.backdrop_path?`${img_500}/${content.backdrop_path}` : unavailableLandscape} />
            <div className="content_about">
              <span className='content_title'>
                {content.name || content.title} (
                {(
                  content.first_air_date || dayjs(content.release_date).format("MMM D, YYYY") || "_ _ _ _"
                )}
                )
              </span>
              <div className="tagline">{content.tagline}</div>
              <div className='overview'>
                {content.overview}
              </div>
              <br></br>
              <span className='rating'>
                {parseFloat(content.vote_average).toFixed(1)}
                <Button variant="contained" starticon={<YouTubePlayer />} target="blank" href={`https://www.youtube.com/watch?v=${video}`}>Watch The Tralier</Button>
              </span>
              <Slider media_type={media_type} id={id}/>
            </div>
          </div>
        )}
    </div>
  );
}

export default Details ;