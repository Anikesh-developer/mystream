import React from 'react';
import './style.scss';
import { img_300, unavailable } from '../../pages/config/Config';
import { Badge } from '@mui/material';

const SingleContent = ({id , poster , title , date , media_type , vote}) => {
    return (
        <div className='media'>
            <Badge badgeContent={vote} color={vote > 7 ? "primary" : "secondary"}/>
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title}></img>
            <b className='title'> {title} </b>
            <span className='subtitle'>
                {media_type === "tv" ? "TV Series" : "Movies"}
                <span className='date'>
                    {date}
                </span>
            </span>
        </div>
    )
}

export default SingleContent;