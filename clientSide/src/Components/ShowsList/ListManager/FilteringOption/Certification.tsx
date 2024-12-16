import React, { useContext, useEffect, useState } from 'react';
import ArrowIcon from '../../../../assets/Icons/ArrowIcon';
import { certificationList } from '../../../../api/api';
import { ContextMovies } from '../../../../pages/Lists/MovieList';
import { ContextTvShows } from '../../../../pages/Lists/TvList';

const Certification = () => {
  const moviesContext = useContext(ContextMovies);
  const tvShowsContext = useContext(ContextTvShows);
  const context = moviesContext || tvShowsContext;
  const { streamType, filters, handleFilterChange, setCurrentPage } = context || {};
  const [certifications, setCertifications] = useState({});
  const [certCountry, setCertCountry] = useState(filters.certification.certCountry);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const results = await certificationList(streamType);
        setCertifications(results);
      } catch (error) {
        console.log('Error during fetching of data', error);
      }
    };

    fetchCertifications();
  }, [streamType]);

  function handleCertCountry(countryCode) {
    setCertCountry(countryCode);

    const updatedCertifications = {
      ...filters.certification,
      certCountry: countryCode
    };

    handleFilterChange('certification', updatedCertifications);
    setIsDropdownOpen(false);
  }

  function handleCertifications(rating) {
    const updatedRatings = filters.certification?.rating?.includes(rating)
      ? filters.certification.rating.filter(cert => cert !== rating)
      : [...(filters.certification?.rating || []), rating];

    const updatedCertifications = {
      rating: updatedRatings,
      certCountry: certCountry
    };

    handleFilterChange('certification', updatedCertifications);
    setCurrentPage(1);
  }

  return (
    <div className='fo-certification--container'>
      <div className='wrapper'>
        <span className='filter-title'>CERTIFICATION</span>
        <div className='item-container'>
          <div
            className="dropdown-container"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className='dropdown-text'>{certCountry}</span>
            <ArrowIcon />
          </div>
          {isDropdownOpen && (
            <div className='dropdown-menu'>
              {Object.keys(certifications).map((country) => (
                <div
                  key={country}
                  className='dropdown-item'
                  onClick={() => handleCertCountry(country)}
                >
                  {country}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="certification-container">
        {certifications[certCountry]?.map((cert, index) => {
          const isSelected = filters.certification?.rating?.includes(cert.certification);
          return (
            <button
              key={index}
              className={`certification-button ${isSelected ? 'selected' : ''}`}
              onClick={() => handleCertifications(cert.certification)}
            >
              <span>{cert.certification}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Certification;
