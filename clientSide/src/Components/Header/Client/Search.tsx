import React, { useState } from 'react'
import axios from 'axios';
import { axiosPrivate } from '../../../api/api';

const fetchResults = async (value, setResults) => {
	try {
		if (!value.trim()) {
			setResults([]);
			return;
		}

		const [tmdbResponse, privateResponse] = await Promise.all([
			axios.get(`https://api.themoviedb.org/3/search/multi`, {
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
			}),
			axiosPrivate.get(`/search?query=${encodeURIComponent(value)}`)
		]);

		const tmdbResults = tmdbResponse.data.results;
		const privateResults = privateResponse.data.movies;

		const combinedResults = [
			...tmdbResults,
			...privateResults
		];
		const limitedResults = combinedResults.slice(0, 6);

		// console.log(limitedResults)
		setResults(limitedResults)
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

const Search = ({ setResults }) => {
	const [search, setSearch] = useState('');

	const handleChange = (search) => {
		setSearch(search);
		fetchResults(search, setResults);
	}

	return (
		<input
			className='w-full font-roboto text-[0.875rem] bg-transparent focus:outline-none dark:text-white' type="text"
			placeholder='Search for movies, tv shows, or actors...'
			value={search}
			onChange={(e) => handleChange(e.target.value)}
		/>
	)
}

export default Search
