import React from 'react'
import IgopImg from '../../../assets/Image/Igop.jpg'

const SearchResult = ({ data, onSelect }) => {
   return (
      <div
         className="flex items-center p-2 hover:bg-[#3C3C3C] cursor-pointer"
         onClick={() => onSelect(data)}
      >
         <img
            src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
            alt={data.name}
            className="w-[3rem] h-[3rem] rounded-full mr-4 object-cover"
            onError={(e) => {
               e.target.onerror = null;
               e.target.src = IgopImg;
            }}
         />
         <div>
            <div className="font-semibold">{data.name}</div>
            <div className="text-sm text-gray-400">{data.known_for_department}</div>
            <div className="text-xs text-gray-500">Known for: {data.dataThree}</div>
         </div>
      </div>
   )
}

export default SearchResult