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
      <div className='modal-overlay'>
         <div className='modal-background' />
         <div className='modal-container'>
            <div className='modal-content'>
               <div className='modal-header'>
                  <img
                     src={`https://image.tmdb.org/t/p/w500${streamDetails.poster_path}`}
                     alt={streamDetails.title}
                     className='poster-image'
                  />
                  <div className='header-details'>
                     <div className='title-section'>
                        <span className='stream-title'>{streamDetails.title}</span>
                        <button
                           className='close-button'
                           onClick={() => exitModal(null)}
                        >
                           <XIcon />
                        </button>
                     </div>
                     <div className='metadata'>
                        <span>{streamDetails.release_date}</span>
                        <span>{streamDetails.runtime}</span>
                        <span>{streamDetails.certification}</span>
                     </div>
                     <div className='genres'>
                        {streamDetails.genres.map((genre, index) => (
                           <span key={index}>{genre}</span>
                        ))}
                     </div>
                     <div className='ratings'>
                        <div className='rating-item'>
                           <StarIcon />
                           <span>{streamDetails.vote_average}</span>
                        </div>
                        <div className='rating-item'>
                           <StarOutline />
                           <span>0</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className='modal-description'>
                  <p>{streamDetails.overview}</p>
                  {streamType === "movie" && (
                     <div className='director-info'>
                        <span className='director-label'>Director</span>
                        <a
                           href={`https://www.google.com/search?q=${streamDetails.director}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className='director-link'
                        >
                           {streamDetails.director}
                        </a>
                     </div>
                  )}
                  <div className='cast-info'>
                     <span className='cast-label'>{streamType === "movie" ? "Stars" : "Casts"}</span>
                     {streamDetails.actors.map((actor, index) => (
                        <span key={index} className='cast-list'>{actor}</span>
                     ))}
                  </div>
                  <div className='action-buttons'>
                     <a
                        href={streamDetails.trailer === null ? '#' : `${streamDetails.trailer}`}
                        target={streamDetails.trailer === null ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        onClick={streamDetails.trailer === null ? (e) => e.preventDefault() : null}
                        className={`trailer-button ${streamDetails.trailer === null ? 'disabled' : ''}`}
                     >
                        <PlayIcon />
                        <span className='font-bold'>Trailer</span>
                     </a>
                     <button className='watchlist-button'>
                        <PlusIcon />
                        <span className='watchlist-text'>Watchlist</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DetailModal
