import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch } from '../../api/api';

const imageURL = 'https://image.tmdb.org/t/p/w500';

const marquee = {
   initial: {
      x: "0%"
   },
   animate: {
      x: "-100%",
      transition: {
         duration: 30,
         ease: "linear",
         repeat: Infinity,
      }
   }
}

const Marquee = ({ display }) => {
   const [marqueeSlide, setMarqueeSlide] = useState([]);

   useEffect(() => {
      const fetchMovieBackdropPoster = async () => {
         try {
            let data;

            if (display === "movies") {
               data = await apiFetch('/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc');
            }
            else if (display === "tv shows") {
               data = await apiFetch('/tv/popular?language=en-US&page=1');
            }
            else if (display === "people") {
               data = await apiFetch('/person/popular?language=en-US&page=1');
            }

            const topTen = data.results.slice(0, 5);
            setMarqueeSlide(topTen);
         }
         catch (error) {
            console.log('Error during fetching of data', error);
         }
      }

      fetchMovieBackdropPoster();
   }, [display]);

   return (
      <section className='flex w-[66.5625rem] h-[6.125rem] overflow-hidden relative border-t-[1px] border-b-[1px]'>
         <div className='absolute inset-0 z-[4]' style={{
            background: 'linear-gradient(90deg, rgba(17,17,17,1) 0%, rgba(35,29,24,0) 25%, rgba(30,25,22,0) 75%, rgba(17,17,17,1) 100%)'
         }} />
         <div className='font-robotoFlex text-[3.75rem] font-extrabold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[4]'>
            {display}<span className='text-[#FF8731]'>!</span>
         </div>
         <motion.div
            className='flex '
            initial="initial"
            animate="animate"
            variants={marquee}
         >
            {marqueeSlide.map((data, index) => {
               return (
                  <div className='h-full min-w-[22.1875rem] brightness-75' key={index}>
                     <img 
                        className='h-full w-full object-cover' 
                        src={`${imageURL}${data.backdrop_path || data.profile_path}`}
                        alt={data.original_title} />
                  </div>
               )
            })}
         </motion.div>
         <motion.div
            className='flex'
            initial="initial"
            animate="animate"
            variants={marquee}
         >
            {marqueeSlide.map((data, index) => {
               return (
                  <div className='h-full min-w-[22.1875rem] brightness-50' key={index}>
                     <img 
                        className='h-full w-full object-cover' 
                        src={`${imageURL}${data.backdrop_path || data.profile_path}`}
                        alt={data.original_title} />
                  </div>
               )
            })}
         </motion.div>
      </section>
   )
}

export default Marquee;