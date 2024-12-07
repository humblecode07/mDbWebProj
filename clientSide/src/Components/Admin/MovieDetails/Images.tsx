import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { languages } from '../../../api/api';
import DividerTwo from '../../Details/DividerTwo';

const fetchImageData = async (movieData, mediaType) => {
   const response = await languages();

   const languageMap = response.reduce((acc, lang) => {
      acc[lang.iso_639_1] = lang.english_name || lang.name;
      return acc;
   }, {});

   const groupedImagesByLang = movieData.images[mediaType].reduce((acc, lang) => {
      const langKey = languageMap[lang.iso_639_1] || lang.iso_639_1 || 'No Language';
      if (!acc[langKey]) {
         acc[langKey] = [];
      }
      acc[langKey].push(lang);
      return acc;
   }, {});

   return {
      media: groupedImagesByLang
   }
}

const Images = ({ movieData }) => {
   const { movieId } = useParams();
   const [selectedImageType, setSelectedImageType] = useState('posters');
   const [selectedLang, setSelectedLang] = useState(null);

   const { data, error, isLoading } = useQuery({
      queryKey: ['movieData', movieId, selectedImageType],
      queryFn: () => fetchImageData(movieData, selectedImageType),
   });

   useEffect(() => {
      if (data?.media) {
         const defaultLang = Object.keys(data.media)[0];
         setSelectedLang(defaultLang || null);
      }
   }, [data]);

   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error fetching data: {error.message}</div>;

   const mediaDimensions = {
      logos: {
         width: 'w-[23.4375rem]',
         height: 'h-[13.5rem]',
      },
      posters: {
         width: 'w-[11.1875rem]',
         height: 'h-[16.78125rem]',
      },
      backdrops: {
         width: 'w-[23.4375rem]',
         height: 'h-[13.5rem]',
      }
   }

   const widthClass = mediaDimensions[selectedImageType]?.width;
   const heightClass = mediaDimensions[selectedImageType]?.height;

   const media = data?.media;

   console.log(media);

   return (
      <div className='movie-details--images--container'>
         <div className='header'>
            <span className='title'>Images</span>
            <div className='tabs'>
               <div onClick={() => setSelectedImageType('posters')} className='tab'>
                  <span className='tab-title'>Posters</span>
                  <span className='tab-count'>{movieData.images.posters.length}</span>
               </div>
               <div onClick={() => setSelectedImageType('backdrops')} className='tab'>
                  <span className='tab-title'>Backdrops</span>
                  <span className='tab-count'>{movieData.images.backdrops.length}</span>
               </div>
               <div onClick={() => setSelectedImageType('logos')} className='tab'>
                  <span className='tab-title'>Logos</span>
                  <span className='tab-count'>{movieData.images.logos.length}</span>
               </div>
               <div className='divider'>
                  <DividerTwo />
               </div>
            </div>
         </div>
         <div className='content'>
            <ul className='language-list'>
               {Object.keys(media).map(language => (
                  <li
                     key={language}
                     className='language-item'
                     onClick={() => setSelectedLang(language)}
                  >
                     <span>{language}</span>
                     <span>{media[language]?.length}</span>
                  </li>
               ))}
            </ul>
            <div className={`image-grid scrollbar-none`}>
               {selectedLang && media[selectedLang]?.length > 0 ? (
                  media[selectedLang].map((image, index) => (
                     <img
                        key={index}
                        src={`http://localhost:3000/images/${image.file_path}`}
                        className={`${widthClass} ${heightClass} object-contain`}
                        alt="Movie Poster"
                     />
                  ))
               ) : (
                  <span>No images available for this language.</span>
               )}
            </div>
         </div>
      </div>
   )
}

export default Images

