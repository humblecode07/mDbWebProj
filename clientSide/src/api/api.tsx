import axios from 'axios'

const apiClient = axios.create({
   baseURL: 'https://api.themoviedb.org/3',
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`
   },
})

const youtubeApi = axios.create({
   baseURL: 'https://www.googleapis.com/youtube/v3/videos',
});

export const apiFetch = async (endpoint) => {
   try {
      const response = await apiClient({
         url: endpoint
      })

      return response.data;
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const countryListApi = async () => {
   try {
      const response = await apiClient({
         url: "https://api.themoviedb.org/3/watch/providers/regions?language=en-US"
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const watchProviderApi = async (type, code) => {
   console.log(`https://api.themoviedb.org/3/watch/providers/${type}?language=en-US&watch_region=${code}`)

   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/watch/providers/${type}?language=en-US&watch_region=${code}`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// Certification Country
export const certificationList = async (type) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/certification/${type}/list`
      })

      return response.data.certifications
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// Original Language
export const originalLanguageList = async () => {
   try {
      const response = await apiClient({
         url: "https://api.themoviedb.org/3/configuration/languages"
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const keywordResults = async (query) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/search/keyword?query=${query}&page=1`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const movieDetailModal = async (type, id) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${id}?append_to_response=videos,credits&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const certificationsDetail = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}/${type === "movie" ? "release_dates" : "content_ratings"}?`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const peopleList = async (pageNum) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/person/popular?language=en-US&page=${pageNum}`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const dataApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?append_to_response=watch_providers,videos,images,release_dates,recommendations,external_ids,credits,content_ratings&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// movieDataApi won't provide me the data for posters and backdrops, so I used the direct method for getting the images

// some updates (10/03): i just found out i don't need to create another api for getting data for tv, i can just use these same APIs and add just a second argument to specify whether the data is for a TV show or a movie, they have the same format just differ on what stream tyoe being requested
export const imagesApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}/images`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const videosApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}/videos`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const creditsApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}/credits`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const topLevelDataApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const topLevelDataAppendCreditsApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?append_to_response=credits&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// For some reason it doesn't grab the data using append response
export const appendImagesApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?append_to_response=images&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const appendVideosApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?append_to_response=videos&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const languages = async () => {
   try {
      const response = await apiClient({
         url: 'https://api.themoviedb.org/3/configuration/languages'
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const fetchYoutubeData = async (videoId) => {
   try {
      const response = await youtubeApi.get('', {
         params: {
            part: 'snippet,statistics,contentDetails',
            id: videoId,
            key: import.meta.env.VITE_YT_API_ACCESS_KEY, // Your API key here
         },
      });
      return response.data;
   } catch (error) {
      console.log('Error fetching data from YouTube API', error);
   }
};

export const fetchMultipleVideosData = async (keys) => {
   try {
      const response = await youtubeApi.get(`?part=snippet,statistics,contentDetails&id=${keys.join(',')}&key=${import.meta.env.VITE_YT_API_ACCESS_KEY}`);

      return response.data.items; // Adjust based on your API response structure
   } catch (error) {
      console.error('Error during fetching multiple videos data:', error);
      return [];
   }
};

// My API

export const axiosPrivate = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});