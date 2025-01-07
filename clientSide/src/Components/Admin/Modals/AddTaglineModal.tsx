import React from 'react'

const AddTaglineModal = ({ isModalOpen, setIsModalOpen, tagline, setTagline, onSave }) => {

   return (
      isModalOpen && (
         <div className="absolute top-0 left-1/2 z-[100]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/2 bg-[#1E1E1E] text-white p-6 rounded-lg w-[43.75rem] shadow-2xl border border-[#CC511D]">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#CC511D]">Add Tagline</h2>
                  <button
                     onClick={() => {
                        setIsModalOpen(false);
                     }}
                     className="text-white hover:text-[#CC511D] transition duration-200"
                  >
                     ✕
                  </button>
               </div>
               <div>
                  <label for="tagline" className="block text-sm font-medium mb-2">Tagline</label>
                  <input
                     type="text"
                     className="w-full bg-[#2C2C2C] border border-[#444444] rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#CC511D]"
                     name='tagline'
                     placeholder="Enter tagline..."
                     value={tagline}
                     onChange={(e) => setTagline(e.target.value)}
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
                     onClick={onSave}
                  >
                     Save
                  </button>
               </div>
            </div>
         </div>
      )
   )
}

export default AddTaglineModal
