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
         <div className="edit-movie--modal">
            <div className="edit-movie--modal--container">
               <div className="menu--container">
                  <h2>Add Release Date</h2>
                  <button
                     onClick={() => {
                        setIsModalOpen(false);
                     }}
                  >
                     ✕
                  </button>
               </div>
               <div className="add-release--container">
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
                  <div className='input-group'>
                     <label for="date">Tagline</label>
                     <input
                        type="date"
                        className="date-input"
                        name='date'
                        placeholder="Follow this date format YYYY-MM-DD"
                        value={releaseDate.release_date}
                        onChange={(e) => setReleaseDate({ ...releaseDate, release_date: e.target.value })}
                        required
                     />
                  </div>
                  <div className='input-group'>
                     <label for="type">Type</label>
                     <div className='select-container'>
                        <div className='select-wrapper'>
                           <select
                              name='type'
                              value={releaseDate.type}
                              onChange={(e) => setReleaseDate({ ...releaseDate, type: e.target.value })}
                           >
                              <option value={1}>Premiere</option>
                              <option value={2}>Theatrical (limited)</option>
                              <option value={3}>Theatrical</option>
                              <option value={4}>Digital</option>
                              <option value={5}>Physical</option>
                              <option value={6}>TV</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className='input-group'>
                     <label for="note">Note</label>
                     <input
                        type="text"
                        className="date-input"
                        name='note'
                        placeholder="Enter a note..."
                        value={releaseDate.note}
                        onChange={(e) => setReleaseDate({ ...releaseDate, note: e.target.value })}
                        required
                     />
                  </div>
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
