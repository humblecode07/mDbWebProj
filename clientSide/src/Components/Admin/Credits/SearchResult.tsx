import React from 'react'
import IgopImg from '../../../assets/Image/Igop.jpg'

const SearchResult = ({ data, onSelect }) => {
   return (
      <div 
         className="person--search-result"
         onClick={() => onSelect(data)}
      >
         <img
            src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
            alt={data.name}
            className="profile-image"
            onError={(e) => {
               e.target.onerror = null;
               e.target.src = 'https://placehold.co/48x48';
            }}
         />
         <div className='profile-info'>
            <div className="name">{data.name}</div>
            <div className="department">{data.known_for_department}</div>
            <div className="known-for">Known for: {data.dataThree}</div>
         </div>
      </div>
   )
}

export default SearchResult