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
    <div className='fo-keywords--container'>
      <span className="keyword-title">KEYWORDS</span>
      <div className="keyword-container">
        <div className="keyword-input-wrapper">
          {selectedKeywords.map((keyword) => (
            <div key={keyword.id} className="keyword-tag">
              {keyword.name}
            </div>
          ))}
          <SearchKeywords setKeywordResults={setKeywordResult} />
        </div>
        {keywordResult.length > 0 && (
          <ul className="keyword-result">
            {keywordResult.map((keyword) => (
              <li
                key={keyword.id}
                onClick={() => handleSelectedKeywordsChange(keyword.id, keyword.name)}
                className={`keyword-item ${selectedKeywords.some(kw => kw.id === keyword.id) ? 'selected' : ''}`}
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
