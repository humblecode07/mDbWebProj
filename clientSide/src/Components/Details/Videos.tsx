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
         <div className="details--videos--container">
            <ul className="ul-container">
               {videoType.map((type) => (
                  <li
                     key={type}
                     className="li-item"
                     onClick={() => setSelectedType(type)}
                  >
                     <span>{type}</span>
                     <span>{data[type] ? data[type].length : 0}</span>
                  </li>
               ))}
            </ul>
            <div className="container">
               {data[selectedType] && data[selectedType].length > 0 ? (
                  data[selectedType].map((video, index) => {
                     if (video) {
                        return (
                           <div className="video-item" key={index}>
                              <img
                                 src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                                 alt={video.name}
                                 onClick={() => openVideoModal(video.key)} // Open video on thumbnail click
                              />
                              <section>
                                 <div className="video-info">
                                    <span className="video-name">{video.name}</span>
                                    <div className="video-metadata">
                                       <span>{video.type}</span>
                                       <span>•</span>
                                       <span>{convertDuration(video.youtubeData?.contentDetails?.duration)}</span>
                                       <span>•</span>
                                       <span>{formatDate(video.youtubeData.snippet.publishedAt)}</span>
                                    </div>
                                 </div>
                                 <div className="video-metadata--two">
                                    <YoutubeIcon />
                                    <span>{video.youtubeData.snippet.channelTitle}</span>
                                 </div>
                              </section>
                           </div>
                        );
                     }
                  })
               ) : (
                  <div>There are no English {selectedType?.toLocaleLowerCase()} added.</div>
               )}
            </div>

            {/* Fullscreen Video Modal */}
            {selectedVideo && (
               <div className="fullscreen-modal" onClick={closeModal}>
                  <button
                     className="absolute top-4 right-4 text-white text-xl font-bold w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                     onClick={closeModal}
                     aria-label="Close"
                  >
                     ×
                  </button>
                  <iframe
                     width="100%"
                     height="100%"
                     src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     title="YouTube Video"
                  />
               </div>
            )}
         </div>
      );
   }
};

export default Videos;
