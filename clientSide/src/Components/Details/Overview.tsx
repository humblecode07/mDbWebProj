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
      <section className='w-[30.0625rem] h-[45.25rem] flex flex-col gap-[1.125rem] overflow-y-scroll scrollbar-none'>
        <div className='flex flex-col gap-[0.6875rem]'>
          <article className='flex flex-col '>
            <span className='text-[2.25rem] font-bold leading-tight break-words'>{data.title || data.name}</span>
            <article className='flex text-[1rem] gap-[0.875rem]'>
              <span className='border border-white border-solid px-[5px] py-[2px]'>{data.certifications || "NR"}</span>
              <span>{data.release_date ? data.release_date : "No Date Given"}</span>
              <div>
                {data.genres.map((genre, index) => (
                  <span key={index}>
                    {genre}{index < data.genres.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </article>
          </article>
          <div className='flex gap-[1.5rem]'>
            <div className='flex gap-[0.3125rem] items-center'>
              <StarLIcon />
              <div className='flex gap-[0.1875rem]'>
                <div className='flex flex-col leading-[1]'>
                  <span className='text-[1.25rem] font-bold'>{data.vote_average}</span>
                  <span className='text-[0.75rem] text-[#8F8F8F] font-semibold'>{data.vote_count}</span>
                </div>
                <span className='font-semibold text-[#8F8F8F]'>/10</span>
              </div>
            </div>
            <div className='flex gap-[0.375rem] items-center'>
              <StarOutlineLIcon />
              <span className='text-[#396BEA] font-semibold'>Rate</span>
            </div>
            <div className='flex gap-[1.5625rem]'>
              <button className='w-[1.875rem] h-[1.875rem] flex items-center justify-center bg-[#1C252F] rounded-full'>
                <WatchListSIcon />
              </button>
              <button className='w-[1.875rem] h-[1.875rem] flex items-center justify-center bg-[#1C252F] rounded-full'>
                <HeartIcon />
              </button>
            </div>
          </div>
        </div>
        <article className='flex flex-col gap-[0.4375rem]'>
          <span className='font-light italic'>{data.tagline}</span>
          <span className='font-medium text-[1.25rem]'>Overview</span>
          {data.overview
            ? <span className='leading-tight font-light'>{data.overview}</span>
            : <a href='' className='underline text-[#ff8731]'>We don't have an overview translated in English. Help us expand our database by adding one.</a>
          }
        </article>
        <div className='flex flex-col gap-[0.9375rem]'>
          <span className='font-bold'>Available to Stream</span>
          <div className='flex gap-[1.4375rem] flex-wrap'>
            {data.watch_providers && data.watch_providers.length > 0 ? (
              data.watch_providers.map((provider) => {
                return (
                  <a key={provider.provider_id}>
                    <img
                      className='w-[3.3125rem] h-[3.3125rem] rounded-md'
                      src={`https://image.tmdb.org/t/p/original${provider}`}
                      alt={provider.provider_name}
                    />
                  </a>
                )
              })
            ) : (
              <span className='text-gray-500'>No watch providers available.</span>
            )}
          </div>
        </div>
        {data.original_language !== 'en' ? (
          <div className='flex flex-col gap-[0.9375rem]'>
            <Divider />
            <div className='flex gap-[1.4375rem]'>
              <span className='font-bold'>Original name</span>
              <span>{data.original_title || data.original_name}</span>
            </div>
          </div>
        ) : null}
        <section className='flex flex-col gap-[0.9375rem]'>
          {data.type === 'movie' && (
            <div className='flex flex-col gap-[0.9375rem]'>
              <Divider />
              <div className='flex gap-[1.4375rem]'>
                <span className='font-bold'>Director</span>
                {data.director ? (
                  <a className='text-[#4397FA]'>{data.director}</a>
                ) : (
                  <span className='text-[#ff8731]'>N/A</span>
                )}
              </div>
              <Divider />
              <div className='flex gap-[1.4375rem]'>
                <span className='font-bold'>Writers</span>
                <div className='flex gap-[.875rem]'>
                  {data.writers && data.writers.length > 0 ? (
                    data.writers.map((writer, index) => (
                      <>
                        <span key={index} className='flex items-center'>
                          <a className='text-[#4397FA]'>{writer}</a>
                        </span>
                        {index < data.writers.length - 1 && <span> • </span>}
                      </>
                    ))
                  ) : (
                    <span className='text-[#ff8731]'>N/A</span>
                  )}
                </div>
              </div>
            </div>
          )}
          {data.type === 'tv' ? (
            <div className='flex flex-col gap-[0.9375rem]'>
              <Divider />
              <div className='flex gap-[1.4375rem]'>
                <span className='font-bold'>Created By</span>
                <div className='flex gap-[.875rem]'>
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
            </div>
          ) : null}
          <div className='flex flex-col gap-[0.9375rem]'>
            <Divider />
            <div className='flex gap-[1.4375rem]'>
              <span className='font-bold'>Stars</span>
              <div className='flex flex-wrap gap-[.875rem]'>
                {data.stars && data.stars.length > 0
                  ? data.stars.map((star, index) => (
                    <>
                      <span key={index} className='flex items-center'>
                        <a className='text-[#4397FA] text-wrap'>{star}</a>
                      </span>
                      {index < data.stars.length - 1 && <span> • </span>}
                    </>
                  ))
                  : <span className='text-[#ff8731]'>N/A</span>
                }
              </div>
            </div>
          </div>
          {data.type === 'movie' && (
            <div className='flex flex-col gap-[0.9375rem]'>
              <Divider />
              <div className='flex gap-[1.4375rem]'>
                <span className='font-bold'>Runtime</span>
                {data.runtime ? (
                  <span>{data.runtime}</span>
                ) : <span className='text-[#ff8731]'>N/A</span>}
              </div>
            </div>
          )}
          {data.type === 'tv' ? (
            <>
              <div className='flex flex-col gap-[0.9375rem]'>
                <Divider />
                <div className='flex gap-[1.4375rem]'>
                  <span className='font-bold'>Number of Episodes</span>
                  {data.number_of_episodes ? (
                    <span>{data.number_of_episodes}</span>
                  ) : <span className='text-[#ff8731]'>N/A</span>}
                </div>
              </div>
              <div className='flex flex-col gap-[0.9375rem]'>
                <Divider />
                <div className='flex gap-[1.4375rem]'>
                  <span className='font-bold'>Number of Seasons</span>
                  {data.number_of_seasons ? (
                    <span>{data.number_of_seasons}</span>
                  ) : <span className='text-[#ff8731]'>N/A</span>}
                </div>
              </div>
              <div className='flex flex-col gap-[0.9375rem]'>
                <Divider />
                <div className='flex gap-[1.4375rem]'>
                  <span className='font-bold'>First Air Date</span>
                  {data.first_air_date ? (
                    <span>{data.first_air_date}</span>
                  ) : <span className='text-[#ff8731]'>N/A</span>}
                </div>
              </div>
              <div className='flex flex-col gap-[0.9375rem]'>
                <Divider />
                <div className='flex gap-[1.4375rem]'>
                  <span className='font-bold'>Last Air Date</span>
                  {data.last_air_date ? (
                    <span>{data.last_air_date}</span>
                  ) : <span className='text-[#ff8731]'>N/A</span>}
                </div>
              </div>
              <div className='flex flex-col gap-[0.9375rem]'>
                <Divider />
                <div className='flex gap-[1.4375rem]'>
                  <span className='font-bold'>Type</span>
                  {data.tv_type ? (
                    <span>{data.tv_type}</span>
                  ) : <span className='text-[#ff8731]'>N/A</span>}
                </div>
              </div>
            </>
          ) : null}
          <div className='flex flex-col gap-[0.9375rem]'>
            <Divider />
            <div className='flex gap-[1.4375rem] items-center'>
              <span className='font-bold'>Links</span>
              <div className='flex gap-[1rem] items-center'>
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
                  <span className='text-[#ff8731]'>N/A</span>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-[0.9375rem]'>
            <Divider />
            <div className='flex gap-[1.4375rem]'>
              <span className='font-bold'>Status</span>
              <span className='text-[#12AD18]'>{data.status}</span>
            </div>
          </div>
          {data.type === 'movie' ? (
            <>
              <div className='flex flex-col gap-[0.9375rem]'>
                <Divider />
                <div className='flex gap-[1.4375rem]'>
                  <span className='font-bold'>Budget</span>
                  {data.budget !== "$0.00"
                    ? <span>{data.budget}</span>
                    : <span className='text-[#ff8731]'>N/A</span>
                  }
                </div>
              </div>
              <div className='flex flex-col gap-[0.9375rem]'>
                <Divider />
                <div className='flex gap-[1.4375rem]'>
                  <span className='font-bold'>Revenue</span>
                  {data.revenue !== "$0.00"
                    ? <span>{data.revenue}</span>
                    : <span className='text-[#ff8731]'>N/A</span>
                  }
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
