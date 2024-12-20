import React, { useState } from 'react'
import PlusIcon from '../../../../assets/Icons/PlusIcon'
import InfoIcon from '../../../../assets/Icons/InfoIcon'
import StarIcon from '../../../../assets/Icons/StarIcon'
import StarOutline from '../../../../assets/Icons/StarOutline'
import DetailModal from './DetailModal'

const GridView = ({ streams, people }) => {
   const [activeDetailModal, setActiveDetailModal] = useState(null);

   if (streams) {
      return (
         <div className='grid-container'>
            {streams.map(stream => {
               return (
                  <div
                     key={stream.id}
                     className='stream-card'
                  >
                     <img
                        src={stream.poster_path !== null ? `https://image.tmdb.org/t/p/w500` + stream.poster_path : 'https://placehold.co/159x225'}
                        alt={stream.original_title || stream.name}
                        className='card-image'
                     />
                     <div className='rating-section'>
                        <div className='rating-item'>
                           <StarIcon />
                           <span>{stream.vote_average?.toFixed(1)}</span>
                        </div>
                        <div className='rating-item'>
                           <StarOutline />
                           <span>0</span>
                        </div>
                     </div>
                     <span className='title'>{stream.title || stream.name}</span>
                     <button
                        className='action-buttons'
                     >
                        <PlusIcon />
                        <span className='watchlist-text'>Watchlist</span>
                     </button>

                     <button
                        className='action-buttons'
                        onClick={() => setActiveDetailModal(stream.id)}
                     >
                        <InfoIcon />
                        <span>Details</span>
                     </button>
                  </div>
               )
            })}
            {activeDetailModal !== null
               ? <DetailModal id={activeDetailModal} exitModal={setActiveDetailModal} />
               : null
            }
         </div>
      )
   }
   else if (people) {
      return (
         <div className='grid-container'>
            {people.map((person) => {
               return (
                  <div
                     key={person.id}
                     className='person-card'
                  >
                     <img
                        src={person.profile_path !== null ? `https://image.tmdb.org/t/p/w500` + person.profile_path : 'https://placehold.co/159/225'}
                        alt={person.original_name}
                        className='card-image'
                     />
                     <article className='person-details'>
                        <span className='person-name'>{person.name}</span>
                        <span className='person-department'>
                           {person.known_for_department}
                        </span>
                        <span className='known-for'>
                           Known for: {person.known_for?.map((movie, index) => (
                              <span key={index}>{movie.title || movie.original_name}{index < person.known_for.length - 1 ? ', ' : ''}</span>
                           ))}
                        </span>
                     </article>
                  </div>
               )
            })}
         </div>
      )
   }
   else {
      return <div>Loading...</div>;
   }
}

export default GridView
