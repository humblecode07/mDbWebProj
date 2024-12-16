import React, { useState } from 'react'
import ArrowIcon from '../../../assets/Icons/ArrowIcon'

const sortByMovie = [
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "title.asc", label: "Title Ascending" },
  { value: "title.desc", label: "Title Descending" },
  { value: "vote_average.asc", label: "Vote Average Ascending" },
  { value: "vote_average.desc", label: "Vote Average Descending" },
  { value: "vote_count.asc", label: "Vote Count Ascending" },
  { value: "vote_count.desc", label: "Vote Count Descending" }
];

const sortByTv = [
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "name.asc", label: "Name Ascending" },
  { value: "name.desc", label: "Name Descending" },
  { value: "vote_average.asc", label: "Vote Average Ascending" },
  { value: "vote_average.desc", label: "Vote Average Descending" },
  { value: "vote_count.asc", label: "Vote Count Ascending" },
  { value: "vote_count.desc", label: "Vote Count Descending" }
];

const SortByOption = ({ stream, selectedSorting, setSelectedSorting, resetCurrentPage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleSelectedSortBy(value, label) {
    setSelectedSorting({
      value,
      label
    })
    resetCurrentPage(1);
    setIsDropdownOpen(false);
  }

  return (
    <div className="sort-results-container">
      <span className="sort-label">Sort Results By</span>
      <div className="dropdown-wrapper">
        <button
          className="dropdown-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedSorting.label}</span>
          <ArrowIcon />
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {stream === "movie" && sortByMovie.map((option) => (
              <div
                key={option.value}
                className="dropdown-item"
                onClick={() => handleSelectedSortBy(option.value, option.label)}
              >
                {option.label}
              </div>
            ))}
            {stream === "tv" && sortByTv.map((option) => (
              <div
                key={option.value}
                className="dropdown-item"
                onClick={() => handleSelectedSortBy(option.value, option.label)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortByOption
