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
    <div className='text-white font-roboto flex flex-col gap-[0.875rem]'>
    <div className='flex items-center gap-[1.6875rem]'>
      <span className='text-[#ff8731] font-bold text-[.75rem]'>CERTIFICATION</span>
      <div className='relative'>
        <div
          className='w-[5.125rem] h-[2rem] bg-[#1C252F] flex items-center justify-between px-[1rem] rounded-[5px] cursor-pointer select-none'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className='text-[.75rem]'>{certCountry}</span>
          <ArrowIcon />
        </div>
        {isDropdownOpen && (
          <div className='absolute mt-2 bg-[#1C252F] rounded-[5px] w-full h-[15rem] overflow-auto z-10 text-[.75rem]'>
            {Object.keys(certifications).map((country) => (
              <div
                key={country}
                className='px-4 py-2 cursor-pointer hover:bg-gray-700'
                onClick={() => handleCertCountry(country)}
              >
                {country}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <div className='flex flex-wrap gap-[1.6875rem]'>
      {certifications[certCountry]?.map((cert, index) => {
        const isSelected = filters.certification?.rating?.includes(cert.certification);
        return (
          <button
            key={index}
            className={`px-[1rem] py-[0.4375rem] rounded-full text-[.75rem] ${isSelected ? 'bg-[#ff8731]' : 'bg-[#1C252F] hover:bg-[#2d3748]'
              } hover:scale-105 transition-transform`}
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
