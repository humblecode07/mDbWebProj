import React from 'react'

const AddTaglineModal = ({ isModalOpen, setIsModalOpen, tagline, setTagline, onSave }) => {

   return (
      isModalOpen && (
         <div className="edit-movie--modal">
            <div className="edit-movie--modal--container">
               <div className="menu--container">
                  <h2>Add Tagline</h2>
                  <button
                     onClick={() => {
                        setIsModalOpen(false);
                     }}
                  >
                     ✕
                  </button>
               </div>
               <div className='input-group'>
                  <label for="tagline">Tagline</label>
                  <input
                     type="text"
                     className="tagline-input"
                     name='tagline'
                     placeholder="Enter tagline..."
                     value={tagline}
                     onChange={(e) => setTagline(e.target.value)}
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
