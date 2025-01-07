import React, { useEffect, useState } from 'react'
import MoonIcon from '../../../assets/Icons/MoonIcon'
import SunIcon from '../../../assets/Icons/SunIcon';

const LightModeSwitch = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme])

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  }

  return (
    <button
      className='h-[2rem] w-[2rem] bg-[#d8d8d8] dark:bg-[#1C252F] flex items-center justify-center rounded-full hover:bg-[#b0b0b0] dark:hover:bg-[#141c27] active:bg-[#8a8a8a] dark:active:bg-[#0f161e]'
      onClick={toggleDarkTheme}
    >
      {darkTheme ? <MoonIcon /> : <SunIcon />}
    </button>

  )
}

export default LightModeSwitch
