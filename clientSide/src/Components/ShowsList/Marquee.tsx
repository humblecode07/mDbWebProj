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
      <section className='marquee'>
         <div className='marquee__overlay' />
         <div className='marquee__title'>
            {display}<span className='highlight'>!</span>
         </div>
         <motion.div
            className='marquee__marquee'
            initial="initial"
            animate="animate"
            variants={marquee}
         >
            {marqueeSlide.map((data, index) => (
               <div className='marquee__marquee--slide' key={index}>
                  <img
                     src={`${imageURL}${data.backdrop_path || data.profile_path}`}
                     alt={data.original_title} />
               </div>
            ))}
         </motion.div>
         <motion.div
            className='marquee__marquee'
            initial="initial"
            animate="animate"
            variants={marquee}
         >
            {marqueeSlide.map((data, index) => (
               <div className='marquee__marquee--slide-bright' key={index}>
                  <img
                     src={`${imageURL}${data.backdrop_path || data.profile_path}`}
                     alt={data.original_title} />
               </div>
            ))}
         </motion.div>
      </section>
   )
}

export default Marquee;