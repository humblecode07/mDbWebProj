import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Medias = ({ data }) => {
  const params = useParams();
  const [selectedLang, setSelectedLang] = useState(Object.keys(data)[0] || null);
  const [selectedImage, setSelectedImage] = useState(null);

  const mediaDimensions = {
    logos: {
      width: 'w-[22.5625rem]',
      height: 'h-[9.691375rem]',
      gap: 'gap-[1.7rem]',
    },
    posters: {
      width: 'w-[14.875rem]',
      height: 'h-[22.75rem]',
      gap: 'gap-[1rem]'
    },
    backdrops: {
      width: 'w-[22.5625rem]',
      height: 'h-[12.691375rem]',
      gap: 'gap-[1.7rem]'
    }
  };

  const widthClass = mediaDimensions[params.mediaType]?.width;
  const heightClass = mediaDimensions[params.mediaType]?.height;
  const gapClass = mediaDimensions[params.mediaType]?.gap;

  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (data) {
    return (
      <div className='w-[66.5rem] flex py-[3.3125rem] gap-[3.6875rem]'>
        <ul className='w-[15.9375rem] h-full flex flex-col flex-grow-0 gap-[1.1875rem] py-[2.5625rem] px-[1.625rem] rounded-md border-solid border-[#1A1A1A] border-[1px]'>
          {Object.keys(data).map(language => (
            <li
              key={language}
              className='w-[12.6875rem] font-light text-[0.9375rem] flex justify-between cursor-pointer'
              onClick={() => setSelectedLang(language)}
            >
              <span>{language}</span>
              <span>{data[language].length}</span>
            </li>
          ))}
        </ul>
        <div className={`w-[46.875rem] h-full flex flex-grow-0 flex-wrap ${gapClass}`}>
          {data[selectedLang].map((image, index) => {
            return (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                onError={(e) => e.target.src = `http://localhost:3000/images/${image.file_path}`}
                className={`${widthClass} ${heightClass} object-contain`}
                alt="Movie Poster"
              />

            )
          })}
        </div>
      </div>
    )
  }
  else {
    return (
      <>
        <p>No media yet available.</p>
      </>
    )
  }
};

export default Medias;