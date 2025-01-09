import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { getMyMovieDataApi, languages } from '../../api/api';
import EditIcon from '../../assets/Icons/Admin/EditIcon';
import StarLIcon from '../../assets/Icons/StarLIcon';
import StarOutlineLIcon from '../../assets/Icons/StarOutlineLIcon';
import WatchListSIcon from '../../assets/Icons/WatchListSIcon';
import HeartIcon from '../../assets/Icons/HeartIcon';
import { FacebookIcon, HomepageIcon, IMDbIcon, InstagramIcon, TwitterIcon, WikiDataIcon } from '../../assets/Icons/LinkIcons';
import Divider from '../../components/ShowsList/Divider';
import DividerTwo from '../../components/Details/DividerTwo';
import Images from '../../components/Admin/MovieDetails/Images';
import Recommendations from '../../components/Admin/MovieDetails/Recommendations';
import Videos from '../../components/Admin/MovieDetails/Videos';

const fetchMovieData = async (movieId) => {
	const response = await getMyMovieDataApi('movie', movieId);

	document.title = response.movie.title;

	const officialTrailer = (response.movie.videos && response.movie.videos.length > 0)
		? response.movie.videos.filter(
			video => video.name.toLowerCase().includes('official') && video.name.toLowerCase().includes('trailer')
		)
		: (!response.movie.videos ? response.movie.videos.filter(
			video => video.name.toLowerCase().includes('official') && video.name.toLowerCase().includes('trailer')
		) : 0
		);

	const trailer = officialTrailer.length > 0
		? `https://www.youtube.com/embed/${officialTrailer[0].key}?si=8l7P2cs2GNCdH2-L`
		: response.movie?.videos
			? (() => {
				const foundVideo = response.movie.videos.find(video => video.type === 'Trailer' && video.site === 'Youtube');
				return foundVideo ? `https://www.youtube.com/embed/${foundVideo.key}?si=8l7P2cs2GNCdH2-L` : null;
			})()
			: response.movie.videos
				? (() => {
					const foundVideo = response.movie.videos.find(video => video.type === 'Trailer' && video.site === 'Youtube');
					return foundVideo ? `https://www.youtube.com/embed/${foundVideo.key}?si=8l7P2cs2GNCdH2-L` : null;
				})()
				: null;

	const certifications = response.movie.release_dates?.results.filter((country) =>
		[response.movie.origin_country[0], "US"].includes(country.iso_3166_1)
	);

	const director = response.movie.credits.crew.find((member) => member.job === "Director");
	const writers = response.movie.credits.crew.filter((member) => member.department === "Writing").slice(0, 3).map((writer) => writer.name);
	const stars = response.movie.credits.cast.slice(0, 3).map((star) => star.name);

	const hours = response.movie.runtime ? Math.floor(response.movie.runtime / 60) : 0;
	const minutes = response.movie.runtime ? response.movie.runtime % 60 : 0;

	const crewCount = response.movie.credits.crew.length;

	const groupedCrew = response.movie.credits.crew.reduce((acc, member) => {
		if (!acc[member.department]) acc[member.department] = [];

		acc[member.department].push(member);

		return acc;
	}, {})

	return {
		...response.movie,
		trailer: trailer,
		certifications:
			certifications[0]?.release_dates?.find(item => item.certification !== '')?.certification ||
			certifications[1]?.release_dates?.find(item => item.certification !== '')?.certification ||
			undefined,
		director: director ? director.name : undefined,
		writers: writers.length > 0 ? writers : undefined,
		stars: stars,
		runtime: response.movie.runtime ? `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}` : 'N/A',
		budget: new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(response.movie.budget),
		revenue: new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(response.movie.revenue),
		vote_average: response.movie.vote_average.toFixed(1) || 0,
		vote_count: ((response.movie.vote_count / 1000).toFixed(1) + 'k'),
		genres: response.movie.genres.map((genre) => genre.name).slice(0, 3),
		release_date: new Date(response.movie.release_date).toLocaleDateString('en-PH'),
		credits: {
			cast: response.movie.credits.cast,
			crew: groupedCrew
		},
		crew_count: crewCount
	};
};

const AdminMovieDetails = () => {
	const { movieId } = useParams();

	const { data, error, isLoading } = useQuery({
		queryKey: ['movieData', movieId],
		queryFn: () => fetchMovieData(movieId),
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error fetching data: {error.message}</div>;

	console.log(data);

	return (
		<div className="w-[66.1875rem] h-auto flex flex-col gap-[2rem] font-roboto pb-[5rem]">
			<div className='w-full h-[30.6875rem] relative'>
				<div className='w-full h-[26.6875rem] absolute z-[5]'>
					<div className='absolute inset-0 bg-gradient-to-b from-[rgba(17,17,17,0)] to-[rgba(17,17,17,1)]'></div>
					<img
						className='w-full h-full object-cover rounded-[1rem]'
						src={`http://localhost:3000/images/${data.backdrop_path}`}
						alt={data.original_title || data.title}
					/>
					<NavLink
						to="edit"
						className="h-[3.0625rem] absolute top-0 right-0 mt-[1.8125rem] mr-[1.8125rem] px-[1.375rem] flex items-center justify-center gap-[0.625rem] rounded-full bg-[#CC511D] text-white font-medium shadow-md hover:bg-[#FF6B35] hover:scale-105 transition-transform duration-200 hover:shadow-lg"
					>
						<EditIcon />
						<span>Edit Movie</span>
					</NavLink>
				</div>
				<div className='w-[60.0625rem] h-[16.375rem] absolute bottom-0 z-[7] flex gap-[1.625rem] px-[3.0625rem]'>
					<div className='w-[11.8125rem] h-[16.375rem] rounded-[.75rem]'>
						<img
							className='w-full h-full object-cover rounded-[1rem]'
							src={`http://localhost:3000/images/${data.poster_path}`}
							alt={data.original_title || data.title}
						/>
					</div>
					<div className='w-[46.6875rem] flex flex-col overflow-auto scrollbar-none'>
						<span className='font-bold text-[2rem]'>{data.title || data.original_title}</span>
						<div className='flex gap-[1.3125rem] items-center'>
							<span className='border border-white border-solid px-[5px] py-[2px]'>{data.certifications}</span>
							<span>
								{data.release_date}
							</span>
							<div>
								{data.genres.map((genre, index) => (
									<span key={index}>
										{genre}{index < data.genres.length - 1 && ", "}
									</span>
								))}
							</div>
						</div>
						<div className='flex gap-[1.5rem] pt-[.875rem]'>
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
							<div className='flex gap-[1.5rem]'>
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
						<span className='font-light italic text-[.875rem] pt-[0.5625rem]'>{data.tagline}</span>
						<span className='text-[.875rem] pt-[0.5625rem]'>{data.overview}</span>
					</div>
				</div>
			</div>
			<div className='w-full h-[20rem] flex gap-[1.77875rem] flex-shrink-0'>
				<iframe
					className='rounded-[1rem] flex-shrink-0'
					width="568.54"
					height="320"
					src={data.trailer || 'https://craftypixels.com/placeholder-image/594x334/999799/31317d'}
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>
				<div className='w-[30.0625rem] h-auto flex flex-col overflow-y-auto scrollbar-none'>
					<DividerTwo />
					<div className='flex flex-col gap-[0.9375rem] py-[0.9375rem]'>
						<div className='flex gap-[1.4375rem]'>
							<span className='font-bold'>Original Title</span>
							<span>{data.original_title}</span>
						</div>
					</div>
					<DividerTwo />
					<div className='flex gap-[1.4375rem] py-[0.9375rem]'>
						<span className='font-bold'>Director</span>
						{data.director ? (
							<a className='text-[#4397FA]'>{data.director}</a>
						) : (
							<span className='text-[#ff8731]'>N/A</span>
						)}
					</div>
					<DividerTwo />
					<div className='flex gap-[1.4375rem] py-[0.9375rem]'>
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
					<DividerTwo />
					<div className='flex flex-col gap-[0.9375rem] py-[0.9375rem]'>
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
					<DividerTwo />
					<div className='flex flex-col gap-[0.9375rem] py-[0.9375rem]'>
						<div className='flex gap-[1.4375rem] items-center'>
							<span className='font-bold'>Links</span>
							<div className='flex gap-[1rem] items-center'>
								{data.external_ids.facebook_id || data.external_ids.twitter_id || data.external_ids.instagram_id || data.external_ids.wikidata || data.external_ids.imdb_id || data.homepage ? (
									<>
										{data.external_ids.facebook_id && (
											<a href={`https://www.facebook.com/${data.external_ids.facebook_id}`} target="_blank" rel="noopener noreferrer">
												<FacebookIcon />
											</a>
										)}
										{data.external_ids.twitter_id && (
											<a href={`https://twitter.com/${data.external_ids.twitter_id}`} target="_blank" rel="noopener noreferrer">
												<TwitterIcon />
											</a>
										)}
										{data.external_ids.instagram_id && (
											<a href={`https://www.instagram.com/${data.external_ids.instagram_id}`} target="_blank" rel="noopener noreferrer">
												<InstagramIcon />
											</a>
										)}
										{data.external_ids.wikidata && (
											<a href={`https://www.wikidata.org/wiki/${data.external_ids.wikidata}`} target="_blank" rel="noopener noreferrer">
												<WikiDataIcon />
											</a>
										)}
										{data.external_ids.imdb_id && (
											<a href={`https://www.imdb.com/title/${data.external_ids.imdb_id}`} target="_blank" rel="noopener noreferrer">
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
					<DividerTwo />
					<div className='flex flex-col gap-[0.9375rem] py-[0.9375rem]'>
						<div className='flex gap-[1.4375rem]'>
							<span className='font-bold'>Status</span>
							<span className='text-[#12AD18]'>{data.status}</span>
						</div>
					</div>
					<DividerTwo />
					<div className='flex flex-col gap-[0.9375rem] py-[0.9375rem]'>
						<div className='flex gap-[1.4375rem]'>
							<span className='font-bold'>Budget</span>
							{data.budget !== "$0.00"
								? <span>{data.budget}</span>
								: <span className='text-[#ff8731]'>N/A</span>
							}
						</div>
					</div>
					<DividerTwo />
					<div className='flex flex-col gap-[0.9375rem] py-[0.9375rem]'>
						<div className='flex gap-[1.4375rem]'>
							<span className='font-bold'>Revenue</span>
							{data.revenue !== "$0.00"
								? <span>{data.revenue}</span>
								: <span className='text-[#ff8731]'>N/A</span>
							}
						</div>
					</div>
					<DividerTwo />
				</div>
			</div>
			<div className='w-full h-[35.5625rem] flex gap-[1.5rem]'>
				<div className='w-[32.3125rem] h-full flex flex-col gap-[2rem] overflow-auto scrollbar-none'>
					<div className='w-full h-[2.1875rem] flex items-center gap-[1rem]'>
						<span className='text-[1.875rem] font-bold'>Cast</span>
						<span className='text-[#B1B1B1] text-[.875rem]'>{data.credits.cast.length}</span>
						<div className='w-[25rem]'>
							<DividerTwo />
						</div>
					</div>
					<ul className='h-full flex flex-col gap-[2rem] overflow-auto scrollbar-none'>
						{data.credits.cast.map((member, index) => {
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
				<div className='w-[32.3125rem] h-[35.5625rem] flex flex-col gap-[2rem]'>
					<div className='w-full h-[2.1875rem] flex items-center gap-[1rem]'>
						<span className='text-[1.875rem] font-bold'>Crew</span>
						<span className='text-[#B1B1B1] text-[.875rem]'>{data.crew_count}</span>
						<div className='w-[25rem]'>
							<DividerTwo />
						</div>
					</div>
					<div className='h-full flex flex-col gap-[2rem] overflow-auto scrollbar-none'>
						{Object.entries(data.credits.crew).map(([department, members]) => (
							<div key={department} className='flex flex-col gap-[.875rem]'>
								<h2 className='text-[1rem] text-[#9E9E9E] font-bold'>{department}</h2>
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
				</div>
			</div>
			<Images
				movieData={data}
			/>
			<Videos
				movieData={data}
			/>
			<Recommendations
				movieData={data}
			/>
		</div>
	)
}

export default AdminMovieDetails
