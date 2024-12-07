import React from 'react'
import RightIconTwo from '../../assets/Icons/RightIconTwo'
import DividerTwo from './DividerTwo'
import RightIconTwoS from '../../assets/Icons/RightIconTwoS'
import { NavLink } from 'react-router-dom'

const Casts = ({ data }) => {
   if (data) {
      return (
         <div className="details--cast-container">
            <NavLink to="cast" className="cast-nav">
               <span className="cast-title">Top Cast</span>
               <div className="cast-count">
                  <span>{data.casts.length}</span>
                  <RightIconTwo />
               </div>
            </NavLink>
            <div className="cast-list">
               {data.casts.map((cast, index) => {
                  if (index < 18) {
                     return (
                        <a key={cast.cast_id} className="cast-item">
                           <img
                              className="cast-avatar"
                              src={cast.profile_path ? `https://image.tmdb.org/t/p/original/${cast.profile_path}` : 'https://placehold.co/96x96'}
                              alt=""
                           />
                           <div className="cast-details">
                              <span className="cast-name">{cast.name}</span>
                              <span className="cast-character">{cast.character}</span>
                           </div>
                        </a>
                     );
                  }
               })}
            </div>
            <div className="additional-info">
               {data.type === 'movie' ? (
                  <>
                     <DividerTwo />
                     <div className="info-row">
                        <span className="info-label">Director</span>
                        {data.director ? (
                           <a className="info-value">{data.director.name}</a>
                        ) : (
                           <a className="info-missing">N/A</a>
                        )}
                     </div>
                     <DividerTwo />
                     <div className="info-row writers-info">
                        <div className="info-column">
                           <span className="info-label">Writers</span>
                           <div className="writers-list">
                              {data.writers && data.writers.length > 0 ? (
                                 data.writers.map((writer, index) => (
                                    <>
                                       <span key={index} className="writer-item">
                                          <a className="info-value">{writer}</a>
                                       </span>
                                       {index < data.writers.length - 1 && <span> • </span>}
                                    </>
                                 ))
                              ) : (
                                 <span className="info-missing">N/A</span>
                              )}
                           </div>
                        </div>
                        <RightIconTwoS />
                     </div>
                  </>
               ) : (
                  <>
                     <DividerTwo />
                     <div className="info-row">
                        <span className="info-label">Created By</span>
                        <div className="creators-list">
                           {data.created_by && data.created_by.length > 0 ? (
                              data.created_by.map((creator, index) => (
                                 <>
                                    <span key={index} className="creator-item">
                                       <a className="info-value">{creator}</a>
                                    </span>
                                    {index < data.created_by.length - 1 && <span> • </span>}
                                 </>
                              ))
                           ) : (
                              <span className="info-missing">N/A</span>
                           )}
                        </div>
                     </div>
                  </>
               )}
               <DividerTwo />
               <div className="info-row all-cast">
                  <span className="info-label">All Cast & Crew</span>
                  <RightIconTwoS />
               </div>
               <DividerTwo />
            </div>
         </div>
      )
   }
}

export default Casts
