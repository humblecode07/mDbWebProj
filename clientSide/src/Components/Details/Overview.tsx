import React from 'react'
import StarLIcon from '../../assets/Icons/StarLIcon'
import StarOutlineLIcon from '../../assets/Icons/StarOutlineLIcon'
import HeartIcon from '../../assets/Icons/HeartIcon'
import WatchListSIcon from '../../assets/Icons/WatchListSIcon'
import Divider from './Divider'
import { FacebookIcon, HomepageIcon, IMDbIcon, InstagramIcon, TwitterIcon, WikiDataIcon } from '../../assets/Icons/LinkIcons'

const Overview = ({ data }) => {
  console.log(data)

  if (data) {
    return (
      <section className='overview-section scrollbar-none'>
        <div className="container--one">
          <article className="article">
            <span className="title">{data.title || data.name}</span>
            <article className="details">
              <span className="certifications">{data.certifications || "NR"}</span>
              <span>{data.release_date ? data.release_date : "No Date Given"}</span>
              <div className="genres">
                {data.genres.map((genre, index) => (
                  <span key={index}>
                    {genre}{index < data.genres.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </article>
          </article>
          <div className="bottom-section">
            <div className="rating">
              <div className="vote-info">
                <StarLIcon />
                <div className="vote-average">
                  <span className="vote-title">{data.vote_average}</span>
                  <span className="vote-count">{data.vote_count}</span>
                </div>
                <span className="vote-scale">/10</span>
              </div>
            </div>
            <div className="rate">
              <StarOutlineLIcon />
              <span className="rate-icon">Rate</span>
            </div>
            <div className="actions">
              <button>
                <WatchListSIcon />
              </button>
              <button>
                <HeartIcon />
              </button>
            </div>
          </div>
        </div>
        <article className="article--one">
          <span className="tagline">{data.tagline}</span>
          <span className="overview-title">Overview</span>
          {data.overview ? (
            <span className="overview-content">{data.overview}</span>
          ) : (
            <a href="" className="no-overview">
              We don't have an overview translated in English. Help us expand our database by adding one.
            </a>
          )}
        </article>
        <div className="container--two">
          <div className="stream-available">
            <span className="title">Available to Stream</span>
            <div className="providers">
              {data.watch_providers && data.watch_providers.length > 0 ? (
                data.watch_providers.map((provider) => (
                  <a key={provider.provider_id}>
                    <img
                      className="provider"
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                    />
                  </a>
                ))
              ) : (
                <span className="no-providers">No watch providers available.</span>
              )}
            </div>
          </div>
        </div>
        {data.original_language !== 'en' ? (
          <div className="container--three">
            <div className="section">
              <Divider className="divider" />
              <div className="info">
                <span className="label">Original name</span>
                <span className="value">{data.original_title || data.original_name}</span>
              </div>
            </div>
          </div>
        ) : null}
        <section className='container--four'>
          {data.type === 'movie' && (
            <div className="section--one">
              <Divider />
              <div className="info">
                <span className="label">Director</span>
                {data.director ? (
                  <a className="link">{data.director}</a>
                ) : (
                  <span className="no-info">N/A</span>
                )}
              </div>
              <Divider className="divider" />
              <div className="info">
                <span className="label">Writers</span>
                <div className="writers">
                  {data.writers && data.writers.length > 0 ? (
                    data.writers.map((writer, index) => (
                      <>
                        <span key={index} className="writer">
                          <a className="link">{writer}</a>
                        </span>
                        {index < data.writers.length - 1 && <span className="separator"> • </span>}
                      </>
                    ))
                  ) : (
                    <span className="no-info">N/A</span>
                  )}
                </div>
              </div>
            </div>
          )}
          {data.type === 'tv' ? (
            <div className="section--two">
              <Divider className="divider" />
              <div className="info">
                <span className="label">Created By</span>
                <div className="created-by">
                  {data.created_by && data.created_by.length > 0 ? (
                    data.created_by.map((creator, index) => (
                      <>
                        <span key={index} className="creator">
                          <a className="link">{creator}</a>
                        </span>
                        {index < data.created_by.length - 1 && <span className="separator"> • </span>}
                      </>
                    ))
                  ) : (
                    <span className="no-info">N/A</span>
                  )}
                </div>
              </div>
            </div>
          ) : null}
          <div className="section--three">
            <Divider className="divider" />
            <div className="info">
              <span className="label">Stars</span>
              <div className="stars">
                {data.stars && data.stars.length > 0 ? (
                  data.stars.map((star, index) => (
                    <>
                      <span key={index} className="star-item">
                        <a className="link">{star}</a>
                      </span>
                      {index < data.stars.length - 1 && <span className="separator"> • </span>}
                    </>
                  ))
                ) : (
                  <span className="no-info">N/A</span>
                )}
              </div>
            </div>
          </div>
          {data.type === 'movie' && (
            <div className="section--four">
              <Divider className="divider" />
              <div className="info">
                <span className="label">Runtime</span>
                {data.runtime ? (
                  <span>{data.runtime}</span>
                ) : (
                  <span className="no-info">N/A</span>
                )}
              </div>
            </div>
          )}
          {data.type === 'tv' ? (
            <>
              <div className="section--five">
                <Divider className="divider" />
                <div className="info">
                  <span className="label">Number of Episodes</span>
                  {data.number_of_episodes ? (
                    <span>{data.number_of_episodes}</span>
                  ) : (
                    <span className="no-info">N/A</span>
                  )}
                </div>
              </div>
              <div className="section--five">
                <Divider className="divider" />
                <div className="info">
                  <span className="label">Number of Seasons</span>
                  {data.number_of_seasons ? (
                    <span>{data.number_of_seasons}</span>
                  ) : (
                    <span className="no-info">N/A</span>
                  )}
                </div>
              </div>
              <div className="section--five">
                <Divider className="divider" />
                <div className="info">
                  <span className="label">First Air Date</span>
                  {data.first_air_date ? (
                    <span>{data.first_air_date}</span>
                  ) : (
                    <span className="no-info">N/A</span>
                  )}
                </div>
              </div>
              <div className="section--five">
                <Divider className="divider" />
                <div className="info">
                  <span className="label">Last Air Date</span>
                  {data.last_air_date ? (
                    <span>{data.last_air_date}</span>
                  ) : (
                    <span className="no-info">N/A</span>
                  )}
                </div>
              </div>
              <div className="section--five">
                <Divider className="divider" />
                <div className="info">
                  <span className="label">Type</span>
                  {data.tv_type ? (
                    <span>{data.tv_type}</span>
                  ) : (
                    <span className="no-info">N/A</span>
                  )}
                </div>
              </div>
            </>
          ) : null}
          <div className="section--six">
            <Divider className="divider" />
            <div className="info">
              <span className="label">Links</span>
              <div className="links">
                {data.facebook_id || data.twitter_id || data.instagram_id || data.wikidata || data.imdb_id || data.homepage ? (
                  <>
                    {data.facebook_id && (
                      <a href={`https://www.facebook.com/${data.facebook_id}`} target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                      </a>
                    )}
                    {data.twitter_id && (
                      <a href={`https://twitter.com/${data.twitter_id}`} target="_blank" rel="noopener noreferrer">
                        <TwitterIcon />
                      </a>
                    )}
                    {data.instagram_id && (
                      <a href={`https://www.instagram.com/${data.instagram_id}`} target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                      </a>
                    )}
                    {data.wikidata && (
                      <a href={`https://www.wikidata.org/wiki/${data.wikidata}`} target="_blank" rel="noopener noreferrer">
                        <WikiDataIcon />
                      </a>
                    )}
                    {data.imdb_id && (
                      <a href={`https://www.imdb.com/title/${data.imdb_id}`} target="_blank" rel="noopener noreferrer">
                        <IMDbIcon />
                      </a>
                    )}
                    {data.homepage && (
                      <a href={data.homepage} target="_blank" rel="noopener noreferrer">
                        <HomepageIcon />
                      </a>
                    )}
                  </>
                ) : (
                  <span className="no-info">N/A</span>
                )}
              </div>
            </div>
          </div>
          <div className="section--seven">
            <Divider className="divider" />
            <div className="info">
              <span className="label">Status</span>
              <span className="status">{data.status}</span>
            </div>
          </div>
          {data.type === 'movie' ? (
            <>
              <div className="section--five">
                <Divider className="divider" />
                <div className="info">
                  <span className="label">Budget</span>
                  {data.budget !== "$0.00" ? (
                    <span>{data.budget}</span>
                  ) : (
                    <span className="highlight">N/A</span>
                  )}
                </div>
              </div>
              <div className="section--five">
                <Divider className="divider" />
                <div className="info">
                  <span className="label">Revenue</span>
                  {data.revenue !== "$0.00" ? (
                    <span>{data.revenue}</span>
                  ) : (
                    <span className="highlight">N/A</span>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </section>
      </section>
    )
  }
}

export default Overview
