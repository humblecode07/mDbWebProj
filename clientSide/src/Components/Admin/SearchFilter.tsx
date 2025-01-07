import React from 'react'
import SearchIcon from '../../assets/Icons/Admin/SearchIcon'

const SearchFilter = ({ searchTerm, setSearchTerm, movies, setFilteredMovies }) => {

   const handleSearch = (e) => {
      const term = e.target.value.toLowerCase();
      setSearchTerm(term);
      setFilteredMovies(
         movies.filter((movie) =>
            movie.title.toLowerCase().includes(term)
         )
      );
   };

   return (
      <div className='w-[24.34375rem] h-[2.5rem] flex items-center border-solid border-b-[1px] border-[#FFFFFF]'>
         <div className='w-[22.9375rem] h-[1.125rem] flex ml-[.5rem] gap-[0.8125rem]'>
            <SearchIcon />
            <input
               className='w-full font-roboto font-light bg-transparent outline-none text-white'
               type="text"
               placeholder='Search by movie name'
               value={searchTerm}
               onChange={handleSearch}
            />
         </div>
      </div>
   )
}

export default SearchFilter
