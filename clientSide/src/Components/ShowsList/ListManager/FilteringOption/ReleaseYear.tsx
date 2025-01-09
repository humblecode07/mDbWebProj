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
    <div className='text-white font-roboto flex flex-col gap-[0.875rem]'>
      <span className='text-[#ff8731] font-bold text-[.75rem]'>{streamType === "movie" ? "RELEASE YEAR" : "AIR RELEASE YEAR"}</span>
      <div className='flex items-center gap-[.6rem]'>
        <div className="w-[16.875rem] h-[2.5rem] border-2 border-white rounded-md flex items-center px-3 hover:border-[#ff8731] focus-within:border-[#ff8731] transition duration-300 ease-in-out">
          <input
            type="number"
            className="w-full h-full text-[.75rem] bg-transparent text-white placeholder-gray-500 focus:outline-none"
            value={releaseYear.gteYear}
            onChange={(e) => handleReleaseYearChange(e, 'gteYear')}
          />
        </div>
        <span className='text-[.75rem]'>to</span>
        <div className="w-[16.875rem] h-[2.5rem] border-2 border-white rounded-md flex items-center px-3 hover:border-[#ff8731] focus-within:border-[#ff8731] transition duration-300 ease-in-out">
          <input
            type="number"
            className="w-full h-full text-[.75rem] bg-transparent text-white placeholder-gray-500 focus:outline-none"
            value={releaseYear.lteYear}
            onChange={(e) => handleReleaseYearChange(e, 'lteYear')}
          />
        </div>
      </div>
    </div>
  )
}

export default ReleaseYear
