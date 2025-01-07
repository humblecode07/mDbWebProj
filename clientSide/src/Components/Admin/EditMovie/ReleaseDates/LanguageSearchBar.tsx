import React, { useState } from 'react'
import LanguageSearch from './LanguageSearch'

const LanguageSearchBar = ({ releaseDate, setReleaseDate }) => {
   const [results, setResults] = useState([]);

   return (
      <div className="relative">
         <label className="block text-sm font-medium mb-2">Language</label>
         <div>
            <LanguageSearch
               setResults={setResults}
               releaseDate={releaseDate}
               setReleaseDate={setReleaseDate}
            />
         </div>
         {results.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-[#2C2C2C] border border-[#444444] rounded-md shadow-lg max-h-60 overflow-y-auto">
               {results.map((language) => (
                  <div
                     key={language.iso_639_1}
                     className="px-3 py-2 hover:bg-[#444444] cursor-pointer"
                     onClick={() => {
                        setReleaseDate({
                           ...releaseDate,
                           language: language.english_name
                        });
                        setResults([]);
                     }}
                  >
                     <div className="flex justify-between">
                        <span>{language.english_name}</span>
                        <span className="text-gray-400 text-sm">{language.iso_639_1}</span>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

export default LanguageSearchBar
