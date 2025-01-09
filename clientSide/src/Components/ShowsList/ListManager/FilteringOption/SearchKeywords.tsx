import React, { useEffect, useState } from 'react'
import { keywordResults } from '../../../../api/api';

const SearchKeywords = ({ setKeywordResults }) => {
   const [searchKeyword, setSearchKeyword] = useState('');

   useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
         if (searchKeyword.length > 2) {
            const fetchKeywordResults = async () => {
               try {
                  const results = await keywordResults(searchKeyword);
                  setKeywordResults(results.results);
               } catch (error) {
                  console.log('Error during fetching of data', error);
               }
            };

            fetchKeywordResults();
         } else {
            setKeywordResults([]);
         }
      }, 300);

      return () => clearTimeout(delayDebounceFn);
   }, [searchKeyword, setKeywordResults]);

   return (
      <input
         type="text"
         className="text-[.75rem] bg-transparent text-white focus:outline-none"
         value={searchKeyword}
         onChange={(e) => setSearchKeyword(e.target.value)}
      />
   )
}

export default SearchKeywords
