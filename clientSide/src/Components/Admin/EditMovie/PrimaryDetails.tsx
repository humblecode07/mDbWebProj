import React, { useEffect, useState } from 'react';
import { countryListApi, editPrimaryDetails, originalLanguageList } from '../../../api/api';
import OriginalMovieLanguage from './PrimaryDetails/OriginalMovieLanguage';
import OriginCountry from './PrimaryDetails/OriginCountry';
import OriginalTitle from './PrimaryDetails/OriginalTitle';
import TranslatedTitle from './PrimaryDetails/TranslatedTitle';
import TranslatedOverview from './PrimaryDetails/TranslatedOverview';
import MovieStatus from './PrimaryDetails/MovieStatus';
import AdultMovie from './PrimaryDetails/AdultMovie';
import Video from './PrimaryDetails/Video';
import Runtime from './PrimaryDetails/Runtime';
import Revenue from './PrimaryDetails/Revenue';
import Budget from './PrimaryDetails/Budget';
import Homepage from './PrimaryDetails/Homepage';
import SpokenLanguage from './PrimaryDetails/SpokenLanguage';
import { useParams } from 'react-router-dom';

const PrimaryDetails = ({ movieData }) => {
  const [languages, setLanguages] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [primaryDetails, setPrimaryDetails] = useState(() => ({
    original_language: movieData?.original_language || '',
    origin_country: movieData?.origin_country || [],
    original_title: movieData?.original_title || '',
    title: movieData?.title || '',
    overview: movieData?.overview || '',
    status: movieData?.status || '',
    adult: movieData?.adult || false,
    video: movieData?.video || false
  }));

  useEffect(() => {
    if (movieData) {
      setPrimaryDetails({
        original_language: movieData.original_language || '',
        origin_country: movieData.origin_country || [],
        original_title: movieData.original_title || '',
        title: movieData.title || '',
        overview: movieData.overview || '',
        status: movieData.status || '',
        adult: movieData.adult || false,
        video: movieData.video || false,
        runtime: movieData.runtime || '',
        revenue: movieData.revenue || '',
        budget: movieData.budget || '',
        homepage: movieData.homepage || ''
      });
    }
  }, [movieData]);

  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const languagesResponse = await originalLanguageList();
        const countriesResponse = await countryListApi();

        setLanguages(languagesResponse || []);
        setCountries(countriesResponse.results || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCountryList();
  }, []);

  const { movieId } = useParams();

  const handleSubmit = async () => {
    try {
      await editPrimaryDetails(movieId, primaryDetails);
      alert('Primary details have been successfully modified!');
    }
    catch (error) {
      console.error('Failed to create movie:', error);
    }
  };

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='primary-details--container'>
        <div className="section">
          <OriginalMovieLanguage
            primaryDetails={primaryDetails}
            setPrimaryDetails={setPrimaryDetails}
            languages={languages}
          />
          <OriginCountry
            primaryDetails={primaryDetails}
            setPrimaryDetails={setPrimaryDetails}
            countries={countries}
            filteredCountries={filteredCountries}
            setFilteredCountries={setFilteredCountries}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
        <div className='section'>
          <OriginalTitle
            primaryDetails={primaryDetails}
            setPrimaryDetails={setPrimaryDetails}
          />
          <TranslatedTitle
            primaryDetails={primaryDetails}
            setPrimaryDetails={setPrimaryDetails}
          />
        </div>
        <TranslatedOverview
          primaryDetails={primaryDetails}
          setPrimaryDetails={setPrimaryDetails}
        />
        <div className='section'>
          <MovieStatus
            primaryDetails={primaryDetails}
            setPrimaryDetails={setPrimaryDetails}
          />
          <AdultMovie
            primaryDetails={primaryDetails}
            setPrimaryDetails={setPrimaryDetails}
          />
        </div>
        <div className='section'>
          <Video
            primaryDetails={primaryDetails}
            setPrimaryDetails={setPrimaryDetails}
          />
          <Runtime
            primaryDetails={primaryDetails}
            setPrimaryDetails={setPrimaryDetails}
          />
        </div>
        <div className='section'>
          <Revenue
            primaryDetails={primaryDetails}
            setPrimaryDetails={setPrimaryDetails}
          />
          <Budget
            primaryDetails={primaryDetails}
            setPrimaryDetails={setPrimaryDetails}
          />
        </div>
        <Homepage
          primaryDetails={primaryDetails}
          setPrimaryDetails={setPrimaryDetails}
        />
        {/* <SpokenLanguage
          primaryDetails={primaryDetails}
          setPrimaryDetails={setPrimaryDetails}
        /> */}
        <div className='section section--button'>
          <button
            className='h-[2.125rem] px-[1.5625rem] bg-[#CC511D] text-[0.875rem] font-bold rounded-[.625rem]'
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default PrimaryDetails;
