import React, { useEffect, useMemo, useState } from 'react'
import DividerTwo from '../../Details/DividerTwo'
import { fetchMultipleVideosData } from '../../../api/api';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // Assuming you're using react-query
import YoutubeIcon from '../../../assets/Icons/YoutubeIcon';

const fetchVideoData = async (movieData) => {
   const videoKeys = movieData.videos.map(video => video.key);

   const youtubeDataArray = await fetchMultipleVideosData(videoKeys);

   const youtubeDataMap = youtubeDataArray.reduce((acc, youtubeData) => {
      acc[youtubeData.id] = youtubeData;
      return acc;
   }, {});

   const videoTypeGroup = movieData.videos.reduce((acc, video) => {
      if (!acc[video.type]) acc[video.type] = [];

      acc[video.type].push({ ...video, youtubeData: youtubeDataMap[video.key] });
      return acc;
   }, {});

   return { ...videoTypeGroup }
}

const Videos = ({ movieData }) => {
   const { movieId } = useParams();
   const videoType = useMemo(() => ['Trailer', 'Teaser', 'Clip', 'Behind the Scenes', 'Bloopers', 'Featurette'], []);

   const { data, error, isLoading } = useQuery({
      queryKey: ['videoData', movieId],
      queryFn: () => fetchVideoData(movieData),
   });

   const [selectedType, setSelectedType] = useState(null);

   useEffect(() => {
      if (data) {
         const initialType = videoType.find(type => data[type]?.length > 0);
         setSelectedType(initialType || null);
      }
   }, [data, videoType]);

   const convertDuration = (duration) => {
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      const minutes = match[2] ? parseInt(match[2]) : 0;
      const seconds = match[3] ? parseInt(match[3]) : 0;

      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      return `${minutes}:${formattedSeconds}`;
   };

   const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
   };

   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error fetching data: {error.message}</div>;

   console.log(data);

   return (
      <div className="movie-details--videos-container">
         <div className="videos-header">
            <span className="videos-title">Videos</span>
            <div className="videos-divider">
               <DividerTwo />
            </div>
         </div>
         <div className="videos-content">
            <ul className="video-types-list">
               {videoType.map((type) => (
                  <li
                     key={type}
                     className={`video-type-item ${selectedType === type ? 'selected-type' : ''}`}
                     onClick={() => setSelectedType(type)}
                  >
                     <span>{type}</span>
                     <span>{data?.[type]?.length || 0}</span>
                  </li>
               ))}
            </ul>
            <div className="videos-display scrollbar-none">
               {data?.[selectedType] && data?.[selectedType].length > 0 ? (
                  data?.[selectedType].map((video, index) => (
                     <div className="video-card" key={index}>
                        <img
                           src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                           className="video-thumbnail"
                           alt={video.name}
                        />
                        <section className="video-details">
                           <div className="video-info">
                              <span className="video-title">{video.name}</span>
                              <div className="video-meta">
                                 <span>{video.type}</span>
                                 <span>•</span>
                                 <span>{convertDuration(video.youtubeData.contentDetails.duration)}</span>
                                 <span>•</span>
                                 <span>{formatDate(video.youtubeData.snippet.publishedAt)}</span>
                              </div>
                           </div>
                           <div className="video-channel">
                              <YoutubeIcon />
                              <span>{video.youtubeData.snippet.channelTitle}</span>
                           </div>
                        </section>
                     </div>
                  ))
               ) : (
                  <div>There are no English {selectedType?.toLocaleLowerCase()} added.</div>
               )}
            </div>
         </div>
      </div>
   )
}

export default Videos;