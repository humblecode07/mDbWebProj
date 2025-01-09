import React, { useContext, useEffect, useState } from 'react'
import ArrowIcon from '../../../../assets/Icons/ArrowIcon'
import { originalLanguageList } from '../../../../api/api';
import { ContextMovies } from '../../../../pages/Lists/MovieList';
import { ContextTvShows } from '../../../../pages/Lists/TvList';

const Language = () => {
  const moviesContext = useContext(ContextMovies);
  const tvShowsContext = useContext(ContextTvShows);
  const context = moviesContext || tvShowsContext;
  const { filters, handleFilterChange, setCurrentPage } = context || {};
  const [languages, setLanguages] = useState([]);
  const [originalLanguage, setOriginalLanguage] = useState(
    filters.originalLanguage?.english_name || 'No Language'
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchLanguages = async () => {
    try {
      const results = await originalLanguageList();
      setLanguages(results);
    }
    catch (error) {
      console.log('Error during fetching of data', error);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  function handleLanguageSelect(langCode, langName) {
    const updatedLanguage = {
      iso_639_1: langCode,
      english_name: langName
    };

    setOriginalLanguage(langName);
    handleFilterChange('originalLanguage', updatedLanguage);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  }

  return (
    <div className='text-white font-roboto flex flex-col gap-[0.875rem]'>
      <span className='text-[#ff8731] font-bold text-[.75rem]'>LANGUAGE</span>
      <div className='relative'>
        <div
          className='w-[16.375rem] h-[2rem] bg-[#1C252F] flex items-center justify-between px-[1rem] rounded-[5px] cursor-pointer select-none'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className='text-[.75rem]'>{originalLanguage}</span>
          <ArrowIcon />
        </div>
        {isDropdownOpen && (
          <div className='w-[16.375rem] max-h-[12rem] bg-[#1C252F] rounded-[5px] mt-[0.5rem] absolute overflow-auto z-[3]'>
            {languages.map((language) => {
              return (
                <div
                  key={language.iso_639_1}
                  className='px-[1rem] py-[0.5rem] text-[.75rem] cursor-pointer hover:bg-[#ff8731] rounded-[5px] select-none'
                  onClick={() => handleLanguageSelect(language.iso_639_1, language.english_name)}
                >
                  {language.english_name}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Language
