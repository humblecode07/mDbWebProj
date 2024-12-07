import React from 'react'

const Credits = ({ data }) => {
   console.log(data)

   if (data) {
      return (
         <section className="cast-crew-section">
            <div className="cast-section">
               <h2>Cast</h2>
               <ul>
                  {data.casts.map((member, index) => {
                     return (
                        <li key={index}>
                           <img
                              className="cast-img"
                              src={member.profile_path
                                 ? `https://image.tmdb.org/t/p/original${member.profile_path}`
                                 : 'https://placehold.co/66x66'}
                              alt={member.name}
                           />
                           <div className="cast-info">
                              <span className="cast-name">{member.name}</span>
                              <span className="cast-character">{member.character}</span>
                           </div>
                        </li>
                     );
                  })}
               </ul>
            </div>

            <div className="crew-section">
               {Object.entries(data.crews).map(([department, members]) => (
                  <div key={department} className="department">
                     <h2>{department}</h2>
                     <ul>
                        {members.map((member, index) => (
                           <li key={index}>
                              <img
                                 className="crew-img"
                                 src={member.profile_path
                                    ? `https://image.tmdb.org/t/p/original${member.profile_path}`
                                    : 'https://placehold.co/66x66'}
                                 alt={member.name}
                              />
                              <div className="crew-info">
                                 <span className="crew-name">{member.name}</span>
                                 <span className="crew-job">{member.job}</span>
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
