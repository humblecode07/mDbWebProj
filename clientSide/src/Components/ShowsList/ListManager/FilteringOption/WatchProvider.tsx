import React, { useContext, useEffect, useState } from 'react'
import { countryListApi, watchProviderApi } from '../../../../api/api';
import ArrowIcon from '../../../../assets/Icons/ArrowIcon';
import CheckIcon from '../../../../assets/Icons/CheckIcon';
import { ContextMovies } from '../../../../pages/Lists/MovieList';
import { ContextTvShows } from '../../../../pages/Lists/TvList';

const WatchProvider = () => {
   const moviesContext = useContext(ContextMovies);
   const tvShowsContext = useContext(ContextTvShows);
   const context = moviesContext || tvShowsContext;
   const { streamType, filters, handleFilterChange, setCurrentPage } = context || {};
   const [countries, setCountries] = useState([]);
   const [selectedCountry, setSelectedCountry] = useState({
      name: filters.watchProviders.name,
      iso_3166_1: filters.watchProviders.watchRegion
   });
   const [watchProvider, setWatchProvider] = useState([])
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   useEffect(() => {
      const fetchWatchProvider = async () => {
         try {
            const countryListResults = await countryListApi();
            setCountries(countryListResults.results);

            const watchProviderResults = await watchProviderApi(streamType, selectedCountry.iso_3166_1);
            setWatchProvider(watchProviderResults.results);
         }
         catch (error) {
            console.log('Error during fetching of data', error);
         }
      }

      fetchWatchProvider();
   }, [streamType, selectedCountry.iso_3166_1])

   function handleCountrySelect(country) {
      setSelectedCountry({
         name: country.english_name,
         iso_3166_1: country.iso_3166_1
      });

      handleFilterChange('watchProviders', {
         name: country.english_name,
         watchRegion: country.iso_3166_1,
      });
      setIsDropdownOpen(false);
      setCurrentPage(1);
   }

   function handleMovieProviderToggle(providerData) {
      const { provider_id } = providerData;

      const updatedMoviePlatforms = filters.watchProviders.moviePlatform.includes(provider_id)
         ? filters.watchProviders.moviePlatform.filter(id => id !== provider_id)
         : [...filters.watchProviders.moviePlatform, provider_id];

      handleFilterChange('watchProviders', {
         name: selectedCountry.name,
         moviePlatform: updatedMoviePlatforms,
         watchRegion: selectedCountry.iso_3166_1
      });
      setCurrentPage(1);
   }

   return (
      <div className='text-white font-roboto flex flex-col gap-[0.875rem]'>
         <div className='flex items-center gap-[1.6875rem]'>
            <span className='text-[#ff8731] font-bold text-[.75rem]'>WATCH PROVIDERS</span>
            <div className='relative'>
               <div
                  className='w-[12.125rem] h-[2rem] bg-[#1C252F] flex items-center justify-between px-[1rem] rounded-[5px] cursor-pointer select-none'
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               >
                  <span className='text-[.75rem]'>{selectedCountry.name}</span>
                  <ArrowIcon />
               </div>
               {isDropdownOpen && (
                  <div className='w-[12.125rem] max-h-[12rem] bg-[#1C252F] rounded-[5px] mt-[0.5rem] absolute overflow-auto z-[3]'>
                     {countries.map((country) => {
                        return (
                           <div
                              key={country.iso_3166_1}
                              className='px-[1rem] py-[0.5rem] text-[.75rem] cursor-pointer hover:bg-[#ff8731] rounded-[5px] select-none'
                              onClick={() => handleCountrySelect(country)}
                           >
                              {country.english_name}
                           </div>
                        )
                     })}
                  </div>
               )}
            </div>
         </div>
         <ul className='flex gap-[1.375rem] flex-wrap'>
            {watchProvider.map((data) => {
               const isSelected = filters.watchProviders.moviePlatform.includes(data.provider_id);

               return (
                  <li
                     key={data.provider_id}
                     className={`w-[3.125rem] h-[3.125rem] cursor-pointer rounded-[0.625rem] select-none ${isSelected ? 'bg-[#ff8731] border-2 border-[#ff8731]' : 'bg-[#1C252F]'} transition duration-300 ease-in-out`}
                     onClick={() => handleMovieProviderToggle(data)}
                  >
                     <div className={`relative w-full h-full flex items-center justify-center ${isSelected ? 'opacity-100' : 'opacity-50'}`}>
                        <img
                           src={`https://image.tmdb.org/t/p/original${data.logo_path}`}
                           alt=""
                           className='rounded-[0.625rem]'
                        />
                        {isSelected && (
                           <div className='absolute inset-0 flex items-center justify-center'>
                              <CheckIcon />
                           </div>
                        )}
                     </div>
                  </li>
               )
            })}
         </ul>
      </div>
   )
}

export default WatchProvider