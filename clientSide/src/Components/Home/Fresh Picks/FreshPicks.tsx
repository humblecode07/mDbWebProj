import React, { useState } from 'react'
import { TabSwitch } from '../../Button/Buttons'
import MovieCarousel from '../MovieCarousel';

const FreshPicks = () => {
   const [selectedPeriod, setSelectedPeriod] = useState(1);

   const handlePeriodChange = (value) => {
      setSelectedPeriod(value);
   };

   return (
      <div class="w-[66.625rem] font-roboto flex flex-col gap-[1.125rem] text-white dark:text-white">
         <div class="flex gap-[1.1rem] items-center">
            <h2 class="text-[1.5rem] font-bold text-black dark:text-[#FFF1E6]">Fresh Picks</h2>
            <TabSwitch
               section={0}
               selectedTab={selectedPeriod}
               onTabChange={handlePeriodChange}
               class="tab-switch"
            />
         </div>
         <span class="text-[.875rem] text-black dark:text-[#FFF1E6]">
            Explore the must-watch movies of the day or week, handpicked just for you.
         </span>
         <MovieCarousel
            section={0}
            query={`${selectedPeriod === 1 ? 'day' : 'week'}`}
            class="movie-carousel"
         />
      </div>

   );
}

export default FreshPicks
