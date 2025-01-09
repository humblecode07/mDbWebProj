import React from 'react'
import CompactViewIcon from '../../../assets/Icons/CompactViewIcon'
import GridViewIcon from '../../../assets/Icons/GridViewIcon'

const DisplayViewOption = ({ setSelectedView, resetCurrentPage }) => {
  return (
    <div className='flex items-center gap-[0.9375rem] font-roboto text-[1rem] text-white'>
      <span className='font-bold'>View</span>
      <button
        className='h-[2.25rem] w-[2.25rem] bg-[#1C252F] rounded-full flex items-center justify-center transition-transform transform hover:scale-110 hover:bg-[#2C3E50] focus:outline-none'
        aria-label="Compact View"
        onClick={() => {
          resetCurrentPage(1)
          setSelectedView(0)
        }}
      >
        <CompactViewIcon />
      </button>
      <button
        className='h-[2.25rem] w-[2.25rem] bg-[#1C252F] rounded-full flex items-center justify-center transition-transform transform hover:scale-110 hover:bg-[#2C3E50] focus:outline-none'
        aria-label="Grid View"
        onClick={() => {
          resetCurrentPage(1)
          setSelectedView(1)
        }}
      >
        <GridViewIcon />
      </button>
    </div>
  )
}

export default DisplayViewOption
