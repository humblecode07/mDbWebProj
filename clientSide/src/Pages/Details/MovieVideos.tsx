import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { appendVideosApi, fetchMultipleVideosData, fetchYoutubeData, getMyMovieDataApi } from '../../api/api';
import Section from '../../components/Details/Section';
import Videos from '../../components/Details/Videos';

const isMongoDBId = (id) => typeof id === 'string' && id.length === 24;

const MovieVideos = () => {
  const params = useParams();
  const [videos, setVideos] = useState();

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const movieId = params.movieId.split('-')[0];
        let response;

        if (isMongoDBId(movieId)) {
          response = await getMyMovieDataApi('movie', movieId);

          console.log(response);

          const videoKeys = response.movie.videos.map(video => video.key);
          console.log(videoKeys);
          const youtubeDataArray = await fetchMultipleVideosData(videoKeys);
          const youtubeDataMap = youtubeDataArray.reduce((acc, youtubeData) => {
            acc[youtubeData.id] = youtubeData;
            return acc;
          }, {});

          const videoTypeGroup = response.movie.videos.reduce((acc, video) => {
            if (!acc[video.type]) acc[video.type] = [];

            acc[video.type].push({ ...video, youtubeData: youtubeDataMap[video.key] });
            return acc;
          }, {});

          setVideos({
            id: response.id,
            section: {
              section_title: 'Videos',
              backdrop_path: response.movie.backdrop_path,
              title: response.movie.title || null,
              release_date: response.movie.release_date.split('-')[0],
            },
            videos: videoTypeGroup
          })
        }
        else {
          response = await appendVideosApi('movie', movieId);

          // This code maps through the response data and fetches additional details from the YouTube API for each video, merging that information into the existing video data structure.

          const videoKeys = response.videos.results.map(video => video.key);
          const youtubeDataArray = await fetchMultipleVideosData(videoKeys);
          const youtubeDataMap = youtubeDataArray.reduce((acc, youtubeData) => {
            acc[youtubeData.id] = youtubeData;
            return acc;
          }, {});

          const videoTypeGroup = response.videos.results.reduce((acc, video) => {
            if (!acc[video.type]) acc[video.type] = [];

            acc[video.type].push({ ...video, youtubeData: youtubeDataMap[video.key] });
            return acc;
          }, {});

          console.log(videoTypeGroup)

          setVideos({
            id: response.id,
            section: {
              section_title: 'Videos',
              backdrop_path: response.backdrop_path,
              title: response.title || null,
              release_date: response.release_date.split('-')[0],
            },
            videos: videoTypeGroup
          })
        }
      }
      catch (error) {
        console.error("Error fetching media data:", error);
      }
    }

    fetchVideoData();
  }, [params])

  if (videos) {
    return (
      <>
        <main className='text-white flex flex-col gap-0 font-roboto p-0'>
          <Section data={videos.section} />
          <Videos data={videos.videos} />
        </main>
      </>
    )
  }
}

export default MovieVideos
