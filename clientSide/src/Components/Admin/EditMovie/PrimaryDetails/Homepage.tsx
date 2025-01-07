import React from 'react'

const Homepage = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, homepage: e.target.value })
  }

  return (
    <div className='w-[51.6875rem] flex flex-col gap-[0.5625rem] font-roboto'>
      <label htmlFor="homepage" className='text-[.875rem] font-bold'>
        Homepage 
      </label>
      <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
        <div className='w-[50rem]'>
          <input
            id="homepage"
            className='w-full text-[0.875rem] bg-transparent outline-none'
            name="homepage"
            placeholder="Enter movie's webpage..."
            type="url"
            pattern="https?://.+"
            value={primaryDetails.homepage}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Homepage