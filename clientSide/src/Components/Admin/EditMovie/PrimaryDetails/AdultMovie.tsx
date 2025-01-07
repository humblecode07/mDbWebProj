import React from 'react'

const AdultMovie = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, adult: e.target.value === "true" })
  }

  return (
    <div className="w-[25.5rem] flex flex-col gap-[0.5625rem] font-roboto">
      <label htmlFor="adult_movie" className="text-[.875rem] font-bold">
        Adult Movie?
      </label>
      <div className="w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm">
        <select
          id="adult_movie"
          className="w-full h-full bg-transparent text-[.875rem] border-none outline-none px-2 bg-black text-white border-[1px] border-[#CC511D] rounded-sm"
          value={primaryDetails.adult ? "true" : "false"}
          onChange={handleChange}
        >
          <option
            className='bg-black text-white border-solid border-[1px] border-[#CC511D] rounded-sm'
            value="false"
          >
            No
          </option>
          <option
            className='bg-black text-white border-solid border-[1px] border-[#CC511D] rounded-sm'
            value="true"
          >
            Yes
          </option>
        </select>
      </div>
    </div>
  )
}

export default AdultMovie