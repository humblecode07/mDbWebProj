import React from 'react'
import TskrLogo from '../../../assets/Icons/TskrLogo'
import NavigationMenu from './NavigationMenu'
import SearchBar from './SearchBar'
import HeaderToolbar from './HeaderToolbar'

const Header = () => {
    return (
        <header className='w-full h-[3.5rem] bg-[#fff1e6] flex justify-center items-center text-black text-[.875rem] relative transition-all dark:bg-[#070707] dark:text-white'>
            <div className='w-[66.625rem] flex flex-row items-center'>
                <TskrLogo />
                <NavigationMenu />
                <SearchBar />
                <HeaderToolbar />
            </div>
        </header>
    )
}

export default Header
