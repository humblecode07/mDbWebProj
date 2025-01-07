import React, { useState } from 'react'
import YoutubeIcon from '../../assets/Icons/YoutubeIcon';

const Videos = ({ data }) => {
   const videoType = ['Trailer', 'Teaser', 'Clip', 'Behind the Scenes', 'Bloopers', 'Featurette'];

   const initialType = videoType.find(type => data[type]) || null;
   const [selectedType, setSelectedType] = useState(initialType);
   const [selectedVideo, setSelectedVideo] = useState(null); // Track the selected video for fullscreen modal

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

   const closeModal = () => {
      setSelectedVideo(null); // Close the fullscreen modal
   };

   const openVideoModal = (videoKey) => {
      setSelectedVideo(videoKey); // Set the selected video for fullscreen modal
   };

   if (data) {
      return (
         <div className='w-[66.5rem] flex py-[3.3125rem] gap-[3.6875rem]'>
            <ul className='w-[15.9375rem] h-full flex flex-col flex-grow-0 gap-[1.1875rem] py-[2.5625rem] px-[1.625rem] rounded-md border-solid border-[#1A1A1A] border-[1px]'>
               {videoType.map((type) => {
                  return (
                     <li
                        key={type}
                        className='w-[12.6875rem] font-light text-[0.9375rem] flex justify-between cursor-pointer'
                        onClick={() => setSelectedType(type)}
                     >
                        <span>{type}</span>
                        <span>{data[type] ? data[type].length : 0}</span>
                     </li>
                  )
               })}
            </ul>
            <div className={`w-[46.875rem] h-full flex flex-col flex-grow-0 flex-wrap gap-[1.7rem]`}>
               {data[selectedType] && data[selectedType].length > 0 ? (
                  data[selectedType].map((video, index) => (
                     <div className='flex gap-[1.5625rem]' key={index}>
                        <img
                           src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                           className={`w-[22.5625rem] h-[12.691375rem] object-cover`}
                           alt={video.name} // Always good to add alt text for accessibility
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
      );
   }
};

export default Videos;
