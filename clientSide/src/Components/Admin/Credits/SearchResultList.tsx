import React from 'react'
import SearchResult from './SearchResult';

const SearchResultList = ({ results, onSelectPerson }) => {
   return (
      <div>
         {results.map((result, id) => {
            let searchData = {};

            searchData = {
               id: result.id || result._id,
               streamType: 'person',
               name: result.name,
               known_for_department: result.known_for_department,
               dataThree: [
                  result.known_for[0]?.title,
                  result.known_for[1]?.title,
                  result.known_for[2]?.title
               ].filter(Boolean).join(', '),
               profile_path: result.profile_path
            }

            return <SearchResult data={searchData} key={id} onSelect={onSelectPerson} />
         })}
      </div>
   )
}

export default SearchResultList
