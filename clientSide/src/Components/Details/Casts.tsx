import React from 'react'
import RightIconTwo from '../../assets/Icons/RightIconTwo'
import DividerTwo from './DividerTwo'
import RightIconTwoS from '../../assets/Icons/RightIconTwoS'
import { NavLink } from 'react-router-dom'

const Casts = ({ data }) => {
   if (data) {
      return (
         <div className='w-[38.4375rem] flex flex-col gap-[1.4375rem]'>
            <NavLink
               to={'cast'}
               className='flex gap-[0.75rem] items-center'
            >
               <span className="font-bold text-[1.875rem] before:w-[4px] before:h-[2.5rem] before:border-[0.125rem] before:rounded-md before:mr-[0.5rem] before:border-[#FF8731]">Top Cast</span>
               <div className='flex gap-[0.3125rem] items-center'>
                  <span className='text-[0.875rem]'>{data.casts.length}</span>
                  <RightIconTwo />
               </div>
            </NavLink>
            <div className='flex gap-[0.9375rem] flex-wrap'>
               {data.casts.map((cast, index) => {
                  if (index < 18) {
                     return (
                        <a key={cast.cast_id} className='w-[18.75rem] flex gap-[0.9375rem] items-center'>
                           <img
                              className="rounded-full w-[6rem] h-[6rem] object-cover"
                              src={cast.profile_path ? `https://image.tmdb.org/t/p/original/${cast.profile_path}` : 'https://placehold.co/96x96'}
                              alt=""
                           />
                           <div className='w-[11.8125rem] flex flex-col gap-[0.125rem]'>
                              <span className='font-bold truncate'>{cast.name}</span>
                              <span className='text-[#8E8E8E] truncate'>{cast.character}</span>
                           </div>
                        </a>
                     )
                  }
               })}
            </div>
            <div className='flex flex-col gap-[0.8125rem]'>
               {data.type === 'movie' ? (
                  <>
                     <DividerTwo />
                     <div className='flex gap-[1.4375rem]'>
                        <span className='font-bold'>Director</span>
                        {data.director
                           ? <a className='text-[#4397FA]'>{data.director.name}</a>
                           : <a className='text-[#FF8731]'>N/A</a>
                        }
                     </div>
                     <DividerTwo />
                     <div className='flex gap-[1.4375rem] justify-between'>
                        <div className='flex gap-[1.4375rem]'>
                           <span className='font-bold'>Writers</span>
                           <div className='w-[30rem] flex flex-wrap gap-[0.5rem]'>
                              {data.writers && data.writers.length > 0
                                 ? data.writers.map((writer, index) => (
                                    <>
                                       <span key={index} className='flex items-center'>
                                          <a className='text-[#4397FA]'>{writer}</a>
                                       </span>
                                       {index < data.writers.length - 1 && <span> • </span>}
                                    </>
                                 ))
                                 : <span className='text-[#ff8731]'>N/A</span>
                              }
                           </div>
                        </div>
                        <RightIconTwoS />
                     </div>
                  </>
               ) :
                  <>
                     <DividerTwo />
                     <div className='flex gap-[1.4375rem]'>
                        <span className='font-bold'>Created By</span>
                        <div className='w-[30rem] flex flex-wrap gap-[0.5rem]'>
                           {data.created_by && data.created_by.length > 0
                              ? data.created_by.map((creator, index) => (
                                 <>
                                    <span key={index} className='flex items-center'>
                                       <a className='text-[#4397FA]'>{creator}</a>
                                    </span>
                                    {index < data.created_by.length - 1 && <span> • </span>}
                                 </>
                              ))
                              : <span className='text-[#ff8731]'>N/A</span>
                           }
                        </div>
                     </div>
                  </>
               }
               <DividerTwo />
               <div className='flex gap-[1.4375rem] items-center justify-between'>
                  <span className='font-bold'>All Cast & Crew</span>
                  <RightIconTwoS />
               </div>
               <DividerTwo />
            </div>
         </div>
      )
   }
}

export default Casts
