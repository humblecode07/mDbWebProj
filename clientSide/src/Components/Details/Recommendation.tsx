import React from 'react'
import StarIcon from '../../assets/Icons/StarIcon'
import PlusIcon from '../../assets/Icons/PlusIcon'
import InfoIcon from '../../assets/Icons/InfoIcon'

const Recommendation = ({ data }) => {
  if (data) {
    const recommendations = data.recommendations.results || data.recommendations;

    return (
      <section className="w-[22.6875rem] flex flex-col gap-[1.4375rem]">
        <span className="font-bold text-[1.875rem] before:w-[4px] before:h-[2.5rem] before:border-[0.125rem] before:rounded-md before:mr-[0.5rem] before:border-[#FF8731]">
          Recommendations
        </span>
        <div className="flex flex-col gap-[1rem]">
          {recommendations && recommendations.slice(0, 7).map((recommendation) => (
            <div key={recommendation.id} className="flex gap-[1rem]">
              <img
                className="w-[8.125rem] h-[11.375rem]"
                src={`https://media.themoviedb.org/t/p/w220_and_h330_face${recommendation.poster_path}`}
              />
              <div className="flex flex-col gap-[0.825rem] w-full">
                <div className="flex flex-col gap-[0.225rem]">
                  <span className="font-bold text-[1.25rem] line-clamp-2">
                    {recommendation.title || recommendation.name}
                  </span>
                  <div className="flex gap-[1.25rem] items-center">
                    <span>{new Date(recommendation.release_date || recommendation.first_air_date).toLocaleDateString('en-PH')}</span>
                    <span className="flex gap-[.5rem] items-center">
                      <StarIcon />
                      <span>{recommendation.vote_average.toFixed(1)}</span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-[.825rem]">
                  <button className="w-[9.3125rem] h-[2.25rem] flex justify-center items-center gap-[.6875rem] bg-[#1C252F] rounded-md">
                    <PlusIcon />
                    <span className="text-[#3D81E7] text-[.875rem]">Watchlist</span>
                  </button>
                  <button className="w-[9.3125rem] h-[2.25rem] flex justify-center items-center gap-[.6875rem] bg-[#1C252F] rounded-md">
                    <InfoIcon />
                    <span className="text-[.875rem]">Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return null;
};

export default Recommendation;
