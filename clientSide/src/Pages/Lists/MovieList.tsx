import React, { createContext, useEffect } from 'react'
import Marquee from '../../components/ShowsList/Marquee'
import FilteringOption from '../../components/ShowsList/ListManager/FilteringOption'
import DisplayViewOption from '../../components/ShowsList/ListManager/DisplayViewOption'
import SortByOption from '../../components/ShowsList/ListManager/SortByOption'
import CompactView from '../../components/ShowsList/ListManager/ViewDisplay/CompactView'
import GridView from '../../components/ShowsList/ListManager/ViewDisplay/GridView'
import { useShowsList } from '../../hooks/useShowsList'

export const ContextMovies = createContext(undefined);

const MovieList = () => {
  const { items: movies, filters, handleFilterChange, selectedSortBy, setSelectedSortBy, setCurrentPage, selectedView, setSelectedView } = useShowsList('movie');

  useEffect(() => {
    // Change tab title
    document.title = 'tskr! Movie Database Website';
  }, [])

  return (
    <>
      <main className='text-white flex flex-col font-roboto'>
        <Marquee display={"movies"} />
        <ContextMovies.Provider value={{ streamType: 'movie', filters, handleFilterChange, setCurrentPage }}>
          <div className='w-[66.5625rem] flex justify-between'>
            <div className='flex items-center gap-[2.5625rem]'>
              <FilteringOption />
              <SortByOption stream="movie" selectedSorting={selectedSortBy} setSelectedSorting={setSelectedSortBy} resetCurrentPage={setCurrentPage} />
            </div>
            <DisplayViewOption setSelectedView={setSelectedView} resetCurrentPage={setCurrentPage} />
          </div>
          {selectedView === 0
            ? <CompactView streams={movies} />
            : <GridView streams={movies} />
          }
        </ContextMovies.Provider>
      </main>
    </>
  )
}

export default MovieList
