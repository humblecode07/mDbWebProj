import React, { useEffect, useState } from 'react';
import { fetchGenreList } from '../../../api/api';

const AddGenreModal = ({ isModalOpen, setIsModalOpen, genre, setGenre, onSave }) => {
   const [genreList, setGenreList] = useState([]);

   useEffect(() => {
      const fetchGenres = async () => {
         try {
            const response = await fetchGenreList();
            setGenreList(response.genres);
         }
         catch (error) {
            console.log('An error occurred during the process', error);
         }
      };

      fetchGenres();
   }, []);

   return (
      isModalOpen && (
         <div className="absolute top-0 left-1/2 z-[100]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/2 bg-[#1E1E1E] text-white p-6 rounded-lg w-[43.75rem] shadow-2xl border border-[#CC511D]">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#CC511D]">Add Genre</h2>
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
                     <label for="type" className="block text-sm font-medium mb-2">Genres</label>
                     <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
                        <div className='w-[38.75rem]'>
                           <select
                              name='type'
                              className='w-full bg-transparent text-white border-none outline-none text-[0.875rem] cursor-pointer'
                              value={genre}
                              onChange={(e) => setGenre(e.target.value)}
                           >
                              {genreList.map((genre) => {
                                 return (
                                    <option className='text-white bg-[#111111]' value={genre.name}>{genre.name}</option>
                                 )
                              })}
                           </select>
                        </div>
                     </div>
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
                     onClick={onSave}
                  >
                     Save
                  </button>
               </div>
            </div>
         </div>
      )
   );
};

export default AddGenreModal;
