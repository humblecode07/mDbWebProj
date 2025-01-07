import React from 'react'

const Budget = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, budget: e.target.value })
  }

  return (
    <div className='w-[25.5rem] flex flex-col gap-[0.5625rem] font-roboto'>
      <label htmlFor="budget" className='text-[.875rem] font-bold'>
        Budget (in US Dollars)
      </label>
      <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
        <div className='w-[23.85rem]'>
          <input
            id="budget"
            className='w-full text-[0.875rem] bg-transparent outline-none'
            name="budget"
            type="number"
            value={primaryDetails.budget}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Budget
