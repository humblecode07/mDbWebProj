import React from 'react'
import IgopImg from '../../../assets/Image/Igop.jpg'
import { Link } from 'react-router-dom'
import { LOCALHOST } from '../../../App'

const SearchResult = ({ data }) => {
   console.log(data)
   return (
      <Link
         to={`/${data.streamType}/${data.id}`}
         className="flex h-[7.8175rem] justify-center border-b-[1px] border-solid border-[#9D9D9D] hover:bg-[#C0C0C0] active:bg-color[#AFAFAF] dark:text-white dark:border-[#C9C9C9] dark:hover:bg-[#141C27] dark:active:bg-[#0F161E]"
      >
         <div className="flex gap-[1.0625rem] py-[.875rem]">
            <img
               className="search-result-image"
               src={`https://image.tmdb.org/t/p/w500${data.dataFour}`}
               alt={data.dataOne}
               onError={(e) => {
                  e.target.onerror = null;
                  e.target.onerror = () => { // Second fallback for the placeholder
                     e.target.src = IgopImg;
                  };
                  e.target.src = `${LOCALHOST}/images/${data.dataFour}`; // First fallback to your backend image
               }}
            />
            <article className="w-[17.3125rem] flex flex-col">
               <span className="font-roboto font-medium text-[1rem] overflow-hidden truncate whitespace-nowrap">{data.dataOne}</span>
               <span className="font-roboto font-light text-[.875rem] overflow-hidden truncate whitespace-nowrap">{data.dataTwo}</span>
               <p className="font-roboto text-[.75rem] overflow-hidden truncate whitespace-normal line-clamp-3">{data.dataThree}</p>
            </article>
         </div>
      </Link>
   )
}

export default SearchResult
