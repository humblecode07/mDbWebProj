import React from 'react';

const AddMovieDetails = ({ movieDetails, dispatch }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_MOVIE_DETAILS',
      payload: { [name]: value },
    });
  };

  return (
    <div className='flex flex-col gap-[1.125rem]'>
      <span className='text-[1.5rem] font-bold'>Add Movie Details</span>
      <div className='w-full flex flex-col gap-[0.5625rem] font-roboto'>
        <label htmlFor="original_title" className='text-[1.25rem] font-bold'>
          Original Name <span className='text-[#FF3636]'> *</span>
        </label>
        <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
          <div className='w-[49.5625rem]'>
            <input
              id="original_title"
              className='w-full text-[0.875rem] bg-transparent outline-none'
              name="original_title"
              placeholder="Enter the original name of the movie..."
              type="text"
              onChange={handleChange}
              value={movieDetails.original_title}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 font-roboto">
        <label htmlFor="overview" className="text-[1.25rem] font-bold">
          Movie Overview (English)
          <span className="text-[#FF3636]"> * </span>
          <span className="text-[#939393] text-[1rem]">(minimum of 10 characters)</span>
        </label>
        <div className="w-full h-auto flex justify-center items-center bg-transparent border border-white rounded-sm">
          <div className='w-[49.5625rem] h-auto'>
            <textarea
              id="overview"
              className="w-full text-[0.875rem] pt-[0.6875rem] bg-transparent outline-none resize-none"
              name="overview"
              placeholder="Enter movie overview..."
              minLength={10}
              value={movieDetails.overview}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col gap-[0.5625rem] font-roboto'>
        <label htmlFor="imdb_id" className='text-[1.25rem] font-bold'>
          IMDB ID (tt17382524)
          <span className='text-[#939393] text-[1rem]'> Optional</span>
        </label>
        <div className='w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm'>
          <div className='w-[49.5625rem]'>
            <input
              id="imdb_id"
              className='w-full text-[0.875rem] bg-transparent outline-none'
              name="imdb_id"
              placeholder="Enter imdb id..."
              type="text"
              value={movieDetails.imdb_id}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieDetails;
