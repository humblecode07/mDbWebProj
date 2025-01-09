import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { appendImagesApi, getMyMovieDataApi, imagesApi, languages } from '../../api/api';
import Section from '../../components/Details/Section';
import Medias from '../../components/Details/Medias';

const isMongoDBId = (id) => typeof id === 'string' && id.length === 24;

const MovieImages = () => {
  const params = useParams();
  const [medias, setMedias] = useState();

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const movieId = params.movieId.split('-')[0];
        let response; // Top Level API
        let responseTwo; // Image API
        let responseThree; // Language API

        if (['backdrops', 'posters', 'logos'].includes(params.mediaType)) {
          if (isMongoDBId(movieId)) {
            [response, responseTwo] = await Promise.all([
              getMyMovieDataApi('movie', movieId),
              languages()
            ]);

            const languageMap = responseTwo.reduce((acc, lang) => {
              acc[lang.iso_639_1] = lang.english_name || lang.name;
              return acc;
            }, {});

            console.log(response);
            console.log(response.movie.images[params.mediaType]);
            
            const groupedImagesByLang = response.movie.images[params.mediaType].reduce((acc, lang) => {
              const langKey = languageMap[lang.iso_639_1] || lang.iso_639_1 || 'No Language';
              if (!acc[langKey]) {
                acc[langKey] = [];
              }
              acc[langKey].push(lang);
              return acc;
            }, {});

            console.log(groupedImagesByLang);

            setMedias({
              id: response.movie._id,
              section: {
                section_title: params.mediaType.charAt(0).toUpperCase() + params.mediaType.slice(1),
                backdrop_path: response.movie.backdrop_path,
                title: response.movie.title || null,
                release_date: response.movie.release_date.split('-')[0],
              },
              media: groupedImagesByLang
            });
          }
          else {
            [response, responseTwo, responseThree] = await Promise.all([
              appendImagesApi('movie', movieId),
              imagesApi('movie', movieId),
              languages()
            ]);

            const languageMap = responseThree.reduce((acc, lang) => {
              acc[lang.iso_639_1] = lang.english_name || lang.name;
              return acc;
            }, {});

            const groupedImagesByLang = responseTwo[params.mediaType].reduce((acc, lang) => {
              const langKey = languageMap[lang.iso_639_1] || lang.iso_639_1 || 'No Language';
              if (!acc[langKey]) {
                acc[langKey] = [];
              }
              acc[langKey].push(lang);
              return acc;
            }, {});

            setMedias({
              id: response.id,
              section: {
                section_title: params.mediaType.charAt(0).toUpperCase() + params.mediaType.slice(1),
                backdrop_path: response.backdrop_path,
                title: response.title || null,
                release_date: response.release_date.split('-')[0],
              },
              media: groupedImagesByLang
            });
          }
        }
      }
      catch (error) {
        console.error("Error fetching media data:", error);
      }
    };

    fetchMediaData();
  }, [params]);

  if (medias) {
    return (
      <>
        <main className='text-white flex flex-col gap-0 font-roboto p-0'>
          <Section data={medias.section} />
          <Medias data={medias.media} />
        </main>
      </>
    )
  }
}

export default MovieImages
