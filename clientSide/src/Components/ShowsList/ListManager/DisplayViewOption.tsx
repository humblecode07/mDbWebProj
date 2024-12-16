import React from 'react'
import CompactViewIcon from '../../../assets/Icons/CompactViewIcon'
import GridViewIcon from '../../../assets/Icons/GridViewIcon'

const DisplayViewOption = ({ setSelectedView, resetCurrentPage }) => {
  return (
    <div className='view-selector'>
      <span className='view-label'>View</span>
      <button
        className='view-button'
        aria-label="Compact View"
        onClick={() => {
          resetCurrentPage(1)
          setSelectedView(0)
        }}
      >
        <CompactViewIcon />
      </button>
      <button
        className='view-button'
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
