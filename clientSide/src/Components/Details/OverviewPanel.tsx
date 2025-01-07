import React, { useEffect } from 'react'
import EditIcon from '../../assets/Icons/Admin/EditIcon';
import DeleteIcon from '../../assets/Icons/Admin/DeleteIcon';
import StarLIcon from '../../assets/Icons/StarLIcon';
import Divider from './Divider';
import { FacebookIcon, HomepageIcon, IMDbIcon, InstagramIcon, TwitterIcon, WikiDataIcon } from '../../assets/Icons/LinkIcons';
import { deleteMovie } from '../../api/api';
import { NavLink } from 'react-router-dom';

const OverviewPanel = ({ data, isInfoVisible, panelRef, setIsInfoVisible, filteredMovies, setFilteredMovies }) => {
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (panelRef.current && !panelRef.current.contains(event.target)) {
            setIsInfoVisible(false);
         }
      };

      if (isInfoVisible) {
         document.addEventListener('mousedown', handleClickOutside);
      } else {
         document.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [isInfoVisible, panelRef, setIsInfoVisible]);

   const getDynamicFontSize = (title) => {
      const length = title.length;
      if (length > 30) {
         return 'small';
      }
      else if (length > 20) {
         return 'medium'; e
      }
      return 'large';
   };

   const handleDeleteMovie = async (id) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this movie?");

      if (isConfirmed) {
         try {
            await deleteMovie(id);
            alert("Movie has been deleted successfully.");
            setFilteredMovies(filteredMovies.filter((movie) => movie._id !== id));
         }
         catch (error) {
            console.error("Error deleting the movie:", error);
            alert("Failed to delete the movie. Please try again.");
         }
      }
   }

   console.log(data);

   return (
      <>
         <div
            className={`fixed inset-0 bg-black ${isInfoVisible ? 'opacity-50 z-[1]' : 'opacity-0 z-[-1]'
               } transition-opacity duration-500 ease-in-out`}
         ></div>
         <div
            ref={panelRef}
            className={`w-[24.6875rem] h-full flex justify-center bg-[#111111] ${isInfoVisible
               ? 'opacity-100 z-[10] translate-x-0'
               : 'opacity-0 z-[0] translate-x-[100%]'
               } fixed top-0 right-0 transition-all duration-500 ease-in-out transform`}
         >
            <div className="w-[20.9375rem] pt-[3.25rem] pb-[2rem] flex flex-col gap-[1rem] overflow-y-auto scrollbar-none">
               <div className="w-full flex justify-between">
                  <NavLink
                     to={`${data._id}`}
                     className='cursor-pointer hover:brightness-125 transition'
                  >
                     <span className="text-[#7066FF] underline">View Full Details</span>
                  </NavLink>
                  <div className='flex gap-[1.4375rem]'>
                     <NavLink
                        to={`${data._id}/edit`}
                        className='flex items-center gap-[0.625rem] cursor-pointer hover:brightness-125 transition'
                     >
                        <EditIcon />
                        <span>Edit</span>
                     </NavLink>
                     <div
                        onClick={() => handleDeleteMovie(data._id)}
                        className="flex items-center gap-[0.625rem] text-[#FF3333] cursor-pointer hover:brightness-125 transition"
                     >
                        <DeleteIcon />
                        <span>Delete</span>
                     </div>

                  </div>
               </div>
               <iframe
                  className='rounded-[1rem] shrink-0'
                  width="335"
                  height="206"
                  src={data?.trailer || 'https://craftypixels.com/placeholder-image/335x206/999799/31317d'}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
               />
               <div className=' w-full flex flex-col gap-[1rem] items-center'>
                  <div className='flex gap-[.5rem]'>
                     {data?.genres?.length > 0 ? (
                        data.genres.map((genre, index) => {
                           return (
                              <div key={index} className='py-[0.25rem] px-[0.71875rem] flex items-center justify-center gap-[0.4375rem] bg-[#909090] text-[0.625rem] rounded-full'>
                                 <div className='w-[0.3125rem] h-[0.3125rem] bg-[#111111] rounded-full'></div>
                                 <span>{genre}</span>
                              </div>
                           )
                        })
                     ) : null}
                  </div>
                  <span className='font-bold text-center' style={{ fontSize: getDynamicFontSize(data.title) }}>{data.title}</span>
                  <div className='flex gap-[1.3125rem]'>
                     <span className='border border-white border-solid px-[5px] py-[2px]'>{data.certifications}</span>
                     <div className='flex gap-[0.3125rem] items-center'>
                        <StarLIcon />
                        <div className='flex gap-[0.1875rem]'>
                           <div className='flex flex-col leading-[1]'>
                              <span className='text-[1.25rem] font-bold'>{data.vote_average}</span>
                              <span className='text-[0.75rem] text-[#8F8F8F] font-semibold'>{data.vote_count}</span>
                           </div>
                           <span className='font-semibold text-[#8F8F8F]'>/10</span>
                        </div>
                     </div>
                     <span>
                        {data.release_date}
                     </span>
                  </div>
                  <span className='text-[0.875rem] italic text-center'>{data.tagline}</span>
                  <span className='text-[0.875rem] text-center'>{data.overview}</span>
                  <div className='w-full flex flex-col gap-[1rem]'>
                     <Divider />
                     <div className='flex gap-[1.25rem]'>
                        <span className='font-bold'>Director</span>
                        {data.director ? (
                           <a className='text-[#4397FA]'>{data.director}</a>
                        ) : (
                           <span className='text-[#ff8731]'>N/A</span>
                        )}
                     </div>
                     <Divider />
                     <div className='flex gap-[1.25rem]'>
                        <span className='font-bold'>Writers</span>
                        <div className='flex gap-[.875rem]'>
                           {data.writers && data.writers.length > 0 ? (
                              data.writers.map((writer, index) => (
                                 <>
                                    <span key={index} className='flex items-center'>
                                       <a className='text-[#4397FA]'>{writer}</a>
                                    </span>
                                    {index < data.writers.length - 1 && <span> • </span>}
                                 </>
                              ))
                           ) : (
                              <span className='text-[#ff8731]'>N/A</span>
                           )}
                        </div>
                     </div>
                     <Divider />
                     <div className='flex flex-col gap-[0.9375rem]'>
                        <div className='flex gap-[1.4375rem]'>
                           <span className='font-bold'>Stars</span>
                           <div className='flex flex-wrap gap-[.875rem]'>
                              {data.stars && data.stars.length > 0
                                 ? data.stars.map((star, index) => (
                                    <>
                                       <span key={index} className='flex items-center'>
                                          <a className='text-[#4397FA] text-wrap'>{star}</a>
                                       </span>
                                       {index < data.stars.length - 1 && <span> • </span>}
                                    </>
                                 ))
                                 : <span className='text-[#ff8731]'>N/A</span>
                              }
                           </div>
                        </div>
                     </div>
                     <Divider />
                     <div className='flex gap-[1.4375rem]'>
                        <span className='font-bold'>Status</span>
                        <span className='text-[#12AD18]'>{data.status}</span>
                     </div>
                     <Divider />
                     <div className='flex gap-[1.4375rem] items-center'>
                        <span className='font-bold'>Links</span>
                        <div className='flex gap-[1rem] items-center'>
                           {data.facebook_id || data.twitter_id || data.instagram_id || data.wikidata || data.imdb_id || data.homepage ? (
                              <>
                                 {data.facebook_id && (
                                    <a href={`https://www.facebook.com/${data.facebook_id}`} target="_blank" rel="noopener noreferrer">
                                       <FacebookIcon />
                                    </a>
                                 )}
                                 {data.twitter_id && (
                                    <a href={`https://twitter.com/${data.twitter_id}`} target="_blank" rel="noopener noreferrer">
                                       <TwitterIcon />
                                    </a>
                                 )}
                                 {data.instagram_id && (
                                    <a href={`https://www.instagram.com/${data.instagram_id}`} target="_blank" rel="noopener noreferrer">
                                       <InstagramIcon />
                                    </a>
                                 )}
                                 {data.wikidata && (
                                    <a href={`https://www.wikidata.org/wiki/${data.wikidata}`} target="_blank" rel="noopener noreferrer">
                                       <WikiDataIcon />
                                    </a>
                                 )}
                                 {data.imdb_id && (
                                    <a href={`https://www.imdb.com/title/${data.imdb_id}`} target="_blank" rel="noopener noreferrer">
                                       <IMDbIcon />
                                    </a>
                                 )}
                                 {data.homepage && (
                                    <a href={data.homepage} target="_blank" rel="noopener noreferrer">
                                       <HomepageIcon />
                                    </a>
                                 )}
                              </>
                           ) : (
                              <span className='text-[#ff8731]'>N/A</span>
                           )}
                        </div>
                     </div>
                     <Divider />
                     <div className='flex gap-[1.25rem]'>
                        <span className='font-bold'>Runtime</span>
                        {data.runtime ? (
                           <span>{data.runtime}</span>
                        ) : <span className='text-[#ff8731]'>N/A</span>}
                     </div>
                     <Divider />
                     <div className='flex gap-[1.4375rem]'>
                        <span className='font-bold'>Budget</span>
                        {data.budget !== "$0.00"
                           ? <span>{data.budget}</span>
                           : <span className='text-[#ff8731]'>N/A</span>
                        }
                     </div>
                     <Divider />
                     <div className='flex gap-[1.4375rem]'>
                        <span className='font-bold'>Revenue</span>
                        {data.revenue !== "$0.00"
                           ? <span>{data.revenue}</span>
                           : <span className='text-[#ff8731]'>N/A</span>
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default OverviewPanel
