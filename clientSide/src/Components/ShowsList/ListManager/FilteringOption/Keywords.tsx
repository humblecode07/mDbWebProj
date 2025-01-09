import React, { useContext, useState } from 'react';
import SearchKeywords from './SearchKeywords';
import { ContextMovies } from '../../../../pages/Lists/MovieList';
import { ContextTvShows } from '../../../../pages/Lists/TvList';

const Keywords = () => {
  const moviesContext = useContext(ContextMovies);
  const tvShowsContext = useContext(ContextTvShows);
  const context = moviesContext || tvShowsContext;
  const { filters, handleFilterChange, setCurrentPage } = context || {};
  const [keywordResult, setKeywordResult] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState(filters.keyword.keywords);

  function handleSelectedKeywordsChange(id, name) {
    const updatedSelectedKeywords = [...selectedKeywords];
    const index = updatedSelectedKeywords.findIndex(kw => kw.id === id);

    if (index === -1) {
      updatedSelectedKeywords.push({ id, name });
    } else {
      updatedSelectedKeywords.splice(index, 1);
    }

    setSelectedKeywords(updatedSelectedKeywords);

    // Update global filters
    handleFilterChange('keyword', {
      keywordIds: updatedSelectedKeywords.map(kw => kw.id),
      keywords: updatedSelectedKeywords
    });
    setCurrentPage(1);
  }

  return (
    <div className='text-white font-roboto flex flex-col gap-2'>
      <span className='text-[#ff8731] font-bold text-[0.875rem]'>KEYWORDS</span>
      <div className='flex flex-col gap-2 w-[16.875rem]'>
        <div className="flex flex-wrap gap-2 items-center p-2 border-2 border-white rounded-md hover:border-[#ff8731] focus-within:border-[#ff8731] transition duration-300 ease-in-out">
          {selectedKeywords.map((keyword) => (
            <div key={keyword.id} className="bg-[#ff8731] text-white px-2 py-1 rounded text-xs">
              {keyword.name}
            </div>
          ))}
          <SearchKeywords setKeywordResults={setKeywordResult} />
        </div>
        {keywordResult.length > 0 && (
          <ul className='flex flex-col max-h-40 overflow-auto mt-2 bg-gray-800 border border-gray-600 rounded-md'>
            {keywordResult.map((keyword) => (
              <li
                key={keyword.id}
                onClick={() => handleSelectedKeywordsChange(keyword.id, keyword.name)}
                className={`cursor-pointer p-2 hover:bg-[#ff8731] text-[0.875rem] hover:text-white ${selectedKeywords.some(kw => kw.id === keyword.id) ? 'text-[#ff8731]' : 'text-white'}`}
              >
                {keyword.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Keywords;
