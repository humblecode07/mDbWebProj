import React, { useState } from 'react'
import MiguImg from '../../../../assets/Image/miguwallpaper.jpg'
import StarIcon from '../../../../assets/Icons/StarIcon';
import PlusIcon from '../../../../assets/Icons/PlusIcon';
import InfoIcon from '../../../../assets/Icons/InfoIcon';
import DetailModal from './DetailModal';
import { Link } from 'react-router-dom';

const CompactView = ({ streams }) => {
  const [activeDetailModal, setActiveDetailModal] = useState(null);

  if (!streams) {
    return <div>Loading...</div>;
  }

  return (
    <div className='streams-container'>
      {streams?.map(stream => {
        return (
          <Link
            to={`${stream.id}-${(stream.original_title?.toLowerCase() || stream.original_name?.toLowerCase() || 'default-title').replace(/\s+/g, '-')}`}
            key={stream.id}
            className='stream-link'
          >
            <img
              src={stream.backdrop_path !== null ? `https://image.tmdb.org/t/p/w500` + stream.backdrop_path : 'https://placehold.co/341x100'}
              alt={stream.original_title || stream.original_name}
              className='stream-image'
            />
            <div className="stream-gradient"></div>
            <div className='stream-content'>
              <div className='stream-details'>
                <div className='stream-info'>
                  <span className='stream-title'>{stream.title || stream.name}</span>
                  <div className='stream-metadata'>
                    <span>
                      {new Date(stream.release_date || stream.first_air_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <div className='stream-rating'>
                      <StarIcon />
                      <span>{stream.vote_average?.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className='stream-actions'>
                  <button
                    className='action-button'
                  >
                    <PlusIcon />
                  </button>
                  <button
                    className='action-button'
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveDetailModal(stream.id)
                    }
                    }>
                    <InfoIcon />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
      {activeDetailModal !== null
        ? <DetailModal id={activeDetailModal} exitModal={setActiveDetailModal} />
        : null
      }
    </div>
  )
}

export default CompactView
