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
							<div key={index} className='w-[27.1875rem] flex-shrink-0'>
								<img
									className='w-full h-full object-cover'
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
							<div key={index} className="w-[10.1875rem] flex-shrink-0">
								<img
									className="w-full h-full object-cover"
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
							<div key={index} className='w-[27.1875rem] flex-shrink-0'>
								<img
									className="w-full h-full object-cover"
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
							<div key={index} className='w-[20.1875rem] flex-shrink-0'>
								<img
									className="w-full h-full object-cover"
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
			<div className='w-[44.0625rem] flex flex-col gap-[1.4375rem]'>
				<div className='flex justify-between items-center'>
					<div className='flex items-center gap-[2.5rem]'>
						<span className='font-bold text-[1.875rem]'>Media</span>
						<ul className='flex font-bold text-[1.0625rem] gap-[1.0625rem] transition-all'>
							<li
								onClick={() => handleSelect('Videos')}
								className={`cursor-pointer after:block after:w-full after:h-[1px] after:border-solid after:border-[2px] after:rounded-md after:border-[#FF8731] ${selectMedia === 'Videos'
									? 'after:opacity-100'
									: 'after:opacity-0'
									}`}
							>
								Videos <span className='text-[.9625rem] text-[#9c9c9c]'>{data.videos?.length}</span>
							</li>
							<li
								onClick={() => handleSelect('Posters')}
								className={`cursor-pointer after:block after:w-full after:h-[1px] after:border-solid after:border-[2px] after:rounded-md after:border-[#FF8731] ${selectMedia === 'Posters'
									? 'after:opacity-100'
									: 'after:opacity-0'
									}`}
							>
								Posters <span className='text-[.9625rem] text-[#9c9c9c]'>{data.posters.length}</span>
							</li>
							<li
								onClick={() => handleSelect('Backdrops')}
								className={`cursor-pointer after:block after:w-full after:h-[1px] after:border-solid after:border-[2px] after:rounded-md after:border-[#FF8731] ${selectMedia === 'Backdrops'
									? 'after:opacity-100'
									: 'after:opacity-0'
									}`}
							>
								Backdrops <span className='text-[.9625rem] text-[#9c9c9c]'>{data.backdrops.length}</span>
							</li>
							<li
								onClick={() => handleSelect('Logos')}
								className={`cursor-pointer after:block after:w-full after:h-[1px] after:border-solid after:border-[2px] after:rounded-md after:border-[#FF8731] ${selectMedia === 'Logos'
									? 'after:opacity-100'
									: 'after:opacity-0'
									}`}
							>
								Logos <span className='text-[.9625rem] text-[#9c9c9c]'>{data.logos.length}</span>
							</li>
						</ul>
					</div>
					<NavLink
						to={selectMedia !== 'Videos'
							? `images/${selectMedia.toLowerCase()}`
							: `${selectMedia.toLowerCase()}`}

						className='font-bold text-[#6BBFCB] pr-[1.25rem]'
					>
						View all {selectMedia}
					</NavLink>
				</div>
				<div
					className='w-[44.0625rem] h-[15.1875rem] flex overflow-hidden relative'
				>
					<div
						className='absolute inset-0'
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
