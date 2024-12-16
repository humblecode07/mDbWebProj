import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dataApi, getMyMovieDataApi, imagesApi } from '../../api/api';
import ShowCollage from '../../components/Details/ShowCollage';
import Overview from '../../components/Details/Overview';
import Casts from '../../components/Details/Casts';
import Media from '../../components/Details/OverviewMedia';
import Recommendation from '../../components/Details/Recommendation';
import { LOCALHOST } from '../../App';

// Check if it's an ID from MongoDB
const isMongoDBId = (id) => typeof id === 'string' && id.length === 24;

// Fetch Movie Data
const fetchMovieData = async (movieId) => {

  if (isMongoDBId(movieId)) {
    const myResponse = await getMyMovieDataApi('movie', movieId);

    return { ...myResponse.movie };
  }
  else {
    const response = await dataApi('movie', movieId);
    const responseImage = await imagesApi('movie', movieId);

    return { ...response, ...responseImage };
  }
};

const MovieDetails = () => {
  const { movieId } = useParams();
  const id = movieId.split('-')[0]; // Get the ID portion before the dash

  // Using React Query to fetch data
  const { data, error, isLoading } = useQuery({
    queryKey: ['movieData', id],
    queryFn: () => fetchMovieData(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const response = data;

  console.log(response);

  // Change tab title
  document.title = response.title;

  // Gets the official trailer first, if not found, try to get a relevant trailer
  const officialTrailer = (response.videos.results && response.videos.results.length > 0)
    ? response.videos.results.filter(
      video => video.name.toLowerCase().includes('official') && video.name.toLowerCase().includes('trailer')
    )
    : (!response.videos['results'] ? response.videos.filter(
      video => video.name.toLowerCase().includes('official') && video.name.toLowerCase().includes('trailer')
    ) : 0); // this is still can have an issue, will fix later ig

  const trailer = officialTrailer.length > 0
    ? `https://www.youtube.com/embed/${officialTrailer[0].key}?si=8l7P2cs2GNCdH2-L`
    : response.videos?.results
      ? (() => {
        const foundVideo = response.videos.results.find(video => video.type === 'Trailer' && video.site === 'Youtube');
        return foundVideo ? `https://www.youtube.com/embed/${foundVideo.key}?si=8l7P2cs2GNCdH2-L` : null;
      })()
      : response.videos
        ? (() => {
          const foundVideo = response.videos.find(video => video.type === 'Trailer' && video.site === 'Youtube');
          return foundVideo ? `https://www.youtube.com/embed/${foundVideo.key}?si=8l7P2cs2GNCdH2-L` : null;
        })()
        : null;


  // Helper functions
  const generateCountMessage = (count, singularLabel, pluralLabel) => {
    if (count > 99) {
      return `99+ ${pluralLabel}`;
    } else if (count > 1) {
      return `${count} ${pluralLabel}`;
    } else if (count === 1) {
      return `${count} ${singularLabel}`;
    } else {
      return `NO ${pluralLabel}`;
    }
  };

  const getRandomIndex = (count) => {
    return Math.floor(Math.random() * count);
  };

  const backdropCount = response.backdrops?.length || response.images.backdrops?.length || 0;
  const backdropMessage = generateCountMessage(backdropCount, 'BACKDROP', 'BACKDROPS');

  const posterCount = response.posters?.length || response.images.posters?.length || 0;
  const posterMessage = generateCountMessage(posterCount, 'POSTER', 'POSTERS');

  const videosCount = response.videos.results?.length || response.videos?.length || 0;
  const videoMessage = generateCountMessage(videosCount, 'VIDEO', 'VIDEOS');

  // Gets random index based on the total count of data
  const randomBackdropIndex = backdropCount > 0 ? getRandomIndex(backdropCount) : null;
  const randomPosterIndex = posterCount > 0 ? getRandomIndex(posterCount) : null;
  const randomVideoIndex = videosCount > 0 ? getRandomIndex(videosCount) : null;

  console.log(posterCount);

  const showCollageData = {
    title: response.title,
    poster_path: response.poster_path ? response.poster_path : null,
    backdrop: randomBackdropIndex !== null
      ? (response.backdrops ? response.backdrops[randomBackdropIndex].file_path : response.images.backdrops[randomBackdropIndex].file_path)
      : null,
    backdrop_count: backdropMessage,
    poster: randomPosterIndex !== null
      ? (response.posters ? response.posters[randomPosterIndex].file_path : response.images.posters[randomPosterIndex].file_path)
      : null,
    poster_count: posterMessage,
    video: randomVideoIndex !== null
      ? (response.videos.results ? `https://i.ytimg.com/vi/${response.videos.results[randomVideoIndex].key}/hqdefault.jpg` : `https://i.ytimg.com/vi/${response.videos[randomVideoIndex].key}/hqdefault.jpg`) : null,
    video_count: videoMessage,
    official_trailer: trailer
  };

  // Get Overview data
  const certifications = response.release_dates?.results.filter((country) =>
    [response.origin_country[0], "US"].includes(country.iso_3166_1)
  );

  const director = response.credits.crew.find((member) => member.job === "Director");
  const writers = response.credits.crew.filter((member) => member.department === "Writing").slice(0, 3).map((writer) => writer.name);
  const stars = response.credits.cast.slice(0, 3).map((star) => star.name);

  const hours = response.runtime ? Math.floor(response.runtime / 60) : 0;
  const minutes = response.runtime ? response.runtime % 60 : 0;

  const overviewData = {
    type: 'movie',
    title: response.title,
    certifications:
      certifications[0]?.release_dates?.find(item => item.certification !== '')?.certification ||
      certifications[1]?.release_dates?.find(item => item.certification !== '')?.certification ||
      undefined,
    release_date: new Date(response.release_date).toLocaleDateString('en-PH'),
    genres: response.genres.map((genre) => genre.name).slice(0, 3),
    vote_average: response.vote_average.toFixed(1) || 0,
    vote_count: ((response.vote_count / 1000).toFixed(1) + 'k'),
    tagline: response.tagline,
    overview: response.overview,
    original_language: response.original_language,
    original_title: response.original_title,
    director: director ? director.name : undefined,
    writers: writers.length > 0 ? writers : undefined,
    stars,
    status: response.status,
    runtime: response.runtime ? `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}` : 'N/A',
    facebook_id: response.external_ids.facebook_id || undefined,
    twitter_id: response.external_ids.twitter_id || undefined,
    instagram_id: response.external_ids.instagram_id || undefined,
    wikidata: response.external_ids.wikidata_id || undefined,
    imdb_id: response.external_ids.imdb_id || undefined,
    homepage: response.homepage,
    budget: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(response.budget),
    revenue: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(response.revenue)
  };

  // Credits
  const credits = {
    type: 'movie',
    casts: response.credits.cast || undefined,
    director: director || undefined,
    writers: writers || undefined
  };

  // Media
  const medias = {
    videos: response.videos.results || response.videos || undefined,
    posters: response.posters || response.images.posters || undefined,
    backdrops: response.backdrops || response.images.backdrops || undefined,
    logos: response.logos || response.images.logos || undefined
  };

  // Recommendations
  const recommendations = {
    recommendations: response.recommendations,
  };

  return (
    <>
      <main className='movie-details--main-container'>
        <section
          className='background-section'
          style={{
            backgroundImage: response._id
              ? `url(${LOCALHOST}/images/${response.backdrop_path})`
              : `url(https://image.tmdb.org/t/p/original${response.backdrop_path})`
          }}
        >
          <div className="overlay"></div>
          <div className='data--container'>
            <ShowCollage data={showCollageData} />
            <Overview data={overviewData} />
          </div>
        </section>
        <section className="details-section">
          <section className="left-column">
            <Casts data={credits} />
            <Media data={medias} />
          </section>
          <Recommendation data={recommendations} />
        </section>
      </main>
    </>
  );
};

export default MovieDetails;
