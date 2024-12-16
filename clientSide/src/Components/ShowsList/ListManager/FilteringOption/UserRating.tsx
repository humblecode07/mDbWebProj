import React, { useContext, useState } from 'react'
import { ContextMovies } from '../../../../pages/Lists/MovieList';
import { ContextTvShows } from '../../../../pages/Lists/TvList';

const UserRating = () => {
   const moviesContext = useContext(ContextMovies);
   const tvShowsContext = useContext(ContextTvShows);
   const context = moviesContext || tvShowsContext;
   const { filters, handleFilterChange, setCurrentPage } = context || {};
   const [userScore, setUserScore] = useState({
      minScore: filters.userScore.minScore,
      maxScore: filters.userScore.maxScore
   })

   const handleUserScoreChange = (e, type) => {
      const inputValue = e.target.value;
      const parsedValue = parseInt(inputValue, 10);
      const validValue = !isNaN(parsedValue) ? parsedValue : (type === 'minScore' ? 0 : 10);

      const updatedUserScore = {
         ...userScore,
         [type]: validValue
      };

      setUserScore(updatedUserScore);
      handleFilterChange('userScore', updatedUserScore);
      setCurrentPage(1);
   };

   return (
      <div className="user-rating-section">
         <span className="user-rating-title">USER RATING</span>
         <div className="user-rating-inputs">
            <div className="user-rating-input-container">
               <input
                  type="number"
                  min="0"
                  max="10"
                  placeholder="0"
                  value={userScore.minScore}
                  className="user-rating-input"
                  onChange={(e) => handleUserScoreChange(e, "minScore")}
               />
            </div>
            <span className="user-rating-separator">to</span>
            <div className="user-rating-input-container">
               <input
                  type="number"
                  min="0"
                  max="10"
                  placeholder="10"
                  value={userScore.maxScore}
                  className="user-rating-input"
                  onChange={(e) => handleUserScoreChange(e, "maxScore")}
               />
            </div>
         </div>
      </div>
   )
}

export default UserRating
