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
    <div className="runtime-section">
      <span className="runtime-title">RUNTIME</span>
      <div className="runtime-inputs">
        <div className="runtime-input-container">
          <input
            type="number"
            className="runtime-input"
            value={runtime.gteRuntime}
            onChange={(e) => handleRuntimeChange(e, "gteRuntime")}
          />
        </div>
        <span className="runtime-separator">to</span>
        <div className="runtime-input-container">
          <input
            type="number"
            className="runtime-input"
            value={runtime.lteRuntime}
            onChange={(e) => handleRuntimeChange(e, "lteRuntime")}
          />
        </div>
      </div>
    </div>
  )
}

export default Runtime
