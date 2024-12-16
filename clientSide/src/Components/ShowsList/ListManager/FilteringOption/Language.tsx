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
    <div className="fo-language--container">
      <span className="language-title">LANGUAGE</span>
      <div className="language-dropdown-container">
        <div
          className="language-dropdown"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="dropdown-text">{originalLanguage}</span>
          <ArrowIcon />
        </div>
        {isDropdownOpen && (
          <div className="language-options">
            {languages.map((language) => (
              <div
                key={language.iso_639_1}
                className="language-option"
                onClick={() =>
                  handleLanguageSelect(language.iso_639_1, language.english_name)
                }
              >
                {language.english_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  )
}

export default Language
