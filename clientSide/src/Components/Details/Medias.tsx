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
      <>
        <div className="details--medias-wrapper">
          <ul className="language-list">
            {Object.keys(data).map(language => (
              <li
                key={language}
                className="language-item"
                onClick={() => setSelectedLang(language)}
              >
                <span>{language}</span>
                <span>{data[language].length}</span>
              </li>
            ))}
          </ul>
          <div className={`image-container ${gapClass}`}>
            {data[selectedLang].map((image, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                onError={(e) => e.target.src = `http://localhost:3000/images/${image.file_path}`}
                className={`${widthClass} ${heightClass} object-contain cursor-pointer hover:opacity-80 transition-opacity`}
                alt="Movie Poster"
                onClick={() => handleImageClick(image.file_path)}
              />
            ))}
          </div>
        </div>
        {selectedImage && (
          <div className="fullscreen-modal" onClick={closeModal}>
            <button
              className="absolute top-4 right-4 text-white text-xl font-bold w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={`https://image.tmdb.org/t/p/original${selectedImage}`}
              onError={(e) => e.target.src = `http://localhost:3000/images/${selectedImage}`}
              className="max-h-screen max-w-screen-xl w-auto h-auto object-contain"
              alt="Full Screen View"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </>
    );
  } else {
    return <p>No media yet available.</p>;
  }
};

export default Medias;