import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch } from '../api/api';

const fetchMoviesBackdrop = async (rows) => {
   try {
      const pageNumbers = Array.from({ length: rows / 4 }, (_, i) => i + 1);

      const responses = await Promise.all(
         pageNumbers.map((page) =>
            apiFetch(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`)
         )
      );

      const allMovies = responses.flatMap(response => response.results);

      return allMovies;
   }
   catch (error) {
      console.error('Error during fetching of data', error);
      throw error;
   }
};

const marquee = (direction, speed) => ({
   initial: {
      x: direction === 'left' ? '0%' : '-100%',
   },
   animate: {
      x: direction === 'left' ? '-100%' : '0%',
      transition: {
         duration: speed,
         ease: "linear",
         repeat: Infinity,
      }
   }
})


const Marquees = () => {
   const [marqueeSlides, setMarqueeSlides] = useState([]);
   const [marqueeRow, setMarqueeRow] = useState(4);

   const { data, error, isLoading } = useQuery({
      queryKey: ['movieMarquees', marqueeRow],
      queryFn: () => fetchMoviesBackdrop(marqueeRow),
   });

   useEffect(() => {
      if (data) {
         setMarqueeSlides(data);
      }
   }, [data]);

   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error fetching data: {error.message}</div>;

   return (
      <section className="w-full flex flex-col absolute overflow-hidden">
         {Array.from({ length: marqueeRow }).map((_, index) => {
            const movieCardPerRow = 5;
            const direction = index % 2 === 0 ? 'left' : 'right';
            const speed = 20 + (index % 2) * 5;

            const startIndex = index * movieCardPerRow;
            const endIndex = startIndex + movieCardPerRow;
            const moviesForRow = marqueeSlides.slice(startIndex, endIndex);

            return (
               <div key={index} className="flex gap-[0.6875rem] mt-[0.6875rem]">
                  <motion.div
                     className="flex"
                     initial="initial"
                     animate="animate"
                     variants={marquee(direction, speed)}
                  >
                     <div className="flex gap-[0.6875rem]">
                        {moviesForRow.map((movie, movieIndex) => (
                           <div key={movieIndex} className="flex">
                              <img
                                 src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                 alt={movie.title || "Movie Title"}
                                 className="min-w-[22.25rem] h-[12.0625rem] object-cover"
                              />
                           </div>
                        ))}
                     </div>
                  </motion.div>

                  <motion.div
                     className="flex"
                     initial="initial"
                     animate="animate"
                     variants={marquee(direction, speed)}
                  >
                     <div className="flex gap-[0.6875rem]">
                        {moviesForRow.map((movie, movieIndex) => (
                           <div key={movieIndex} className="flex">
                              <img
                                 src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                 alt={movie.title || "Movie Title"}
                                 className="min-w-[22.25rem] h-[12.0625rem] object-cover"
                              />
                           </div>
                        ))}
                     </div>
                  </motion.div>
               </div>

            );
         })}
         <div
            className={`fixed inset-0 bg-black opacity-75 backdrop-blur-md z-[1] transition-opacity duration-500 ease-in-out`}
            style={{ backdropFilter: 'blur(50px)' }}
         ></div>
      </section>
   );
};

export default Marquees;
