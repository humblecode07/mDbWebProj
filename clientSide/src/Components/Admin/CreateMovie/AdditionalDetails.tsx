import React from 'react'

const AdditionalDetails = ({ movieDetails, dispatch }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_MOVIE_DETAILS',
      payload: {
        [name]: value === "true" ? true : value === "false" ? false : value,
      },
    });
  };

  return (
    <div className='flex flex-col gap-[1.125rem]'>
      <span className='text-[1.5rem] font-bold'>Additional Details</span>
      <div className='w-full flex flex-col gap-[0.5625rem] font-roboto'>
        <label htmlFor="adult" className='text-[1.25rem] font-bold'>
          Adult Movie?
        </label>
        <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
          <div className='w-[49.5625rem]'>
            <select
              id='adult'
              className='w-full h-full bg-transparent text-white border-none outline-none text-[0.875rem] '
              name='adult'
              value={movieDetails.adult}
              onChange={handleChange}
            >
              <option className='text-white bg-[#111111]' value="true">Yes</option>
              <option className='text-white bg-[#111111]' value="false">No</option>
            </select>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col gap-[0.5625rem] font-roboto'>
        <label htmlFor="video" className='text-[1.25rem] font-bold'>
          Video?
        </label>
        <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
          <div className='w-[49.5625rem]'>
            <select
              id='video'
              className='w-full h-full bg-transparent text-white border-none outline-none'
              name='video'
              value={movieDetails.video}
              onChange={handleChange}
            >
              <option className='text-white bg-[#111111]' value="true">Yes</option>
              <option className='text-white bg-[#111111]' value="false">No</option>
            </select>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col gap-[0.5625rem] font-roboto'>
        <label htmlFor="tagline" className='text-[1.25rem] font-bold'>
          Tagline <span className='text-[#939393] text-[1rem]'>(English)</span>
        </label>
        <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
          <div className='w-[49.5625rem]'>
            <input
              id="tagline"
              className='w-full text-[0.875rem] bg-transparent outline-none'
              name="tagline"
              placeholder="Enter movie's tagline..."
              type="text"
              onChange={handleChange}
              value={movieDetails.tagline}
            />
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col gap-[0.5625rem] font-roboto'>
        <label htmlFor="runtime" className='text-[1.25rem] font-bold'>
          Runtime <span className='text-[#939393] text-[1rem]'>(English)</span>
        </label>
        <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
          <div className='w-[49.5625rem]'>
            <input
              id="runtime"
              className='w-full text-[0.875rem] bg-transparent outline-none'
              name="runtime"
              placeholder="Enter movie's runtime..."
              type="number"
              onChange={handleChange}
              value={movieDetails.runtime}
              required
            />
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col gap-[0.5625rem] font-roboto'>
        <label htmlFor="budget" className='text-[1.25rem] font-bold'>
          Budget <span className='text-[#939393] text-[1rem]'>(in U.S dollars)</span>
        </label>
        <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
          <div className='w-[49.5625rem]'>
            <input
              id="budget"
              className='w-full text-[0.875rem] bg-transparent outline-none'
              name="budget"
              placeholder="Enter movie's budget..."
              type="number"
              onChange={handleChange}
              value={movieDetails.budget}
            />
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col gap-[0.5625rem] font-roboto'>
        <label htmlFor="revenue" className='text-[1.25rem] font-bold'>
          Revenue <span className='text-[#939393] text-[1rem]'>(in U.S dollars)</span>
        </label>
        <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
          <div className='w-[49.5625rem]'>
            <input
              id="revenue"
              className='w-full text-[0.875rem] bg-transparent outline-none'
              name="revenue"
              placeholder="Enter movie's revenue..."
              type="number"
              onChange={handleChange}
              value={movieDetails.revenue}
            />
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col gap-[0.5625rem] font-roboto'>
        <label htmlFor="webpage" className='text-[1.25rem] font-bold'>
          Webpage <span className='text-[#939393] text-[1rem]'>(http://www.domain.com/)</span>
        </label>
        <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
          <div className='w-[49.5625rem]'>
            <input
              id="webpage"
              className='w-full text-[0.875rem] bg-transparent outline-none'
              name="webpage"
              placeholder="Enter movie's webpage..."
              type="url"
              onChange={handleChange}
              value={movieDetails.webpage}
              pattern="https?://.+"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalDetails
