import React, { useState } from 'react'
import SearchIcon from '../../../assets/Icons/SearchIcon'
import SearchResultList from './SearchResultList';
import Search from './Search';

const SearchBar = () => {
	const [results, setResults] = useState([]);

	return (
		<div className='relative' >
			<div className='w-[24.9375rem] min-h-[2rem] flex items-center bg-[#D9D9D9] rounded-[2px] dark:bg-[#1C252F] ml-[2rem]'>
				<SearchIcon />
				<Search setResults={setResults} />
			</div>
			{results && results.length > 0 && <SearchResultList results={results}/>}
		</div>

	)
}

export default SearchBar
