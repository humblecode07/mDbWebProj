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
      <div className='w-full h-fit flex flex-col gap-[2rem]'>
         <div className='w-full h-[2.1875rem] flex items-center justify-between gap-[1rem]'>
            <span className='text-[1.875rem] font-bold'>Recommendations</span>
            <div className='w-[48rem]'>
               <DividerTwo />
            </div>
         </div>
         <div className='w-full h-[24.1875rem] flex gap-[1.3125rem] relative'>
            {slideCard !== 0 ? <CarouselButtons direction="left" slideDirection={prevSlide} /> : null}
            {recommendations.slice(slideCard, slideCard + cardsToShow).map((data, index) => (
               <div
                  key={index}
                  className='w-[9.9375rem] h-[24.1875rem] flex flex-col bg-[#1a1a1a] overflow-hidden rounded-[0.625rem]'
               >
                  <img
                     src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                     alt={data.title || data.original_title}
                     className='w-[9.9375rem] h-[13.1875rem] object-cover'
                  />
                  <figcaption className='flex flex-col gap-[0.7375rem] py-[0.9375rem] px-[0.625rem]'>
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
                     <div className='flex items-center justify-center bg-[#1A1A1A] gap-[.5rem] cursor-pointer'>
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
