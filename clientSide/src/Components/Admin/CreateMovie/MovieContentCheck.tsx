import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { fetchSearchMovieWithCredits } from '../../../api/api';

// CURRENTLY ONLY ABLE TO SCAN THE TMDB MOVIE CONTENTS

const MovieContentCheck = ({ movieDetails }) => {
  const query = movieDetails?.original_title;
  const [duplicateContent, setDuplicateContent] = useState();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movieSearch', query],
    queryFn: () => fetchSearchMovieWithCredits(query),
    enabled: !!query,
  });

  useEffect(() => {
    if (isSuccess) {
      setDuplicateContent(data.results);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span className="error-message">Error fetching movie content data.</span>;
  }

  if (duplicateContent) {
    return (
      <div className='w-full flex flex-col gap-[1.125rem]'>
        <span className='text-[1.5rem] font-bold'>
          Movie Content Duplication Alert
        </span>
        {isSuccess && (
          <span>
            {data.results && data.results.length > 0
              ? 'The title you provided matches an existing movie. Please verify the content type before proceeding. If this is not a duplicate, you may proceed.'
              : 'No duplicate movie content found. You may proceed :)'}
          </span>
        )}
        <div className='w-full flex flex-wrap gap-x-[3.75rem] gap-y-[0.5625rem]'>
          {duplicateContent.map((movieContent) => {
            return (
              <div
                key={movieContent.id}
                className='w-[23.9375rem] h-[7.5rem] flex items-center gap-[1.5625rem] text-[0.875rem] mb-[1rem] overflow-auto scrollbar-none'
              >
                <img
                  className='w-[5rem] h-full'
                  src={movieContent.poster_path
                    ? `https://image.tmdb.org/t/p/original${movieContent.poster_path}`
                    : 'https://placehold.co/80x120'}
                  alt={movieContent.title}
                />
                <div className='flex flex-col gap-[0.75rem]'>
                  <span className='text-[#9C4BFF] font-bold underline'>{movieContent.title}</span>
                  <span className='text-[#8D8D8D]'>
                    {movieContent.credits?.cast?.slice(0, 3).map((actor, index) => (
                      <>
                        {actor.name}
                        {index < 2 && ', '}
                      </>
                    ))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}

export default MovieContentCheck
