import React, { useContext, useEffect, useState } from 'react'
import XIcon from '../../../../assets/Icons/XIcon';
import StarIcon from '../../../../assets/Icons/StarIcon';
import StarOutline from '../../../../assets/Icons/StarOutline';
import PlayIcon from '../../../../assets/Icons/PlayIcon';
import PlusIcon from '../../../../assets/Icons/PlusIcon';
import { ContextMovies } from '../../../../pages/Lists/MovieList';
import { certificationsDetail, movieDetailModal } from '../../../../api/api';
import { ContextTvShows } from '../../../../pages/Lists/TvList';

const DetailModal = ({ id, exitModal }) => {
   const moviesContext = useContext(ContextMovies);
   const tvShowsContext = useContext(ContextTvShows);
   const context = moviesContext || tvShowsContext;
   const { streamType, filters } = context || {};
   const [streamDetails, setStreamDetails] = useState(null);

   // Convert total minutes to hh-mm format
   const formatRuntime = (minutes) => {
      if (!minutes) return 'N/A';
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}hr ${mins}min`;
   };

   // TODO: additional info in detailmodal, at the bottom only must call api issue

   useEffect(() => {
      const fetchStreamDetails = async () => {
         try {
            const streamDetailOne = await movieDetailModal(streamType, id);
            const streamDetailTwo = await certificationsDetail(streamType, id);

            const releaseYear = streamDetailOne.release_date ? streamDetailOne.release_date.split('-')[0] : streamDetailOne.first_air_date ? streamDetailOne.first_air_date.split('-')[0] : 'N/A';

            const formattedRuntime = streamDetailOne.runtime ? formatRuntime(streamDetailOne.runtime) : streamDetailOne.episode_run_time[0] ? formatRuntime(streamDetailOne.episode_run_time[0]) : 'N/A';

            const countryCode = filters.certification.certCountry;
            const countryCertifications = streamDetailTwo.results?.find(cert => cert.iso_3166_1 === countryCode) || streamDetailTwo.results?.find(cert => cert.iso_3166_1 === streamDetailOne.origin_country[0]);
            const certification = (countryCertifications?.release_dates?.[0]?.certification || countryCertifications?.release_dates?.[1]?.certification) || countryCertifications?.rating;

            console.log(streamDetailTwo.results?.find(cert => cert.iso_3166_1 === streamDetailOne.origin_country[0]))
            console.log(certification)


            // Grabs the official trailer
            const officialTrailerVideos = streamDetailOne.videos.results.filter(
               video => video.name.toLowerCase().includes('official') && video.name.toLowerCase().includes('trailer') && video.site === 'YouTube'
            );

            // If there is no official trailer, grab the first trailer
            const trailer = officialTrailerVideos.length > 0
               ? `https://www.youtube.com/watch?v=${officialTrailerVideos[0].key}`
               : streamDetailOne.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube')
                  ? `https://www.youtube.com/watch?v=${streamDetailOne.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube').key}`
                  : null
               ;

            // Grabs only the necessary information to display the movie detail
            const grabNeededDetail = {
               poster_path: streamDetailOne.poster_path,
               title: streamDetailOne.title || streamDetailOne.name,
               release_date: releaseYear,
               runtime: formattedRuntime,
               certification: certification || "N/A",
               genres: streamDetailOne.genres.map(genre => genre.name),
               vote_average: streamDetailOne.vote_average.toFixed(1),
               overview: streamDetailOne.overview,
               director: streamDetailOne.credits.crew.find(crewMember => crewMember.job === "Director")?.name || 'N/A',
               actors: streamDetailOne.credits.cast.slice(0, 3).map(actor => `${actor.name} as ${actor.character}`),
               trailer
            };

            setStreamDetails(grabNeededDetail);
         }
         catch (error) {
            console.log("Error during fetching of movie details", error)
         }
      }

      fetchStreamDetails();
   }, [streamType, id, filters.certification.certCountry])

   // console.log(movieDetails);

   if (!streamDetails) {
      return <div>Loading...</div>;
   }

   return (
      <div className='w-screen h-screen top-0 left-0 right-0 bottom-0 fixed z-[10] flex items-center justify-center '>
         <div className='w-screen h-screen top-0 left-0 right-0 bottom-0 fixed bg-[#111111] opacity-50' />
         <div className='w-[41.5rem] h-[22.5rem] bg-[#1b1b1b] z-[10] relative rounded-[10px] overflow-auto'>
            <div className='w-full h-full flex flex-col gap-[1.625rem] p-[1.5rem]'>
               <div className='flex w-full gap-[1.1875rem]'>
                  <img
                     src={`https://image.tmdb.org/t/p/w500${streamDetails.poster_path}`}
                     alt={streamDetails.title}
                     className='w-[4.5rem] h-[6.625rem] object-cover rounded-[0.625rem]'
                  />
                  <div className='w-full flex flex-col gap-[.2rem] font-roboto'>
                     <div className='flex items-center justify-between w-full'>
                        <span className='text-[1.5rem] font-bold'>{streamDetails.title}</span>
                        <button
                           className='h-[2rem] w-[2rem] bg-[#1C252F] flex items-center justify-center rounded-full'
                           onClick={() => exitModal(null)}
                        >
                           <XIcon />
                        </button>
                     </div>
                     <div className='flex gap-[1.5rem] text-[0.875rem]'>
                        <span>{streamDetails.release_date}</span>
                        <span>{streamDetails.runtime}</span>
                        <span>{streamDetails.certification}</span>
                     </div>
                     <div className='flex items-center gap-[1.5rem] text-[0.875rem]'>
                        {streamDetails.genres.map((genre, index) => {
                           return (
                              <span key={index}>{genre}</span>
                           )
                        })}
                     </div>
                     <div className='flex gap-[2.625rem] text-[1rem] font-bold'>
                        <div className='flex gap-[0.3625rem]'>
                           <StarIcon />
                           <span>{streamDetails.vote_average}</span>
                        </div>
                        <div className='flex gap-[0.3625rem]'>
                           <StarOutline />
                           <span>0</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className='flex flex-col gap-[0.8125rem] text-[0.875rem]'>
                  <p>{streamDetails.overview}</p>
                  {streamType === "movie" && (
                     <div className='flex gap-[1.0625rem]'>
                        <span className='font-bold text-[#9F9F9F]'>Director</span>
                        <a
                           href={`https://www.google.com/search?q=${streamDetails.director}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className='text-blue-500 underline hover:text-blue-700'
                        >
                           {streamDetails.director}
                        </a>
                     </div>
                  )}
                  <div className='flex gap-[1.0625rem]'>
                     <span className='font-bold text-[#9F9F9F]'>{streamType === "movie" ? "Stars" : "Casts"}</span>
                     {streamDetails.actors.map(actor => {
                        return (
                           <span className='flex-1'>{actor}</span>
                        )
                     })}
                  </div>
                  <div className='flex gap-[0.5rem] pb-[2rem]'>
                     <a
                        href={streamDetails.trailer === null ? '#' : `${streamDetails.trailer}`}
                        target={streamDetails.trailer === null ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        onClick={streamDetails.trailer === null ? (e) => e.preventDefault() : null}
                        className={`w-[18.75rem] h-[2.25rem] bg-[#1C252F] flex justify-center items-center gap-[0.553rem] rounded-full 
                     ${streamDetails.trailer === null ? 'pointer-events-none cursor-not-allowed opacity-50' : 'hover:bg-gray-700'}`}
                     >
                        <PlayIcon />
                        <span className='font-bold'>Trailer</span>
                     </a>
                     <button className='w-[18.75rem] h-[2.25rem] bg-[#1C252F] flex justify-center items-center gap-[0.553rem] rounded-full'>
                        <PlusIcon />
                        <span className='font-bold text-[#3D81E7]'>Watchlist</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DetailModal
