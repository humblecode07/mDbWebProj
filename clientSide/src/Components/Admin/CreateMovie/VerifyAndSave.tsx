import React from 'react';

const VerifyAndSave = ({ movieDetails }) => {
  const detailLabels = {
    original_title: 'Original Title',
    overview: 'Overview',
    imdb_id: 'IMDB ID',
    adult: 'Adult Movie',
    video: 'Video',
    tagline: 'Tagline',
    runtime: 'Runtime',
    budget: 'Budget',
    revenue: 'Revenue',
    webpage: 'Webpage',
  };

  return (
    <div className="flex flex-col gap-[1.125rem]">
      <span className="text-[1.5rem] font-bold">Verify And Save</span>
      <div className="flex flex-col gap-[0.5rem]">
        {Object.entries(detailLabels).map(([key, label]) => (
          <span key={key} className="font-bold text-[#939393]">
            {label}:{' '}
            <span className="font-normal text-white">
              {movieDetails[key] || 'N/A'}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default VerifyAndSave;
