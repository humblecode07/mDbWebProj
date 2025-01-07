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
         <div className="absolute top-0 left-1/2 z-[100]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/2 bg-[#1E1E1E] text-white p-6 rounded-lg w-[43.75rem] shadow-2xl border border-[#CC511D]">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#CC511D]">Add Video</h2>
                  <button
                     onClick={() => {
                        setIsModalOpen(false);
                     }}
                     className="text-white hover:text-[#CC511D] transition duration-200"
                  >
                     ✕
                  </button>
               </div>
               <div className="space-y-4">
                  <div>
                     <label for="type" className="block text-sm font-medium mb-2">Type</label>
                     <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
                        <div className='w-[39.625rem]'>
                           <select
                              name='type'
                              className='w-full h-full bg-transparent text-white border-none outline-none text-[0.875rem] cursor-pointer'
                              value={videoDetails.type}
                              onChange={handleChange}
                           >
                              <option className='text-white bg-[#111111]' value={'Trailer'}>Trailer</option>
                              <option className='text-white bg-[#111111]' value={'Teaser'}>Teaser</option>
                              <option className='text-white bg-[#111111]' value={'Clip'}>Clip</option>
                              <option className='text-white bg-[#111111]' value={'Behind the Scenes'}>Behind the Scenes</option>
                              <option className='text-white bg-[#111111]' value={'Bloopers'}>Bloopers</option>
                              <option className='text-white bg-[#111111]' value={'Featurette'}>Featurette</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div>
                     <label for="size" className="block text-sm font-medium mb-2">Quality</label>
                     <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
                        <div className='w-[39.625rem]'>
                           <select
                              name='size'
                              className='w-full h-full bg-transparent text-white border-none outline-none text-[0.875rem] cursor-pointer'
                              value={videoDetails.size}
                              onChange={handleChange}
                           >
                              <option className='text-white bg-[#111111]' value={480}>Standard</option>
                              <option className='text-white bg-[#111111]' value={540}>HQ</option>
                              <option className='text-white bg-[#111111]' value={720}>HD (720p)</option>
                              <option className='text-white bg-[#111111]' value={1080}>HD (1080p)</option>
                              <option className='text-white bg-[#111111]' value={2160}>4K (2160p)</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div>
                     <label for="key" className="block text-sm font-medium mb-2">Source Key</label>
                     <input
                        type="text"
                        className="w-full bg-[#2C2C2C] border border-[#444444] rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#CC511D]"
                        name='key'
                        placeholder="Enter source key..."
                        value={videoDetails.key}
                        onChange={handleChange}
                        required
                     />
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                     <button
                        onClick={() => {
                           setIsModalOpen(false);
                        }}
                        className="px-4 py-2 bg-[#444444] text-white rounded-md hover:bg-[#555555] transition duration-200"
                     >
                        Cancel
                     </button>
                     <button
                        className="px-4 py-2 bg-[#CC511D] text-white rounded-md hover:bg-[#FF7031] transition duration-200"
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
