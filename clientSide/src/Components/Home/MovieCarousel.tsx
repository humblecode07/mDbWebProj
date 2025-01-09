import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CarouselButtons, WatchlistButton } from '../Button/Buttons';
import StarOutline from '../../assets/Icons/StarOutline';
import StarIcon from '../../assets/Icons/StarIcon';
import { NavLink } from 'react-router-dom';

const MovieCarousel = ({ section, query }) => {
   let MOVIE_API = ``;

   if (section === 0) {
      MOVIE_API = `https://api.themoviedb.org/3/trending/movie/${query}?language=en-US`
   }
   else if (section === 1) {
      MOVIE_API = `https://api.themoviedb.org/3/${query}/popular?language=en-US&page=1`
   }
   else if (section === 2) {
      MOVIE_API = 'https://api.themoviedb.org/3/movie/upcoming?language=fil-PH&page=1'
   }

   const [movieTrend, setMovieTrend] = useState([]);
   const [slideCard, setSlideCard] = useState(0);
   const cardsToShow = 6;

   useEffect(() => {
      const fetchMovieTrends = async () => {
         try {
            const response = await axios.get(MOVIE_API, {
               headers: {
                  'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`,
                  'Content-Type': 'application/json'
               }
            })

            const topResults = response.data.results.slice(0, 18)
            setMovieTrend(topResults)
         }
         catch (error) {
            console.log("Error fetching movie trend data", error)
         }
      }

      fetchMovieTrends();
   }, [MOVIE_API])

   const nextSlide = () => {
      setSlideCard(slideCard === movieTrend.length - 1 ? 0 : slideCard + 6);
   };

   const prevSlide = () => {
      setSlideCard(slideCard === 0 ? movieTrend.length - 1 : slideCard - 6);
   };

   return (
      <div className='carousel-container'>
         {slideCard !== 0 ? <CarouselButtons direction="left" slideDirection={prevSlide} /> : null}
         {movieTrend.slice(slideCard, slideCard + cardsToShow).map((data, index) => (
            <NavLink
               to={`${data.title ? 'movies' : 'tv'}/${data.id}-${(data.title || data.name).replace(/\s+/g, "-").toLowerCase()}`} 
               className='card' 
               key={index}
            >
               <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.title || data.name}
                  className='card-image'
               />
               <figcaption className='card-info'>
                  <div className='card-rating'>
                     <div className='rating-item'>
                        <StarIcon />
                        <span>{data.vote_average.toFixed(1)}</span>
                     </div>
                     <div className='rating-item'>
                        <StarOutline />
                        <span>0</span>
                     </div>
                  </div>
                  <span className='card-title'>
                     {slideCard + 1 + index}. {data.title || data.name}
                  </span>
                  <WatchlistButton />
               </figcaption>
            </NavLink>
         ))}
         {slideCard !== movieTrend.length - 6 ? <CarouselButtons direction="right" slideDirection={nextSlide} /> : null}
      </div>
   )
}

export default MovieCarousel
