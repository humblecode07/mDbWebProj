import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { LOCALHOST } from '../../App';

const Media = ({ data }) => {
	const [selectMedia, setSelectMedia] = useState('Videos');

	const handleSelect = (media) => {
		setSelectMedia(media);
	};

	console.log(data)

	const mediaComponents = {
		Videos: (
			<>
				{data.videos?.map((video, index) => {
					if (index < 2) {
						return (
							<div key={index} className="overview-media--video-container">
								<img
									className="video-image"
									src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
									alt=""
								/>
							</div>
						);
					}
				})}
			</>
		),
		Posters: (
			<>
				{data.posters.map((poster, index) => {
					if (index < 5) {
						return (
							<div key={index} className="overview-media--poster-container">
								<img
									className="poster-image"
									src={`https://image.tmdb.org/t/p/original${poster.file_path}`}
									alt=""
									onError={(e) => {
										e.target.onerror = null; // Prevent infinite fallback loop
										e.target.src = `${LOCALHOST}/images/${poster.file_path}`;
									}}
								/>
							</div>

						);
					}
				})}
			</>
		),
		Backdrops: (
			<>
				{data.backdrops.map((backdrop, index) => {
					if (index < 2) {
						return (
							<div key={index} className="overview-media--backdrop-container">
								<img
									className="backdrop-image"
									src={`https://image.tmdb.org/t/p/original${backdrop.file_path}`}
									alt=""
									onError={(e) => {
										e.target.onerror = null; // Prevent infinite fallback loop
										e.target.src = `${LOCALHOST}/images/${backdrop.file_path}`;
									}}
								/>
							</div>

						);
					}
				})}
			</>
		),
		Logos: (
			<>
				{data.logos.map((logo, index) => {
					if (index < 3) {
						return (
							<div key={index} className="overview-media--logo-container">
								<img
									className="logo-image"
									src={`https://image.tmdb.org/t/p/original${logo.file_path}`}
									alt=""
									onError={(e) => {
										e.target.onerror = null; // Prevent infinite fallback loop
										e.target.src = `${LOCALHOST}/images/${logo.file_path}`;
									}}
								/>
							</div>

						);
					}
				})}
			</>
		)
	}

	if (data) {
		return (
			<div className='overview-media--container'>
				<div className='wrapper'>
					<div className='media-container'>
						<span className='media-title'>Media</span>
						<ul className='media-list'>
							<li
								onClick={() => handleSelect('Videos')}
								className={`media-item ${selectMedia === 'Videos' ? 'active' : ''}`}
							>
								Videos <span className='media-count'>{data.videos?.length}</span>
							</li>
							<li
								onClick={() => handleSelect('Posters')}
								className={`media-item ${selectMedia === 'Posters' ? 'active' : ''}`}
							>
								Posters <span className="media-count">{data.posters.length}</span>
							</li>
							<li
								onClick={() => handleSelect('Backdrops')}
								className={`media-item ${selectMedia === 'Backdrops' ? 'active' : ''}`}
							>
								Backdrops <span className="media-count">{data.backdrops.length}</span>
							</li>
							<li
								onClick={() => handleSelect('Logos')}
								className={`media-item ${selectMedia === 'Logos' ? 'active' : ''}`}
							>
								Logos <span className="media-count">{data.logos.length}</span>
							</li>
						</ul>
					</div>
					<NavLink
						to={selectMedia !== 'Videos'
							? `images/${selectMedia.toLowerCase()}`
							: `${selectMedia.toLowerCase()}`}

						className='navigate-link'
					>
						View all {selectMedia}
					</NavLink>
				</div>
				<div className='media-wrapper'>
					<div className='media-overlay'
						style={{
							background: 'linear-gradient(90deg, rgba(17,17,17,0) 0%, rgba(35,29,24,0) 60%, rgba(18,18,18,1) 100%)'
						}}
					/>
					{mediaComponents[selectMedia] || null}
				</div>
			</div>
		)
	}
}

export default Media
