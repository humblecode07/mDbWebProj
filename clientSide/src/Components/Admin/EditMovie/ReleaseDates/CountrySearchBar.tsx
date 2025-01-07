import React, { useState } from 'react'
import CountrySearch from './CountrySearch';

const CountrySearchBar = ({ releaseDate, setReleaseDate }) => {
   const [results, setResults] = useState([]);

   return (
      <div className="relative">
         <label className="block text-sm font-medium mb-2">Country</label>
         <div>
            <CountrySearch
               setResults={setResults}
               releaseDate={releaseDate}
               setReleaseDate={setReleaseDate}
            />
         </div>
         {results.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-[#2C2C2C] border border-[#444444] rounded-md shadow-lg max-h-60 overflow-y-auto">
               {results.map((country) => (
                  <div
                     key={country.iso_3166_1}
                     className="px-3 py-2 hover:bg-[#444444] cursor-pointer"
                     onClick={() => {
                        setReleaseDate({
                           ...releaseDate,
                           country: { name: country.english_name, iso_3166_1: country.iso_3166_1 } 
                        });
                        setResults([]); // Clear results after selection
                     }}
                  >
                     <span>{country.english_name}</span>
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

export default CountrySearchBar
