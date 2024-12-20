import React, { useState } from 'react'
import DividerTwo from '../../Details/DividerTwo'
import { CarouselButtons, WatchlistButton } from '../../Button/Buttons';
import StarOutlineLIcon from '../../../assets/Icons/StarOutlineLIcon';
import StarIcon from '../../../assets/Icons/StarIcon';
import PlayIcon from '../../../assets/Icons/PlayIcon';

const Recommendations = ({ movieData }) => {
   const recommendations = movieData.recommendations.slice(0, 18);
   const [slideCard, setSlideCard] = useState(0);
   const cardsToShow = 6;

   const nextSlide = () => {
      setSlideCard(slideCard === recommendations.length - 1 ? 0 : slideCard + 6);
   };

   const prevSlide = () => {
      setSlideCard(slideCard === 0 ? recommendations.length - 1 : slideCard - 6);
   };

   return (
      <div className='recommendations-container'>
         <div className='recommendations-header'>
            <span className='recommendations-title'>Recommendations</span>
            <div className='recommendations-divider'>
               <DividerTwo />
            </div>
         </div>
         <div className='recommendations-content'>
            {slideCard !== 0 ? <CarouselButtons direction="left" slideDirection={prevSlide} /> : null}
            {recommendations.slice(slideCard, slideCard + cardsToShow).map((data, index) => (
               <div
                  key={index}
                  className='recommendation-card'
               >
                  <img
                     src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                     alt={data.title || data.original_title}
                     className='recommendation-card-image'
                  />
                  <figcaption className='recommendation-card-caption'>
                     <div className='card-rating'>
                        <div className='rating-item'>
                           <StarIcon />
                           <span>{data.vote_average.toFixed(1)}</span>
                        </div>
                        <div className='rating-item'>
                           <StarOutlineLIcon />
                           <span>0</span>
                        </div>
                     </div>
                     <span className='card-title'>
                        {slideCard + 1 + index}. {data.title || data.name}
                     </span>
                     <WatchlistButton />
                     <div className='trailer-button'>
                        <PlayIcon />
                        Trailer
                     </div>
                  </figcaption>
               </div>
            ))}
            {recommendations.length > 6
               ? (slideCard !== recommendations.length - 6 &&
                  <CarouselButtons direction="right" slideDirection={nextSlide} />
               )
               : null}

         </div>
      </div>
   )
}

export default Recommendations
