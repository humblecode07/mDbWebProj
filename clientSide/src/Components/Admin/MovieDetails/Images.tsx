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
      <div className='w-full h-auto flex flex-col gap-[2.4375rem]'>
         <div className='w-full h-[2.1875rem] flex items-center justify-between gap-[1rem]'>
            <span className='text-[1.875rem] font-bold'>Images</span>
            <div className='flex items-center gap-[2.375rem]'>
               <div onClick={() => setSelectedImageType('posters')} className='flex gap-[.5rem] items-center cursor-pointer'>
                  <span className='text-[1.125rem] font-bold'>Posters</span>
                  <span className='text-[.875rem] text-[#B1B1B1] font-bold'>{movieData.images.posters.length}</span>
               </div>
               <div onClick={() => setSelectedImageType('backdrops')} className='flex gap-[.5rem] items-center cursor-pointer'>
                  <span className='text-[1.125rem] font-bold'>Backdrops</span>
                  <span className='text-[.875rem] text-[#B1B1B1] font-bold'>{movieData.images.backdrops.length}</span>
               </div>
               <div onClick={() => setSelectedImageType('logos')} className='flex gap-[.5rem] items-center cursor-pointer'>
                  <span className='text-[1.125rem] font-bold'>Logos</span>
                  <span className='text-[.875rem] text-[#B1B1B1] font-bold'>{movieData.images.logos.length}</span>
               </div>
               <div className='w-[32.875rem]'>
                  <DividerTwo />
               </div>
            </div>
         </div>
         <div className='w-full max-h-[35rem] flex gap-[1.5625rem]'>
            <ul className='w-[16.6875rem] h-fit flex flex-col flex-grow-0 gap-[1.1875rem] py-[2.5625rem] px-[1.625rem] rounded-md border-solid border-[#1A1A1A] border-[1px]'>
               {Object.keys(media).map(language => (
                  <li
                     key={language}
                     className='w-[12.6875rem] font-light text-[0.9375rem] flex justify-between cursor-pointer'
                     onClick={() => setSelectedLang(language)}
                  >
                     <span>{language}</span>
                     <span>{media[language]?.length}</span>
                  </li>
               ))}
            </ul>
            <div className={`w-full h-full flex flex-grow-0 flex-wrap gap-[1.0625rem] overflow-auto scrollbar-none`}>
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

