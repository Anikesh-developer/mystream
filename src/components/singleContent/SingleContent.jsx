import React from 'react';
import './style.scss';
import { img_300, unavailable } from '../../pages/config/Config';
import { Badge } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { Details } from '../../pages';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const SingleContent = ({id , poster , title , date , media_type , vote}) => {

    const navigate = useNavigate();

    return (
        <div className='media' onClick={(() => navigate(`/${media_type}/${id}`))}>
            <Badge badgeContent={vote} color={vote > 7 ? "primary" : "secondary"}/>
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title}></img>
            <b className='title'> {title} </b>
            <span className='subtitle'>
                {media_type === "tv" ? "TV Series" : "Movies"}
                <span className='date'>
                    {dayjs(date).format("MMM D, YYYY")}
                </span>
            </span>
        </div>
    )
}

export default SingleContent;