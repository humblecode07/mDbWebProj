import React, { useContext, useState } from 'react'
import { ContextMovies } from '../../../../pages/Lists/MovieList';
import { ContextTvShows } from '../../../../pages/Lists/TvList';

const Runtime = () => {
  const moviesContext = useContext(ContextMovies);
  const tvShowsContext = useContext(ContextTvShows);
  const context = moviesContext || tvShowsContext;
  const { filters, handleFilterChange, setCurrentPage } = context || {};
  const [runtime, setRuntime] = useState({
    gteRuntime: filters.runtime?.gteRuntime || 0,
    lteRuntime: filters.runtime?.lteRuntime || 400
  });

  const handleRuntimeChange = (e, type) => {
    const inputValue = e.target.value;
    const parsedValue = parseInt(inputValue, 10);
    const validValue = !isNaN(parsedValue) ? parsedValue : (type === 'gteRuntime' ? 0 : 300);

    const updatedRuntime = {
      ...runtime,
      [type]: validValue
    };

    setRuntime(updatedRuntime);
    handleFilterChange('runtime', updatedRuntime);
    setCurrentPage(1);
  };

  return (
    <div className='text-white font-roboto flex flex-col gap-[0.875rem] '>
      <span className='text-[#ff8731] font-bold text-[.75rem]'>RUNTIME</span>
      <div className='flex items-center gap-[.6rem]'>
        <div className="w-[16.875rem] h-[2.5rem] border-2 border-white rounded-md flex items-center px-3 hover:border-[#ff8731] focus-within:border-[#ff8731] transition duration-300 ease-in-out">
          <input
            type="number"
            className="w-full h-full text-[.75rem] bg-transparent text-white placeholder-gray-500 focus:outline-none"
            value={runtime.gteRuntime}
            onChange={(e) => handleRuntimeChange(e, 'gteRuntime')}
          />
        </div>
        <span className='text-[.75rem]'>to</span>
        <div className="w-[16.875rem] h-[2.5rem] border-2 border-white rounded-md flex items-center px-3 hover:border-[#ff8731] focus-within:border-[#ff8731] transition duration-300 ease-in-out">
          <input
            type="number"
            className="w-full h-full text-[.75rem] bg-transparent text-white placeholder-gray-500 focus:outline-none"
            value={runtime.lteRuntime}
            onChange={(e) => handleRuntimeChange(e, 'lteRuntime')}
          />
        </div>
      </div>
    </div>
  )
}

export default Runtime
