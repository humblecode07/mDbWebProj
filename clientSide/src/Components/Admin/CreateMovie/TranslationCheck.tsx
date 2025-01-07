import React from 'react';

const TranslationCheck = ({ translation }) => {
  const message = translation.isValid
    ? 'The input for "overview" was detected in English.'
    : `The input for 'overview' was detected in a language other than English and was translated into ${translation.detectedLang.charAt(0).toUpperCase() + translation.detectedLang.slice(1)}.`;

  return (
    <div className='w-full flex flex-col gap-[1.125rem]'>
      <span className='text-[1.25rem] font-bold'>
        Translation Check {translation.isValid ? 'Success' : 'Failed'}
      </span>
      <span>{message}</span>
    </div>

  );
};

export default TranslationCheck;
