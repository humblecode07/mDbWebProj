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
    <div className='sidebar'>
      <section className='sidebar__section sidebar__section--top'>
        <NavLink
          className='sidebar__button'
          to={'/admin/movie'}
        >
          <MovieIcon />
        </NavLink>
        <button className='sidebar__button'>
          <TvShowIcon />
        </button>
        <button className='sidebar__button'>
          <PeopleIcon />
        </button>
        <button className='sidebar__button'>
          <UserIcon />
        </button>
      </section>
      <section className='sidebar__section sidebar__section--bottom'>
        <button className='sidebar__button'>
          <SettingsIcon />
        </button>
        <button className='sidebar__button' onClick={handleLogoutUser}>
          <LogoutIcon />
        </button>
      </section>
    </div>
  )
}

export default Sidebar
