import React, { useReducer } from 'react';
import LanguageDetect from 'languagedetect';
import AddMovieDetails from '../../components/Admin/CreateMovie/AddMovieDetails';
import TranslationCheck from '../../components/Admin/CreateMovie/TranslationCheck';
import TvContentCheck from '../../components/Admin/CreateMovie/TvContentCheck';
import MovieContentCheck from '../../components/Admin/CreateMovie/MovieContentCheck';
import AdditionalDetails from '../../components/Admin/CreateMovie/AdditionalDetails';
import VerifyAndSave from '../../components/Admin/CreateMovie/VerifyAndSave';
import { createMovie } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const initialState = {
   step: 1,
   movieDetails: {
      original_title: '',
      overview: '',
      imdb_id: '',
      adult: false,
      video: false,
      tagline: '',
      runtime: '',
      budget: '',
      revenue: '',
      webpage: '',
   },
   translation: {
      detectedLang: '',
      isValid: false,
   },
};

// Correct function declaration for formReducer
const formReducer = (state, action) => {
   switch (action.type) {
      case 'NEXT_STEP':
         return { ...state, step: state.step + 1 };
      case 'PREV_STEP':
         return { ...state, step: state.step - 1 };
      case 'SET_MOVIE_DETAILS':
         return {
            ...state,
            movieDetails: { ...state.movieDetails, ...action.payload },
         };
      case 'SET_TRANSLATION':
         return {
            ...state,
            translation: { ...state.translation, detectedLang: action.payload },
         };
      case 'SET_TRANSLATION_STATUS':
         return {
            ...state,
            translation: { ...state.translation, isValid: action.payload },
         };
      default:
         throw new Error(`Unhandled action type: ${action.type}`);
   }
};

const CreateMovie = () => {
   const [state, dispatch] = useReducer(formReducer, initialState);
   const navigate = useNavigate();

   const handleNext = () => {
      if (state.step === 1) {
         const lngDetector = new LanguageDetect(); // Initialize the detector
         const detectedLang = lngDetector.detect(state.movieDetails.overview, 2)[0][0]; // Get the language code

         console.log(detectedLang);

         dispatch({ type: 'SET_TRANSLATION', payload: detectedLang });

         if (detectedLang !== 'english') {
            dispatch({ type: 'SET_TRANSLATION_STATUS', payload: false });
         }
         else {
            console.log('wassup');
            dispatch({ type: 'SET_TRANSLATION_STATUS', payload: true });
         }
      }
      dispatch({ type: 'NEXT_STEP' });
   };

   const handlePrev = () => dispatch({ type: 'PREV_STEP' });

   const handleSubmit = async () => {
      try {
         const createdMovie = await createMovie(state.movieDetails);
         console.log(createdMovie);
         alert('Movie successfully created!');
         navigate('/admin/movie');
      }
      catch (error) {
         console.error('Failed to create movie:', error);
      }
   };

   const renderStep = () => {
      switch (state.step) {
         case 1:
            return (
               <AddMovieDetails
                  movieDetails={state.movieDetails}
                  dispatch={dispatch}
               />
            );
         case 2:
            return (
               <TranslationCheck
                  translation={state.translation}
               />
            );
         case 3:
            return (
               <TvContentCheck
                  movieDetails={state.movieDetails}
               />
            );
         case 4:
            return (
               <MovieContentCheck
                  movieDetails={state.movieDetails}
               />
            );
         case 5:
            return (
               <AdditionalDetails
                  movieDetails={state.movieDetails}
                  dispatch={dispatch}
               />
            );
         case 6:
            return (
               <VerifyAndSave
                  movieDetails={state.movieDetails}
               />
            );
         default:
            return <h2>Unknown Step</h2>;
      }
   };

   return (
      <div className='w-[51.6875rem] flex flex-col gap-[1.8125rem] pb-[5rem]'>
         {renderStep()}
         <div className='w-full flex gap-[.75rem] justify-end'>
            {state.step > 1 && (
               <button
                  className='h-[2.125rem] px-[1.5625rem] bg-[#CC511D] text-[0.875rem] font-bold rounded-[.625rem] self-end'
                  onClick={handlePrev}
               >
                  Back
               </button>
            )}
            {state.step < 6 && (
               <button
                  className={`h-[2.125rem] px-[1.5625rem] bg-[#CC511D] text-[0.875rem] font-bold rounded-[.625rem] 
                  ${state.step === 2 && !state.translation.isValid ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                  onClick={handleNext}
                  disabled={state.step === 2 && !state.translation.isValid}
               >
                  Next
               </button>
            )}

            {state.step === 6 && (
               <button
                  className='h-[2.125rem] px-[1.5625rem] bg-[#CC511D] text-[0.875rem] font-bold rounded-[.625rem]'
                  onClick={handleSubmit}
               >
                  Submit
               </button>
            )}
         </div>
      </div>
   );
};

export default CreateMovie;
