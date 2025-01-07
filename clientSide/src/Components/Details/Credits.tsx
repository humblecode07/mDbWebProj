import React from 'react'

const Credits = ({ data }) => {
   console.log(data)

   if (data) {
      return (
         <section className='w-[66.5rem] flex'>
            <div className='w-[32.8125rem] flex flex-col gap-[1rem]'>
               <h2 className='text-[1.4375rem] text-[#9E9E9E] font-bold'>Cast</h2>
               <ul className='flex flex-col gap-[0.5625rem]'>
                  {data.casts.map((member, index) => {
                     return (
                        <li key={index} className='flex gap-[1.1875rem]'>
                           <img
                              className='w-[4.125rem] h-[4.125rem] rounded-full object-cover'
                              src={member.profile_path
                                 ? `https://image.tmdb.org/t/p/original${member.profile_path}`
                                 : 'https://placehold.co/66x66'}
                              alt={member.name}
                           />
                           <div className='flex flex-col justify-center'>
                              <span className='font-bold'>{member.name}</span>
                              <span className='text-[#8E8E8E]'>{member.character}</span>
                           </div>
                        </li>
                     )
                  })}
               </ul>
            </div>
            <div className='w-[32.8125rem] flex flex-col'>
               {Object.entries(data.crews).map(([department, members]) => (
                  <div key={department} className='flex flex-col gap-[1rem] pb-[1rem]'>
                     <h2 className='text-[1.4375rem] text-[#9E9E9E] font-bold'>{department}</h2>
                     <ul className='flex flex-col gap-[0.5625rem]'>
                        {members.map((member, index) => (
                           <li key={index} className='flex gap-[1.1875rem]'>
                              <img
                                 className='w-[4.125rem] h-[4.125rem] rounded-full object-cover'
                                 src={member.profile_path
                                    ? `https://image.tmdb.org/t/p/original${member.profile_path}`
                                    : 'https://placehold.co/66x66'}
                                 alt={member.name}
                              />
                              <div className='flex flex-col justify-center'>
                                 <span className='font-bold'>{member.name}</span>
                                 <span className='text-[#8E8E8E]'>{member.job}</span>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         </section>
      )
   }
}

export default Credits
