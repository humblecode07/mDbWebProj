import React, { useEffect, useRef, useState } from 'react';
import SearchFilter from '../../components/Admin/SearchFilter';
import AddIcon from '../../assets/Icons/Admin/AddIcon';
import { fetchMyData } from '../../api/api';
import { LOCALHOST } from '../../App';
import TripleDotIcon from '../../assets/Icons/Admin/TripleDotIcon';
import ViewIcon from '../../assets/Icons/Admin/ViewIcon';
import OverviewPanel from '../../components/Details/OverviewPanel';
import { NavLink } from 'react-router-dom';

const AdminMovie = () => {
  const [movieList, setMovieList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const response = await fetchMyData('movie');
        const movies = response?.data || [];

        const getTrailerUrl = (videos) => {
          if (!videos || videos.length === 0) return null;

          const officialTrailer = videos.find(
            (video) =>
              video.name.toLowerCase().includes('official') &&
              video.name.toLowerCase().includes('trailer')
          );

          if (officialTrailer) {
            return `https://www.youtube.com/embed/${officialTrailer.key}?si=8l7P2cs2GNCdH2-L`;
          }

          const genericTrailer = videos.find(
            (video) => video.type === 'Trailer' && video.site.toLowerCase() === 'youtube'
          );

          return genericTrailer
            ? `https://www.youtube.com/embed/${genericTrailer.key}?si=8l7P2cs2GNCdH2-L`
            : null;
        };

        console.log(movies)

        const parsedMovies = movies.map((movie) => {
          const certifications =
            movie?.release_dates?.results?.filter((country) =>
              ['US', movie.origin_country?.[0]].includes(country.iso_3166_1)
            ) || [];

          const director = movie?.credits?.crew?.find((member) => member.job === 'Director');
          const writers = (movie?.credits?.crew || []).filter((member) => member.department === 'Writing').slice(0, 3).map((writer) => writer.name);
          const stars = (movie?.credits?.cast || []).slice(0, 3).map((star) => star.name);

          const hours = Math.floor((movie.runtime || 0) / 60);
          const minutes = (movie.runtime || 0) % 60;

          return {
            _id: movie._id,
            title: movie.title || movie.original_title,
            tagline: movie.tagline,
            overview: movie.overview,
            trailer: getTrailerUrl(movie?.videos),
            genres: movie.genres.map((genre) => genre.name).slice(0, 3),
            certifications:
              certifications[0]?.release_dates?.find(
                (item) => item.certification !== ''
              )?.certification || 'N/A',
            vote_average: movie.vote_average.toFixed(1) || 0,
            vote_count: ((movie.vote_count / 1000).toFixed(1) + 'k'),
            release_date: movie.release_date
              ? new Date(movie.release_date).toLocaleDateString('en-PH')
              : 'Unknown',
            director: director?.name || undefined,
            writers: writers.length > 0 ? writers : undefined,
            stars,
            runtime: movie.runtime
              ? `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`
              : 'N/A',
            backdrop_path: movie.backdrop_path || '',
            budget: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(movie.budget),
            revenue: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(movie.revenue),
            facebook_id: movie.external_ids.facebook_id || undefined,
            twitter_id: movie.external_ids.twitter_id || undefined,
            instagram_id: movie.external_ids.instagram_id || undefined,
            wikidata: movie.external_ids.wikidata_id || undefined,
            imdb_id: movie.external_ids.imdb_id || undefined,
            homepage: movie.homepage,
            status: movie.status,
          };
        });

        console.log(parsedMovies);

        setMovieList(parsedMovies);
        setFilteredMovies(parsedMovies);
      }
      catch (error) {
        console.error('Error fetching media data:', error);
      }
    };

    fetchMovieList();
  }, []);

  const handleViewInfo = (movie) => {
    setSelectedMovie(movie);
    setIsInfoVisible(true);
  };

  console.log(movieList);

  if (movieList) {
    return (
      <div className="admin-movie--container">
        <div className="admin-movie--wrapper">
          <div className="admin-movie--search-container">
            <span className="movie-title">Movies</span>
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              movies={movieList}
              setFilteredMovies={setFilteredMovies}
            />
          </div>
          <NavLink
            to="create"
            className="navlink-one"
          >
            <AddIcon />
            <span>Add Movie</span>
          </NavLink>
        </div>
        <div className='admin-movies--container'>
          {filteredMovies.length > 0
            ? filteredMovies.map((card) => (
              <NavLink
                to={card._id}
                key={card._id}
                className="card"
                style={{
                  backgroundImage: card._id
                    ? `url(${LOCALHOST}/images/${card.backdrop_path})`
                    : `url(https://placehold.co/211x263/png)`,
                }}
              >
                <div className="overlay"></div>
                <div className="content">
                  <div className="dot-icon">
                    <TripleDotIcon />
                  </div>
                  <div className="genre--container">
                    <span className="genre--item">
                      {card?.genres[0]}
                    </span>
                    <span className="title">{card.title}</span>
                    <div className="overview-container">
                      <span className="overview">
                        {card.overview}
                      </span>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          handleViewInfo(card);
                        }}
                        className="view-button"
                      >
                        <ViewIcon />
                      </button>

                    </div>
                  </div>
                </div>
              </NavLink>
            ))
            : (
              <div className="no-movies">
                <p className="message">No movies found. Add one to get started!</p>
              </div>
            )}
        </div>
        {selectedMovie && (
          <OverviewPanel
            data={selectedMovie}
            isInfoVisible={isInfoVisible}
            panelRef={panelRef}
            setIsInfoVisible={setIsInfoVisible}
            filteredMovies={filteredMovies}
            setFilteredMovies={setFilteredMovies}
          />
        )}
      </div>
    );
  }
};

export default AdminMovie;
