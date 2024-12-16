import React from 'react'
import LeftSIcon from '../../assets/Icons/LeftSIcon'
import { Link, useLocation } from 'react-router-dom'

const Section = ({ data }) => {
   const location = useLocation();
   const basePath = location.pathname.split('/').slice(0, 3).join('/');

   console.log(data);

   return (
      <div className='movie-banner'>
         <img
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            onError={(e) => e.target.src = `http://localhost:3000/images/${data.backdrop_path}`}
            className='banner-image'
            alt="Movie Poster"
         />
         <div className="overlay"></div>
         <div className='content'>
            <Link
               to={basePath}
               className='back-button'
            >
               <LeftSIcon /> Back
            </Link>
            <span className='movie-title'>{data.title} <span className='release-date'>({data.release_date})</span></span>
            <span
               className='section-title'
            >
               {data.section_title}
               <span className='highlight'>!</span>
            </span>
         </div>
      </div>
   )
}

export default Section
