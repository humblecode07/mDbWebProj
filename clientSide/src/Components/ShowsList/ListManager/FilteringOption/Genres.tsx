import React, { useContext, useEffect, useState } from 'react'
import { apiFetch } from '../../../../api/api';
import { ContextMovies } from '../../../../pages/Lists/MovieList';
import { ContextTvShows } from '../../../../pages/Lists/TvList';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const moviesContext = useContext(ContextMovies);
  const tvShowsContext = useContext(ContextTvShows);
  const context = moviesContext || tvShowsContext;
  const { streamType, filters, handleFilterChange, setCurrentPage } = context || {};
  const [localGenres, setLocalGenres] = useState(filters.genres || []);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const results = await apiFetch(`genre/${streamType}/list?language=en`);

        setGenres(results.genres);
      }
      catch (error) {
        console.log("Error during fetching of movie's genres", error)
      }
    }

    getGenres();
  }, [streamType])

  function handleGenreToggle(genreId) {
    const updatedGenres = localGenres.includes(genreId)
      ? localGenres.filter(id => id !== genreId)
      : [...localGenres, genreId];

    setLocalGenres(updatedGenres);
    setCurrentPage(1);
    handleFilterChange('genres', updatedGenres);
  }

  return (
    <div className="genre-container">
      <span className="genre-title">GENRES</span>
      <div className="genre-buttons">
        {genres.map((genre) => {
          const isSelected = localGenres.includes(genre.id);

          return (
            <button
              key={genre.id}
              className={`genre-button ${isSelected ? 'selected' : ''}`}
              onClick={() => handleGenreToggle(genre.id)}
            >
              {genre.name}
            </button>
          );
        })}
      </div>
    </div>

  )
}

export default Genres
