import React from 'react';
import Header from '../../components/Header/Client/Header';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dataApi, imagesApi } from '../../api/api';
import ShowCollage from '../../components/Details/ShowCollage';
import Overview from '../../components/Details/Overview';
import Recommendation from '../../components/Details/Recommendation';
import Casts from '../../components/Details/Casts';
import Footer from '../../components/Footer/Footer';
import Media from '../../components/Details/OverviewMedia';

// Fetch TV Data
const fetchTvData = async (tvId) => {
  const response = await dataApi('tv', tvId);
  const responseImage = await imagesApi('tv', tvId);
  return { response, responseImage };
};

const TvDetails = () => {
  const { tvId } = useParams();
  const id = tvId.split('-')[0];  // Get the ID portion before the dash

  // Using React Query to fetch data
  const { data, error, isLoading } = useQuery({
    queryKey: ['tvData', id], // Unique query key
    queryFn: () => fetchTvData(id), // Function to fetch data
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const { response, responseImage } = data;

  // Update document title
  document.title = response.name;

  const officialTrailer = response.videos.results.filter(
    (video) => video.name.toLowerCase().includes('official') && video.name.toLowerCase().includes('trailer')
  );
  const trailer = officialTrailer.length > 0
    ? `https://www.youtube.com/embed/${officialTrailer[0].key}?si=8l7P2cs2GNCdH2-L`
    : response.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube')
      ? `https://www.youtube.com/embed/${response.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube').key}?si=8l7P2cs2GNCdH2-L`
      : null;

  // Helper functions
  const generateCountMessage = (count, singularLabel, pluralLabel) => {
    if (count > 99) return `99+ ${pluralLabel}`;
    if (count > 1) return `${count} ${pluralLabel}`;
    return count === 1 ? `${count} ${singularLabel}` : `NO ${pluralLabel}`;
  };

  const getRandomIndex = (count) => Math.floor(Math.random() * count);

  // Data to pass on to ShowCollage component
  const backdropCount = responseImage.backdrops?.length || 0;
  const posterCount = responseImage.posters?.length || 0;
  const videosCount = response.videos.results?.length || 0;

  const showCollageData = {
    title: response.title,
    poster_path: response.poster_path ? `https://image.tmdb.org/t/p/w500${response.poster_path}` : null,
    backdrop: backdropCount ? `https://image.tmdb.org/t/p/w500${responseImage.backdrops[getRandomIndex(backdropCount)].file_path}` : null,
    backdrop_count: generateCountMessage(backdropCount, 'BACKDROP', 'BACKDROPS'),
    poster: posterCount ? `https://image.tmdb.org/t/p/w500${responseImage.posters[getRandomIndex(posterCount)].file_path}` : null,
    poster_count: generateCountMessage(posterCount, 'POSTER', 'POSTERS'),
    video: videosCount ? `https://i.ytimg.com/vi/${response.videos.results[getRandomIndex(videosCount)].key}/hqdefault.jpg` : null,
    video_count: generateCountMessage(videosCount, 'VIDEO', 'VIDEOS'),
    official_trailer: trailer,
  };

  // Overview Data
  const certifications = response.content_ratings.results.filter((country) =>
    [response.origin_country[0], "US"].includes(country.iso_3166_1)
  );

  const overviewData = {
    type: 'tv',
    title: response.name,
    certifications:
      certifications[0]?.rating || certifications[1]?.rating || response.content_ratings.results[0].rating || undefined,
    release_date: new Date(response.first_air_date).toLocaleDateString('en-PH'),
    genres: response.genres.map((genre) => genre.name).splice(0, 3),
    vote_average: response.vote_average.toFixed(1),
    vote_count: `${(response.vote_count / 1000).toFixed(1)}k`,
    tagline: response.tagline,
    overview: response.overview,
    original_language: response.original_language,
    original_name: response.original_name,
    created_by: response.created_by.map(writer => writer.name).slice(0, 3),
    stars: response.credits.cast.slice(0, 3).map(star => star.name),
    status: response.status,
    number_of_episodes: `${response.number_of_episodes} ${response.number_of_episodes === 1 ? 'episode' : 'episodes'}`,
    number_of_seasons: `${response.number_of_seasons} ${response.number_of_seasons === 1 ? 'season' : 'seasons'}`,
    first_air_date: new Date(response.first_air_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    last_air_date: new Date(response.last_air_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    tv_type: response.type,
    facebook_id: response.external_ids.facebook_id,
    twitter_id: response.external_ids.twitter_id,
    instagram_id: response.external_ids.instagram_id,
    wikidata: response.external_ids.wikidata_id,
    imdb_id: response.external_ids.imdb_id,
    homepage: response.homepage,
  };

  const credits = {
    type: 'tv',
    casts: response.credits.cast || undefined,
  };

  const medias = {
    videos: response.videos.results || undefined,
    posters: responseImage.posters || undefined,
    backdrops: responseImage.backdrops || undefined,
    logos: responseImage.logos || undefined,
  };

  const recommendations = {
    recommendations: response.recommendations,
  };

  return (
    <>
      <main className='text-white flex flex-col gap-0 font-roboto p-0'>
        <section
          className='w-full h-[52.9375rem] bg-cover bg-center relative flex justify-center'
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${response.backdrop_path})` }}
        >
          <div className="absolute z-1 inset-0 bg-black opacity-90"></div>
          <div className='relative z-2 flex w-[66.5625rem] pt-[3.3125rem] gap-[1.125rem]'>
            <ShowCollage data={showCollageData} />
            <Overview data={overviewData} />
          </ div>
        </section>
        <section
          className='w-[66.5625rem] flex gap-[2rem] pb-[2.875rem] pt-[1.3125rem]'
        >
          <section className='flex flex-col gap-[1.8125rem]'>
            <Casts data={credits} />
            <Media data={medias} />
          </section>
          <Recommendation data={recommendations} />
        </section>
      </main>
    </>
  );
};

export default TvDetails;