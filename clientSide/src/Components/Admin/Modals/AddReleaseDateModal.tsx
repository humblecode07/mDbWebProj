import React, { useState } from 'react'
import CountrySearchBar from '../EditMovie/ReleaseDates/CountrySearchBar';
import LanguageSearchBar from '../EditMovie/ReleaseDates/LanguageSearchBar';
import CertificationsSelect from '../EditMovie/ReleaseDates/CertificationsSelect';

const AddReleaseDateModal = ({ isModalOpen, setIsModalOpen, onSave }) => {
   const [releaseDate, setReleaseDate] = useState({
      country: {
         name: "",
         iso_3166_1: ""
      },
      language: "",
      descriptors: [],
      note: "",
      certification: "",
      release_date: null,
      type: 3
   })

   console.log(releaseDate);

   return (
      isModalOpen && (
         <div className="absolute top-0 left-1/2 z-[100]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/2 bg-[#1E1E1E] text-white p-6 rounded-lg w-[43.75rem] shadow-2xl border border-[#CC511D]">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#CC511D]">Add Release Date</h2>
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
                  <CountrySearchBar
                     releaseDate={releaseDate}
                     setReleaseDate={setReleaseDate}
                  />
                  <LanguageSearchBar
                     releaseDate={releaseDate}
                     setReleaseDate={setReleaseDate}
                  />
                  <CertificationsSelect
                     releaseDate={releaseDate}
                     setReleaseDate={setReleaseDate}
                  />
                  <div>
                     <label for="date" className="block text-sm font-medium mb-2">Tagline</label>
                     <input
                        type="date"
                        className="w-full bg-[#2C2C2C] border border-[#444444] rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#CC511D]"
                        name='date'
                        placeholder="Follow this date format YYYY-MM-DD"
                        value={releaseDate.release_date}
                        onChange={(e) => setReleaseDate({ ...releaseDate, release_date: e.target.value })}
                        required
                     />
                  </div>
                  <div>
                     <label for="type" className="block text-sm font-medium mb-2">Type</label>
                     <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
                        <div className='w-[39.625rem]'>
                           <select
                              name='type'
                              className='w-full h-full bg-transparent text-white border-none outline-none text-[0.875rem] cursor-pointer'
                              value={releaseDate.type}
                              onChange={(e) => setReleaseDate({ ...releaseDate, type: e.target.value })}
                           >
                              <option className='text-white bg-[#111111]' value={1}>Premiere</option>
                              <option className='text-white bg-[#111111]' value={2}>Theatrical (limited)</option>
                              <option className='text-white bg-[#111111]' value={3}>Theatrical</option>
                              <option className='text-white bg-[#111111]' value={4}>Digital</option>
                              <option className='text-white bg-[#111111]' value={5}>Physical</option>
                              <option className='text-white bg-[#111111]' value={6}>TV</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div>
                     <label for="note" className="block text-sm font-medium mb-2">Note</label>
                     <input
                        type="text"
                        className="w-full bg-[#2C2C2C] border border-[#444444] rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#CC511D]"
                        name='note'
                        placeholder="Enter a note..."
                        value={releaseDate.note}
                        onChange={(e) => setReleaseDate({ ...releaseDate, note: e.target.value })}
                        required
                     />
                  </div>
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
                     onClick={() => onSave(releaseDate)}
                  >
                     Save
                  </button>
               </div>
            </div>
         </div>
      )
   );
}

export default AddReleaseDateModal
