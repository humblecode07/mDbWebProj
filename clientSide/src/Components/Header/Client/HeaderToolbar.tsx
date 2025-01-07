import React from 'react'
import Watchlist from './Watchlist'
import LightModeSwitch from './LightModeSwitch'
import Translation from './Translation'
import Account from './Account'

const HeaderToolbar = () => {
  return (
    <div className='flex items-center gap-[1.75rem] ml-[1.75rem]'>
      <Watchlist />
      <LightModeSwitch />
      <Translation />
      <Account />
    </div>
  )
}

export default HeaderToolbar
