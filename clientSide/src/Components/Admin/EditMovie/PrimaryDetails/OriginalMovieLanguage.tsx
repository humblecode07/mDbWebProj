import React from 'react'

const OriginalMovieLanguage = ({ primaryDetails, setPrimaryDetails, languages }) => {

   const handleLanguageChange = (event) => {
      const iso_639_1 = languages.find(lang => lang.english_name === event.target.value)?.iso_639_1;
      setPrimaryDetails({ ...primaryDetails, original_language: iso_639_1 });
   };

   return (
      <div className="w-[22rem] flex flex-col gap-[0.5625rem] font-roboto">
         <label htmlFor="original_language" className="text-[.875rem] font-bold">
            Original Movie Language
         </label>
         <div className="w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm">
            <select
               id="original_language"
               className="w-full h-full bg-transparent text-[.875rem] border-none outline-none px-2 bg-black text-white border-[1px] border-[#CC511D] rounded-sm"
               value={
                  languages.find(lang => lang.iso_639_1 === primaryDetails?.original_language)?.english_name || ''
               }
               onChange={handleLanguageChange}
            >
               <option className='bg-black text-white border-solid border-[1px] border-[#CC511D] rounded-sm' value="" disabled>Select a language</option>
               {languages.map((language) => (
                  <option className="bg-black text-white border-solid border-[1px] border-[#CC511D] rounded-sm" key={language.code} value={language.code}>
                     {language.english_name}
                  </option>
               ))}
            </select>
         </div>
      </div>
   )
}

export default OriginalMovieLanguage
