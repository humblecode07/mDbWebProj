import axios from 'axios';
import React, { useState } from 'react'

const fetchResults = async (value, setResults) => {
	try {
		if (!value.trim()) {
			setResults([]);
			return;
	  }

		const response = await axios.get(`https://api.themoviedb.org/3/search/person`, {
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
      
		const limitedResults = response.data.results.slice(0, 6);

		console.log(limitedResults)
		setResults(limitedResults)
	} catch (error) {
		console.error('Error fetching data:', error);
      setResults([]);
	}
};

const Search = ({ setResults, selectedPerson, type }) => {
   const [search, setSearch] = useState('');

   const handleChange = (search) => {
		if (!selectedPerson) {
         setSearch(search);
         fetchResults(search, setResults);
      }
	}

   return (
      <input
         type="text"
         className={`w-full bg-[#2C2C2C] border border-[#444444] rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#CC511D] ${selectedPerson ? 'cursor-not-allowed' : 'cursor-text'}`}
         placeholder={`Enter ${type === 'cast' ? 'cast' : 'crew'} member name`}
         value={selectedPerson ? selectedPerson.name : search}
         onChange={(e) => handleChange(e.target.value)}
         disabled={!!selectedPerson}
         required
      />
   )
}

export default Search
