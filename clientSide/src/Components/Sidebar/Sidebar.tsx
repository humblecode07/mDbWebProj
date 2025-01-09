import React from 'react'
import MovieIcon from '../../assets/Icons/Admin/MovieIcon'
import TvShowIcon from '../../assets/Icons/Admin/TvShowIcon'
import PeopleIcon from '../../assets/Icons/Admin/PeopleIcon'
import UserIcon from '../../assets/Icons/Admin/UserIcon'
import SettingsIcon from '../../assets/Icons/Admin/SettingsIcon'
import LogoutIcon from '../../assets/Icons/Admin/LogoutIcon'
import { NavLink, useNavigate } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'

const Sidebar = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogoutUser = async () => {
    if (window.confirm("Do you want to logout?")) {
      await logout();
      navigate('/');
    }
  }

  return (
    <div className='w-[5.1875rem] min-h-[34.315rem] h-[76.85dvh] rounded-[.75rem] flex flex-col items-center justify-between bg-gradient-to-b from-[#CC511D] to-black'>
      <section className='flex flex-col gap-[.525rem] pt-[2.375rem]'>
        <NavLink
          className='w-[3rem] h-[3rem] flex items-center justify-center rounded-full 
                hover:bg-[#CC511D] transition-all duration-200 ease-in-out'
          to={'/admin/movie'}
        >
          <MovieIcon />
        </NavLink>
        <button
          className='w-[3rem] h-[3rem] flex items-center justify-center rounded-full 
                hover:bg-[#CC511D] transition-all duration-200 ease-in-out'
        >
          <TvShowIcon />
        </button>
        <button
          className='w-[3rem] h-[3rem] flex items-center justify-center rounded-full 
                hover:bg-[#CC511D] transition-all duration-200 ease-in-out'
        >
          <PeopleIcon />
        </button>
        <button
          className='w-[3rem] h-[3rem] flex items-center justify-center rounded-full 
                hover:bg-[#CC511D] transition-all duration-200 ease-in-out'
        >
          <UserIcon />
        </button>
      </section>
      <section className='flex flex-col gap-[.525rem] pb-[2.375rem]'>
        <button
          className='w-[3rem] h-[3rem] flex items-center justify-center rounded-full 
                hover:bg-[#CC511D] transition-all duration-200 ease-in-out'
        >
          <SettingsIcon />
        </button>
        <button
          className='w-[3rem] h-[3rem] flex items-center justify-center rounded-full 
                hover:bg-[#CC511D] transition-all duration-200 ease-in-out'
          onClick={() => handleLogoutUser()}
        >
          <LogoutIcon />
        </button>
      </section>
    </div>
  )
}

export default Sidebar
