import React, { useEffect, useState } from 'react'
import StarIcon from '../../../assets/Icons/StarIcon';
import WatchlistIconTwo from '../../../assets/Icons/WatchlistIconTwo';
import { WatchTrailerButton } from '../../Button/Buttons';
import { NavLink } from 'react-router-dom';

const HighlightedShow = ({ movieData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = movieData.length;

  useEffect(() => {
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideCount);
    };

    const intervalId = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [slideCount]);

  return (
    <div className="highlighted-show-container">
      {movieData.map((data, index) => (
        <NavLink
          to={`movies/${data.id}-${data.title.replace(/\s+/g, "-").toLowerCase()}`}
          key={index}
          className={`highlighted-show-slide ${currentSlide === index ? 'active' : 'inactive'}`}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            alt={data.title}
            className="highlighted-show-backdrop"
          />
          <div className="highlighted-show-gradient"></div>
          <div className="highlighted-show-content">
            <img
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              alt={data.title}
              className="highlighted-show-poster"
            />
            <figcaption className="highlighted-show-details">
              <span className="highlighted-show-title">{data.title}</span>
              <div className="highlighted-show-meta">
                <span className="highlighted-show-release-date">
                  {new Date(data.release_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <div className="highlighted-show-rating">
                  <StarIcon />
                  <span className="highlighted-show-score">
                    {data.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="highlighted-show-actions">
                <WatchTrailerButton movieId={data.id} />
                <button className="add-to-watchlist-button">
                  <WatchlistIconTwo />
                </button>
              </div>
            </figcaption>
          </div>
        </NavLink>
      ))}
    </div>
  )
}

export default HighlightedShow
