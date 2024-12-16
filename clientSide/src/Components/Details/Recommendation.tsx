import React from 'react'
import StarIcon from '../../assets/Icons/StarIcon'
import PlusIcon from '../../assets/Icons/PlusIcon'
import InfoIcon from '../../assets/Icons/InfoIcon'

const Recommendation = ({ data }) => {
  if (data) {
    const recommendations = data.recommendations.results || data.recommendations;

    return (
      <section className="recommendations-section">
        <span className="recommendations-title">
          Recommendations
        </span>
        <div className="recommendations-container">
          {recommendations && recommendations.slice(0, 7).map((recommendation) => (
            <div key={recommendation.id} className="recommendation-item">
              <img
                className="recommendation-poster"
                src={`https://media.themoviedb.org/t/p/w220_and_h330_face${recommendation.poster_path}`}
              />
              <div className="container">
                <div className="recommendation-data">
                  <span className="recommendation-title">
                    {recommendation.title || recommendation.name}
                  </span>
                  <div className="recommendation-details">
                    <span>{new Date(recommendation.release_date || recommendation.first_air_date).toLocaleDateString('en-PH')}</span>
                    <span>
                      <StarIcon />
                      <span>{recommendation.vote_average.toFixed(1)}</span>
                    </span>
                  </div>
                </div>
                <div class="recommendation-buttons">
                  <button class="button">
                    <PlusIcon class="button-icon" />
                    <span class="button-text">Watchlist</span>
                  </button>
                  <button class="button">
                    <InfoIcon class="button-icon" />
                    <span class="button-text">Details</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return null;
};

export default Recommendation;
