import React from 'react'

const Revenue = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, revenue: e.target.value })
  }

  return (
    <div className='w-[25.5rem] flex flex-col gap-[0.5625rem] font-roboto'>
      <label htmlFor="revenue" className='text-[.875rem] font-bold'>
        Revenue (in US Dollars)
      </label>
      <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
        <div className='w-[23.85rem]'>
          <input
            id="revenue"
            className='w-full text-[0.875rem] bg-transparent outline-none'
            name="revenue"
            type="number"
            value={primaryDetails.revenue}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Revenue
