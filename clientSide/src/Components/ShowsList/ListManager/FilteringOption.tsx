import React, { useState } from 'react'
import FilterIcon from '../../../assets/Icons/FilterIcon'
import XIcon from '../../../assets/Icons/XIcon';
import Genres from './FilteringOption/Genres';
import Divider from '../Divider';
import WatchProvider from './FilteringOption/WatchProvider';
import UserRating from './FilteringOption/UserRating';
import ReleaseYear from './FilteringOption/ReleaseYear';
import Runtime from './FilteringOption/Runtime';
import Certification from './FilteringOption/Certification';
import Language from './FilteringOption/Language';
import Keywords from './FilteringOption/Keywords';

const FilteringOption = () => {
   const [openFilterModal, setOpenFilterModal] = useState(false);

   function openModal() {
      setOpenFilterModal(!openFilterModal)
   }

   return (
      <>
         <button
            className='filter-button'
            onClick={openModal}
         >
            <FilterIcon />
            <span>Filtering Options</span>
         </button>
         {openFilterModal &&
            <div className='filter-modal-overlay'>
               <div className='modal-background'></div>
               <div className='modal-container'>
                  <div className='modal-content'>
                     <button
                        className='close-button'
                        onClick={openModal}
                     >
                        <XIcon />
                     </button>
                     <Genres />
                     <Divider />
                     <WatchProvider />
                     <Divider />
                     <Certification />
                     <Divider />
                     <div className='filter-sections'>
                        <Language />
                        <Keywords />
                     </div>
                     <Divider />
                     <ReleaseYear />
                     <Divider />
                     <UserRating />
                     <Divider />
                     <Runtime />
                  </div>
               </div>
            </div>
         }
      </>
   )
}

export default FilteringOption
