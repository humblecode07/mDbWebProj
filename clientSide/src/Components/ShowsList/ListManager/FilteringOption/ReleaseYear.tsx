import React, { useContext, useState } from 'react'
import { ContextMovies } from '../../../../pages/Lists/MovieList';
import { ContextTvShows } from '../../../../pages/Lists/TvList';

const ReleaseYear = () => {
  const moviesContext = useContext(ContextMovies);
  const tvShowsContext = useContext(ContextTvShows);
  const context = moviesContext || tvShowsContext;
  const { streamType, filters, handleFilterChange, setCurrentPage } = context || {};
  const [releaseYear, setReleaseYear] = useState({
    gteYear: filters.releaseYear.gteYear,
    lteYear: filters.releaseYear.lteYear
  })

  const handleReleaseYearChange = (e, type) => {
    const inputValue = e.target.value;

    const updatedReleaseYear = {
      ...releaseYear,
      [type]: inputValue
    };

    setReleaseYear(updatedReleaseYear);
    handleFilterChange('releaseYear', updatedReleaseYear);
    setCurrentPage(1);
  };

  // function convertYearToDate(year) {
  //   if (year && !isNaN(year) && year > 0 && year < 10000) {
  //     return `${year}-12-31`;
  //   }
  //   return '';
  // }

  console.log(releaseYear)

  return (
    <div className="release-year-section">
      <span className="release-year-title">
        {streamType === "movie" ? "RELEASE YEAR" : "AIR RELEASE YEAR"}
      </span>
      <div className="release-year-inputs">
        <div className="release-year-input-container">
          <input
            type="date"
            className="release-year-input"
            value={releaseYear.gteYear}
            onChange={(e) => handleReleaseYearChange(e, "gteYear")}
          />
        </div>
        <span className="release-year-separator">to</span>
        <div className="release-year-input-container">
          <input
            type="date"
            className="release-year-input"
            value={releaseYear.lteYear}
            onChange={(e) => handleReleaseYearChange(e, "lteYear")}
          />
        </div>
      </div>
    </div>

  )
}

export default ReleaseYear
