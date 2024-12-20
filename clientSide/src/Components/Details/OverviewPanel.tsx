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
            className={`overlay ${isInfoVisible ? 'visible' : 'hidden'}`}
         ></div>
         <div
            ref={panelRef}
            className={`info-panel ${isInfoVisible ? 'visible' : 'hidden'}`}
         >
            <div className="content-panel scrollbar-none">
               <div className="action-panel">
                  <NavLink to={`${data._id}`} className="view-details">
                     <span>View Full Details</span>
                  </NavLink>
                  <div className="action-links">
                     <NavLink to={`${data._id}/edit`} className="edit-link">
                        <EditIcon />
                        <span>Edit</span>
                     </NavLink>
                     <div
                        onClick={() => handleDeleteMovie(data._id)}
                        className="delete-link"
                     >
                        <DeleteIcon />
                        <span>Delete</span>
                     </div>
                  </div>
               </div>
               <iframe
                  className="video-player"
                  width="335"
                  height="206"
                  src={data?.trailer || 'https://craftypixels.com/placeholder-image/335x206/999799/31317d'}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
               />
               <div className='full-container'>
                  <div className="genre-container">
                     {data?.genres?.length > 0 ? (
                        data.genres.map((genre, index) => (
                           <div key={index} className="genre">
                              <div className="dot"></div>
                              <span>{genre}</span>
                           </div>
                        ))
                     ) : null}
                  </div>
                  <span
                     className={`title ${getDynamicFontSize(data.title)}`}
                  >
                     {data.title}
                  </span>
                  <div className='certifications-wrapper'>
                     <span className='certifications'>{data.certifications}</span>
                     <div className='rating-wrapper'>
                        <StarLIcon className='star-icon' />
                        <div className='rating-details'>
                           <div className='flex flex-col leading-[1]'>
                              <span className='rating-value'>{data.vote_average}</span>
                              <span className='vote-count'>{data.vote_count}</span>
                           </div>
                           <span className='rating-out-of'>/10</span>
                        </div>
                     </div>
                     <span className='release-date'>{data.release_date}</span>
                  </div>
                  <span className='tagline'>{data.tagline}</span>
                  <span className='overview'>{data.overview}</span>
                  <div className='details-container'>
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
                     <div className='writers-container'>
                        <span className='label'>Writers</span>
                        <div className='writers-list'>
                           {data.writers && data.writers.length > 0 ? (
                              data.writers.map((writer, index) => (
                                 <>
                                    <span key={index} className='writer-item'>
                                       <a className='writer-link'>{writer}</a>
                                    </span>
                                    {index < data.writers.length - 1 && <span> • </span>}
                                 </>
                              ))
                           ) : (
                              <span className='no-writers'>N/A</span>
                           )}
                        </div>
                     </div>
                     <Divider />
                     <div className='stars-container'>
                        <div className='stars-header'>
                           <span className='label'>Stars</span>
                           <div className='stars-list'>
                              {data.stars && data.stars.length > 0
                                 ? data.stars.map((star, index) => (
                                    <>
                                       <span key={index} className='star-item'>
                                          <a className='star-link'>{star}</a>
                                       </span>
                                       {index < data.stars.length - 1 && <span> • </span>}
                                    </>
                                 ))
                                 : <span className='no-stars'>N/A</span>
                              }
                           </div>
                        </div>
                     </div>
                     <Divider />
                     <div className='status-container'>
                        <span className='status-label'>Status</span>
                        <span className='status-text'>{data.status}</span>
                     </div>
                     <Divider />
                     <div className='links-container'>
                        <span className='label'>Links</span>
                        <div className='links-list'>
                           {data.facebook_id || data.twitter_id || data.instagram_id || data.wikidata || data.imdb_id || data.homepage ? (
                              <>
                                 {data.facebook_id && (
                                    <a href={`https://www.facebook.com/${data.facebook_id}`} target="_blank" rel="noopener noreferrer" className='link-item'>
                                       <FacebookIcon />
                                    </a>
                                 )}
                                 {data.twitter_id && (
                                    <a href={`https://twitter.com/${data.twitter_id}`} target="_blank" rel="noopener noreferrer" className='link-item'>
                                       <TwitterIcon />
                                    </a>
                                 )}
                                 {data.instagram_id && (
                                    <a href={`https://www.instagram.com/${data.instagram_id}`} target="_blank" rel="noopener noreferrer" className='link-item'>
                                       <InstagramIcon />
                                    </a>
                                 )}
                                 {data.wikidata && (
                                    <a href={`https://www.wikidata.org/wiki/${data.wikidata}`} target="_blank" rel="noopener noreferrer" className='link-item'>
                                       <WikiDataIcon />
                                    </a>
                                 )}
                                 {data.imdb_id && (
                                    <a href={`https://www.imdb.com/title/${data.imdb_id}`} target="_blank" rel="noopener noreferrer" className='link-item'>
                                       <IMDbIcon />
                                    </a>
                                 )}
                                 {data.homepage && (
                                    <a href={data.homepage} target="_blank" rel="noopener noreferrer" className='link-item'>
                                       <HomepageIcon />
                                    </a>
                                 )}
                              </>
                           ) : (
                              <span className='no-links'>N/A</span>
                           )}
                        </div>
                     </div>

                     <Divider />
                     <div className='runtime-container'>
                        <span className='label'>Runtime</span>
                        {data.runtime ? (
                           <span>{data.runtime}</span>
                        ) : <span className='value not-available'>N/A</span>}
                     </div>
                     <Divider />
                     <div className='runtime-container'>
                        <span className='font-bold'>Budget</span>
                        {data.budget !== "$0.00"
                           ? <span>{data.budget}</span>
                           : <span className='text-[#ff8731]'>N/A</span>
                        }
                     </div>
                     <Divider />
                     <div className='revenue-container'>
                        <span className='label'>Revenue</span>
                        {data.revenue !== "$0.00"
                           ? <span>{data.revenue}</span>
                           : <span className='value not-available'>N/A</span>
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
