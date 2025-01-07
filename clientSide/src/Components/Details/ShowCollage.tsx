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
         <div className='flex flex-col gap-[0.5rem] w-[37.125rem] h-[45.25rem] font-roboto text-[0.75rem] font-bold'>
            <iframe
               className='rounded-[10px]'
               width="594"
               height="334"
               src={data.official_trailer || 'https://craftypixels.com/placeholder-image/594x334/999799/31317d'}
               title="YouTube video player"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               referrerPolicy="strict-origin-when-cross-origin"
               allowFullScreen
            />
            <div className='flex gap-[0.5rem]'>
               <img
                  className='w-[13.4375rem] h-[23.625rem] object-cover rounded-[10px]'
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.name}
                  onError={(e) => {
                     e.target.onerror = () => { // Second fallback for the placeholder
                        e.target.src = 'https://craftypixels.com/placeholder-image/215x378/999799/31317d';
                     };
                     e.target.src = `${LOCALHOST}/images/${data.poster_path}`; // First fallback to your backend image
                  }}
               />
               <div className='flex flex-col gap-[0.5rem]'>
                  <div className='flex gap-[0.5rem]'>
                     <NavLink
                        to={'images/posters'}
                        className={`w-[11.3125rem] h-[11.5625rem] flex justify-center items-center rounded-[10px] overflow-hidden relative group hover:outline-dotted ${data.poster ? 'cursor-pointer' : 'cursor-default pointer-events-none'}`}
                     >
                        <img
                           className='w-full h-full absolute object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110'
                           src={`https://image.tmdb.org/t/p/w500${data.poster}`}
                           alt={data.name}
                           onError={(e) => {
                              e.target.onerror = () => { // Second fallback for the placeholder
                                 e.target.src = 'https://craftypixels.com/placeholder-image/181x185/999799/31317d';
                              };
                              e.target.src = `${LOCALHOST}/images/${data.poster}`; // First fallback to your backend image
                           }}
                        />
                        <div className="absolute z-[2] inset-0 bg-black opacity-70 group-hover:opacity-60 group-active:opacity-40" />
                        <div className='flex flex-col items-center gap-[0.4375rem] relative z-[3]'>
                           <PosterIcon />
                           <span>{data.poster_count}</span>
                        </div>
                     </NavLink>
                     <NavLink
                        to={'videos'}
                        className={`w-[11.3125rem] h-[11.5625rem] flex justify-center items-center rounded-[10px] overflow-hidden relative group hover:outline-dotted ${data.video ? 'cursor-pointer' : 'cursor-default pointer-events-none'}`}
                     >
                        <img
                           className='w-full h-full absolute object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110'
                           src={data.video || `https://craftypixels.com/placeholder-image/181x185/999799/31317d`}
                           alt={`${data.name} Videos`}
                        />
                        <div className="absolute z-[2] inset-0 bg-black opacity-70 group-hover:opacity-60 group-active:opacity-40" />
                        <div className='flex flex-col items-center gap-[0.4375rem] relative z-[3]'>
                           <VideoIcon />
                           <span>{data.video_count}</span>
                        </div>
                     </NavLink>
                  </div>
                  <NavLink
                     to={'images/backdrops'}
                     className={`w-[23.125rem] h-[11.5625rem] flex justify-center items-center rounded-[10px] overflow-hidden relative group hover:outline-dotted ${data.backdrop ? 'cursor-pointer' : 'cursor-default pointer-events-none'}`}
                  >
                     <img
                        className='w-full h-full absolute object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110'
                        src={`https://image.tmdb.org/t/p/w500${data.backdrop}`}
                        alt={data.name}
                        onError={(e) => {
                           e.target.onerror = () => { // Second fallback for the placeholder
                              e.target.src = 'https://craftypixels.com/placeholder-image/370x185/999799/31317d';
                           };
                           e.target.src = `${LOCALHOST}/images/${data.backdrop}`; // First fallback to your backend image
                        }}
                     />
                     <div className="absolute z-[2] inset-0 bg-black opacity-70 group-hover:opacity-60 group-active:opacity-40" />
                     <div className='flex flex-col items-center gap-[0.4375rem] relative z-[3]'>
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
