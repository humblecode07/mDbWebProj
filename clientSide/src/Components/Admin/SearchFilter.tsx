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
      <div className="admin--search-container">
         <div className="search-input-wrapper">
            <SearchIcon />
            <input
               className="search-input"
               type="text"
               placeholder="Search by movie name"
               value={searchTerm}
               onChange={handleSearch}
            />
         </div>
      </div>
   )
}

export default SearchFilter
