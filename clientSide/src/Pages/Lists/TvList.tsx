import React, { createContext, useEffect } from 'react'
import Header from '../../components/Header/Client/Header'
import Marquee from '../../components/ShowsList/Marquee'
import DisplayViewOption from '../../components/ShowsList/ListManager/DisplayViewOption'
import FilteringOption from '../../components/ShowsList/ListManager/FilteringOption'
import SortByOption from '../../components/ShowsList/ListManager/SortByOption'
import CompactView from '../../components/ShowsList/ListManager/ViewDisplay/CompactView'
import GridView from '../../components/ShowsList/ListManager/ViewDisplay/GridView'
import { useShowsList } from '../../hooks/useShowsList'
import Footer from '../../components/Footer/Footer'

export const ContextTvShows = createContext(undefined);

const TvList = () => {
   const { items: tvShows, filters, handleFilterChange, selectedSortBy, setSelectedSortBy, setCurrentPage, selectedView, setSelectedView } = useShowsList('tv');

   useEffect(() => {
      // Change tab title
      document.title = 'tskr! Movie Database Website';
   }, [])

   return (
      <>
         <main className='text-white flex flex-col font-roboto'>
            <Marquee display={"tv shows"} />
            <ContextTvShows.Provider value={{ streamType: 'tv', filters, handleFilterChange, setCurrentPage }}>
               <div className='w-[66.5625rem] flex justify-between'>
                  <div className='flex items-center gap-[2.5625rem]'>
                     <FilteringOption />
                     <SortByOption stream="tv" selectedSorting={selectedSortBy} setSelectedSorting={setSelectedSortBy} resetCurrentPage={setCurrentPage} />
                  </div>
                  <DisplayViewOption setSelectedView={setSelectedView} resetCurrentPage={setCurrentPage} />
               </div>
               {selectedView === 0
                  ? <CompactView streams={tvShows} />
                  : <GridView streams={tvShows} />
               }
            </ContextTvShows.Provider>
         </main>
      </>
   )
}

export default TvList
