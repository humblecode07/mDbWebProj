import React from 'react'
import AdminTskr from '../../../assets/Icons/Admin/AdminTskr'
import SearchBox from './SearchBox'
import GreenCircle from '../../../assets/Icons/Admin/GreenCircle'
import Eliv from '../../../assets/Image/evil.jpg'

const Header = () => {

   return (
      <header className='w-full h-[7.5rem] bg-[#111111] flex justify-center items-center font-roboto text-[.875rem] relative'>
         <div className='w-[74.8125rem] flex flex-row items-center justify-between gap-[3.25rem]'>
            <AdminTskr />
            <div className='flex gap-[6rem] items-center'>
               <div className='flex gap-[1rem]'>
                  <SearchBox />
                  <div className='w-[8.75rem] h-[3.3125rem] rounded-[0.75rem] border-[1px] border-solid border-[#CC511D] flex items-center justify-center gap-[1rem]'>
                     <GreenCircle />
                     <span className='text-white font-roboto font-medium'>7 users</span>
                  </div>
               </div>
               <div className='w-[12rem] flex justify-end gap-[1rem] text-white font-roboto'>
                  <div className='flex flex-col items-end'>
                     <span>Calderon, Miko</span>
                     <span className='text-[#CC511D]'>Admin</span>
                  </div>
                  <img
                     className='w-[3rem] h-[3rem] rounded-full'
                     src={Eliv}
                     alt="user profile"
                  />
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header
