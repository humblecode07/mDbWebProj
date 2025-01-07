import axios from 'axios';
import React from 'react'

const fetchResults = async (value, setResults) => {
  try {
    if (!value.trim()) {
      setResults([]);
      return;
    }

    const response = await axios.get(`https://api.themoviedb.org/3/configuration/languages`, {
      params: {
        query: value,
        include_adult: false,
        language: 'en-US',
        page: 1
      },
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const filterLanguage = response.data.filter(language =>
      language.english_name.toLowerCase().includes(value.toLowerCase()) ||
      language.iso_639_1.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filterLanguage)
  } catch (error) {
    console.error('Error fetching data:', error);
    setResults([]);
  }
};

const LanguageSearch = ({ setResults, releaseDate, setReleaseDate }) => {
  const handleChange = (search) => {
    setReleaseDate({ ...releaseDate, language: search });
    fetchResults(search, setResults);
  }

  return (
    <input
      type="text"
      className="w-full bg-[#2C2C2C] border border-[#444444] rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#CC511D]"
      placeholder="Search a language..."
      value={releaseDate.language}
      onChange={(e) => handleChange(e.target.value)}
      required
    />
  )
}

export default LanguageSearch
