import React, { useEffect, useState } from 'react';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import PrimaryDetails from '../../components/Admin/EditMovie/PrimaryDetails';
import AlternativeTitles from '../../components/Admin/EditMovie/AlternativeTitles';
import Cast from '../../components/Admin/EditMovie/Cast';
import Crew from '../../components/Admin/EditMovie/Crew';
import ExternalIds from '../../components/Admin/EditMovie/ExternalIds';
import Genres from '../../components/Admin/EditMovie/Genres';
import Keywords from '../../components/Admin/EditMovie/Keywords';
import ProductionInformation from '../../components/Admin/EditMovie/ProductionInformation';
import ReleaseInformation from '../../components/Admin/EditMovie/ReleaseInformation';
import Taglines from '../../components/Admin/EditMovie/Taglines';
import Videos from '../../components/Admin/EditMovie/Videos';
import { useParams } from 'react-router-dom';
import { getMyMovieDataApi } from '../../api/api';
import Images from '../../components/Admin/EditMovie/Images';

const EditMovie = () => {
   const scrollRef = useHorizontalScroll();
   const [selectedTab, setSelectedTab] = useState('Primary Details');
   const [activeIndex, setActiveIndex] = useState(0);

   const { movieId } = useParams();
   const [movieData, setMovieData] = useState({});

   const tabContent = [
      { name: 'Primary Details', component: <PrimaryDetails movieData={movieData} setMovieData={setMovieData} /> },
      // { name: 'Alternative Titles', component: <AlternativeTitles movieData={movieData} setMovieData={setMovieData} /> },
      { name: 'Cast', component: <Cast movieData={movieData} setMovieData={setMovieData} /> },
      { name: 'Crew', component: <Crew movieData={movieData} setMovieData={setMovieData} /> },
      { name: 'External Ids', component: <ExternalIds movieData={movieData} setMovieData={setMovieData} /> },
      { name: 'Genres', component: <Genres movieData={movieData} setMovieData={setMovieData} /> },
      // { name: 'Keywords', component: <Keywords movieData={movieData} setMovieData={setMovieData} /> },
      { name: 'Images', component: <Images movieData={movieData} setMovieData={setMovieData} /> },
      // { name: 'Production Information', component: <ProductionInformation movieData={movieData} setMovieData={setMovieData} /> },
      { name: 'Release Information', component: <ReleaseInformation movieData={movieData} setMovieData={setMovieData} /> },
      { name: 'Taglines', component: <Taglines movieData={movieData} setMovieData={setMovieData} /> },
      { name: 'Videos', component: <Videos movieData={movieData} setMovieData={setMovieData} /> },
   ];

   const handleTabClick = (tab, index) => {
      setActiveIndex(index);
      setSelectedTab(tab.name);
   };

   useEffect(() => {
      const fetchCountryList = async () => {
         try {
            const movieDataResponse = await getMyMovieDataApi('movie', movieId);

            setMovieData(movieDataResponse.movie);
         } catch (error) {
            console.log('Error fetching data:', error);
         }
      };

      fetchCountryList();
   }, [movieId]);

   // console.log(movieData);

   return (
      <div className="w-[66.1875rem] relative flex flex-col gap-[1.25rem]">
         <span className="text-[1.5rem] font-bold">
            Edit {movieData.title || movieData.original_title}
         </span>
         <div
            className="w-[51.6875rem] h-[2.375rem] flex items-center border-solid border-[1px] border-[#CC511D] rounded-full text-[.75rem] overflow-x-auto scrollbar-none"
            ref={scrollRef}
         >
            <div className="flex w-max h-full text-nowrap">
               {tabContent.map((tab, index) => (
                  <div
                     key={tab.name}
                     className={`h-full flex items-center justify-center px-[1.75rem] rounded-full cursor-pointer ${selectedTab === tab.name ? 'bg-[#CC511D] text-white' : 'bg-transparent text-white'
                        }`}
                     onClick={() => handleTabClick(tab, index)}
                  >
                     <span>{tab.name}</span>
                  </div>
               ))}
            </div>
         </div>
         <div className="h-full relative mt-4 overflow-hidden">
            <div
               className="transition-transform duration-500 flex"
               style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
               }}
            >
               {tabContent.map((tab) => (
                  <div key={tab.name} className="w-full min-w-full">
                     {tab.component}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default EditMovie;
