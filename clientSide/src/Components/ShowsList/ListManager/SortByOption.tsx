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
    <div className='flex items-center gap-[0.6875rem] font-roboto text-[1rem] text-white'>
      <span className='font-bold'>Sort Results By</span>
      <div className='relative'>
        <button
          className='w-[14.5rem] h-[2.25rem] flex justify-between items-center gap-[0.8125rem] text-white bg-[#1C252F] rounded-[0.625rem] text-[0.875rem] px-3 transition-colors hover:bg-[#2C3E50] focus:outline-none'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedSorting.label}</span>
          <ArrowIcon />
        </button>
        {isDropdownOpen && (
          <div className='absolute top-full left-0 w-full mt-2 bg-[#1C252F] rounded-md shadow-lg z-[3]'>
            {stream === "movie" && sortByMovie.map((option) => (
              <div
                key={option.value}
                className='px-4 py-2 text-white cursor-pointer hover:bg-[#2C3E50] transition-colors'
                onClick={() => handleSelectedSortBy(option.value, option.label)}
              >
                {option.label}
              </div>
            ))}
            {stream === "tv" && sortByTv.map((option) => (
              <div
                key={option.value}
                className='px-4 py-2 text-white cursor-pointer hover:bg-[#2C3E50] transition-colors'
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
