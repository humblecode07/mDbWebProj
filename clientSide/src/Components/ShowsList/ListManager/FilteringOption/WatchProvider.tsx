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
      <div className='watch-provider--container'>
         <div className="watch-providers-section">
            <span className="watch-providers-title">WATCH PROVIDERS</span>
            <div className="dropdown-container">
               <div
                  className="dropdown-button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               >
                  <span className="dropdown-label">{selectedCountry.name}</span>
                  <ArrowIcon />
               </div>
               {isDropdownOpen && (
                  <div className="dropdown-list">
                     {countries.map((country) => {
                        return (
                           <div
                              key={country.iso_3166_1}
                              className="dropdown-item"
                              onClick={() => handleCountrySelect(country)}
                           >
                              {country.english_name}
                           </div>
                        );
                     })}
                  </div>
               )}
            </div>
         </div>
         <ul className="watch-provider-list">
            {watchProvider.map((data) => {
               const isSelected = filters.watchProviders.moviePlatform.includes(data.provider_id);

               return (
                  <li
                     key={data.provider_id}
                     className={`watch-provider-item ${isSelected ? 'selected' : ''}`}
                     onClick={() => handleMovieProviderToggle(data)}
                  >
                     <div className={`provider-icon-container ${isSelected ? 'selected' : 'not-selected'}`}>
                        <img
                           src={`https://image.tmdb.org/t/p/original${data.logo_path}`}
                           alt=""
                           className="rounded-[0.625rem]"
                        />
                        {isSelected && (
                           <div className="check-icon-container">
                              <CheckIcon />
                           </div>
                        )}
                     </div>
                  </li>
               );
            })}
         </ul>
      </div>
   )
}

export default WatchProvider