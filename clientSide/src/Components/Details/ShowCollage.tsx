import React from 'react'
import BackdropIcon from '../../assets/Icons/BackdropIcon'
import VideoIcon from '../../assets/Icons/VideoIcon'
import PosterIcon from '../../assets/Icons/PosterIcon'
import { NavLink } from 'react-router-dom'
import { LOCALHOST } from '../../App'

const ShowCollage = ({ data }) => {
   console.log(data)
   if (data) {
      return (
         <div className='show-collage'>
            <iframe
               className='video-iframe'
               width="594"
               height="334"
               src={data.official_trailer || 'https://craftypixels.com/placeholder-image/594x334/999799/31317d'}
               title="YouTube video player"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               referrerPolicy="strict-origin-when-cross-origin"
               allowFullScreen
            />
            <div className='content'>
               <img
                  className='poster'
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.name}
                  onError={(e) => {
                     e.target.onerror = () => { // Second fallback for the placeholder
                        e.target.src = 'https://craftypixels.com/placeholder-image/215x378/999799/31317d';
                     };
                     e.target.src = `${LOCALHOST}/images/${data.poster_path}`; // First fallback to your backend image
                  }}
               />
               <div className='grid'>
                  <div className='top'>
                     <NavLink
                        to={'images/posters'}
                        className={`media-link ${data.poster ? '' : 'media-link--disabled'}`}
                     >
                        <img
                           className='media-link__image'
                           src={`https://image.tmdb.org/t/p/w500${data.poster}`}
                           alt={data.name}
                           onError={(e) => {
                              e.target.onerror = () => { // Second fallback for the placeholder
                                 e.target.src = 'https://craftypixels.com/placeholder-image/181x185/999799/31317d';
                              };
                              e.target.src = `${LOCALHOST}/images/${data.poster}`; // First fallback to your backend image
                           }}
                        />
                        <div className="media-link__overlay" />
                        <div className='media-link__icon-container'>
                           <PosterIcon />
                           <span>{data.poster_count}</span>
                        </div>
                     </NavLink>
                     <NavLink
                        to={'videos'}
                        className={`media-link ${data.video ? '' : 'media-link--disabled'}`}
                     >
                        <img
                           className='media-link__image'
                           src={data.video || `https://craftypixels.com/placeholder-image/181x185/999799/31317d`}
                           alt={`${data.name} Videos`}
                        />
                        <div className="media-link__overlay" />
                        <div className='media-link__icon-container'>
                           <VideoIcon />
                           <span>{data.video_count}</span>
                        </div>
                     </NavLink>
                  </div>
                  <NavLink
                     to={'images/backdrops'}
                     className={`backdrop-link ${data.backdrop ? '' : 'media-link--disabled'}`}
                  >
                     <img
                        className='media-link__image'
                        src={`https://image.tmdb.org/t/p/w500${data.backdrop}`}
                        alt={data.name}
                        onError={(e) => {
                           e.target.onerror = () => { // Second fallback for the placeholder
                              e.target.src = 'https://craftypixels.com/placeholder-image/370x185/999799/31317d';
                           };
                           e.target.src = `${LOCALHOST}/images/${data.backdrop}`; // First fallback to your backend image
                        }}
                     />
                     <div className="media-link__overlay" />
                     <div className='media-link__icon-container'>
                        <BackdropIcon />
                        <span>{data.backdrop_count}</span>
                     </div>
                  </NavLink>
               </div>
            </div>
         </div>
      )
   }
}

export default ShowCollage
