import React from 'react'

const OriginalTitle = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, original_title: e.target.value })
  }

  return (
    <div className='w-[25.5rem] flex flex-col gap-[0.5625rem] font-roboto'>
      <label htmlFor="original_title" className='text-[.875rem] font-bold'>
        Original Name
      </label>
      <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
        <div className='w-[23.85rem]'>
          <input
            id="original_title"
            className='w-full text-[0.875rem] bg-transparent outline-none'
            name="original_title"
            placeholder="Enter the original name of the movie..."
            type="text"
            value={primaryDetails.original_title}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default OriginalTitle