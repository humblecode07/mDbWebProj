import React from 'react'

const TranslatedTitle = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, title: e.target.value })
  }

  return (
    <div className='w-[25.5rem] flex flex-col gap-[0.5625rem] font-roboto'>
      <label htmlFor="title" className='text-[.875rem] font-bold'>
        Translated Title (English)
      </label>
      <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
        <div className='w-[23.85rem]'>
          <input
            id="title"
            className='w-full text-[0.875rem] bg-transparent outline-none'
            name="title"
            placeholder="Enter the translated name of the movie..."
            type="text"
            value={primaryDetails.title}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default TranslatedTitle
