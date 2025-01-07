import React from 'react'
import SearchResult from './SearchResult';

const SearchResultList = ({ results }) => {

  return (
    <div className='w-full h-auto bg-[#D9D9D9] flex flex-col justify-center text-black rounded-[.125rem] mt-[.3rem] absolute z-[50] dark:bg-[#1C252F]'>
      {results.map((result, id) => {
        let searchData = {};

        if (result.media_type === "movie") {
          searchData = {
            id: result.id || result._id,
            streamType: 'movies',
            dataOne: result.title || result.original_title,
            dataTwo: [
              result.media_type,
              result.release_date ? result.release_date.substring(0, 4) : null,
            ].filter(Boolean).join(', '),
            dataThree: result.overview,
            dataFour: result.poster_path
          }
        }
        else if (result.media_type === "tv") {
          searchData = {
            id: result.id || result._id,
            streamType: 'tv',
            dataOne: result.name,
            dataTwo: [
              result.media_type,
              result.first_air_date ? result.first_air_date.substring(0, 4) : null,
            ].filter(Boolean).join(', '),
            dataThree: result.overview,
            dataFour: result.poster_path
          }
        }
        else if (result.media_type === "person") {
          searchData = {
            id: result.id || result._id,
            streamType: 'person',
            dataOne: result.name,
            dataTwo: result.known_for_department,
            dataThree: [
              result.known_for[0]?.title,
              result.known_for[1]?.title,
              result.known_for[2]?.title
            ].filter(Boolean).join(', '),
            dataFour: result.profile_path
          }
        }

        return <SearchResult data={searchData} key={id} />
      })}
    </div>
  )
}

export default SearchResultList
