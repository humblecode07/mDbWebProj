import React from 'react'

const TranslatedOverview = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, overview: e.target.value })
  }

  return (
    <div className="w-[51.6875rem] flex flex-col gap-2 font-roboto">
      <label htmlFor="overview" className="text-[.875rem] font-bold">
        Translated Overview (English)
      </label>
      <div className="w-full h-auto flex justify-center items-center bg-transparent border border-white rounded-sm">
        <div className='w-[50rem] h-auto'>
          <textarea
            id="overview"
            className="w-full text-[0.875rem] pt-[0.6875rem] bg-transparent outline-none resize-none"
            name="overview"
            placeholder="Enter movie overview..."
            minLength={10}
            value={primaryDetails.overview}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default TranslatedOverview
