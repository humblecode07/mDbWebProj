import React from 'react'

const VideoUploadModal = ({ isModalOpen, setIsModalOpen, videoDetails, setVideoDetails, onUpload }) => {
   const handleChange = (e) => {
      const { name, value } = e.target;

      setVideoDetails({
         ...videoDetails,
         [name]: value
      })
   }

   console.log(videoDetails);

   return (
      isModalOpen && (
         <div className="edit-movie--modal">
            <div className="edit-movie--modal--container">
               <div className="menu--container">
                  <h2>Add Video</h2>
                  <button
                     onClick={() => {
                        setIsModalOpen(false);
                     }}
                  >
                     ✕
                  </button>
               </div>
               <div className="video-details-container">
                  <div className='input-group '>
                     <label for="type">Type</label>
                     <div className='select-wrapper'>
                        <div className='select-container'>
                           <select
                              name='type'
                              value={videoDetails.type}
                              onChange={handleChange}
                           >
                              <option value={'Trailer'}>Trailer</option>
                              <option value={'Teaser'}>Teaser</option>
                              <option value={'Clip'}>Clip</option>
                              <option value={'Behind the Scenes'}>Behind the Scenes</option>
                              <option value={'Bloopers'}>Bloopers</option>
                              <option value={'Featurette'}>Featurette</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className='input-group'>
                     <label for="size">Quality</label>
                     <div className='select-wrapper'>
                        <div className='select-container'>
                           <select
                              name='size'
                              value={videoDetails.size}
                              onChange={handleChange}
                           >
                              <option value={480}>Standard</option>
                              <option value={540}>HQ</option>
                              <option className='text-white bg-[#111111]' value={720}>HD (720p)</option>
                              <option value={1080}>HD (1080p)</option>
                              <option value={2160}>4K (2160p)</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className='input-group'>
                     <label for="key">Source Key</label>
                     <input
                        type="text"
                        name='key'
                        className="source-key-input"
                        placeholder="Enter source key..."
                        value={videoDetails.key}
                        onChange={handleChange}
                        required
                     />
                  </div>
                  <div className="button-container">
                     <button
                        onClick={() => {
                           setIsModalOpen(false);
                        }}
                        className="cancel-button"
                     >
                        Cancel
                     </button>
                     <button
                        className="save-button"
                        onClick={onUpload}
                     >
                        Save
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )
   )
}

export default VideoUploadModal
