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
      <div className='w-full flex flex-col gap-[2rem]'>
         <div className='w-full h-[2.1875rem] flex items-center justify-between gap-[1rem]'>
            <span className='text-[1.875rem] font-bold'>Videos</span>
            <div className='w-[58.0375rem]'>
               <DividerTwo />
            </div>
         </div>
         <div className='w-full max-h-[50rem] flex gap-[1.5625rem]'>
            <ul className='w-[15.9375rem] h-fit flex flex-col flex-grow-0 gap-[1.1875rem] py-[2.5625rem] px-[1.625rem] rounded-md border-solid border-[#1A1A1A] border-[1px]'>
               {videoType.map((type) => (
                  <li
                     key={type}
                     className={`w-[12.6875rem] font-light text-[0.9375rem] flex justify-between cursor-pointer ${selectedType === type ? 'text-blue-500' : ''
                        }`}
                     onClick={() => setSelectedType(type)}
                  >
                     <span>{type}</span>
                     <span>{data?.[type]?.length || 0}</span>
                  </li>
               ))}
            </ul>
            <div className={`w-[47.9375rem] h-full flex flex-grow-0 flex-wrap gap-[1.7rem] overflow-auto scrollbar-none`}>
               {data?.[selectedType] && data?.[selectedType].length > 0 ? (
                  data?.[selectedType].map((video, index) => (
                     <div className='h-fit flex gap-[1.5625rem]' key={index}>
                        <img
                           src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                           className={`w-[22.5625rem] h-[12.691375rem] object-cover flex-shrink-0`}
                           alt={video.name}
                        />
                        <section className='flex flex-col justify-between'>
                           <div className='flex flex-col gap-[0.4375rem]'>
                              <span className='font-bold text-[1.09375rem]'>{video.name}</span>
                              <div className='flex gap-[0.375rem] font-light text-[0.9375rem]'>
                                 <span>{video.type}</span>
                                 <span>•</span>
                                 <span>{convertDuration(video.youtubeData.contentDetails.duration)}</span>
                                 <span>•</span>
                                 <span>{formatDate(video.youtubeData.snippet.publishedAt)}</span>
                              </div>
                           </div>
                           <div className='flex items-center gap-[0.6875rem] pb-[1rem]'>
                              <YoutubeIcon />
                              <span className='font-light text-[0.9375rem]'>{video.youtubeData.snippet.channelTitle}</span>
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