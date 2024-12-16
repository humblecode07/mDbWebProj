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
		<div className="admin-movie-details-container">
			<div className='hero-section'>
				<div className='backdrop-container'>
					<div className='backdrop-gradient'></div>
					<img
						className='backdrop-image'
						src={`http://localhost:3000/images/${data.backdrop_path}`}
						alt={data.original_title || data.title}
					/>
					<NavLink
						to="edit"
						className="edit-button"
					>
						<EditIcon />
						<span>Edit Movie</span>
					</NavLink>
				</div>
				<div className='movie-info-container'>
					<div className='poster-container'>
						<img
							className='poster-image'
							src={`http://localhost:3000/images/${data.poster_path}`}
							alt={data.original_title || data.title}
						/>
					</div>
					<div className='movie-details scrollbar-none'>
						<span className='title'>{data.title || data.original_title}</span>
						<div className='movie-metadata'>
							<span className='certification'>{data.certifications}</span>
							<span>
								{data.release_date}
							</span>
							<div className='genres'>
								{data.genres.map((genre, index) => (
									<span key={index}>
										{genre}{index < data.genres.length - 1 && ", "}
									</span>
								))}
							</div>
						</div>
						<div className='rating-section'>
							<div className='rating-details'>
								<StarLIcon />
								<div className='rating-numbers'>
									<div className='rating-wrapper'>
										<span className='vote-average'>{data.vote_average}</span>
										<span className='vote-count'>{data.vote_count}</span>
									</div>
									<span className='max-rating'>/10</span>
								</div>
							</div>
							<div className='action-buttons'>
								<div className='rate-button'>
									<StarOutlineLIcon />
									<span>Rate</span>
								</div>
								<div className='icon-buttons'>
									<button>
										<WatchListSIcon />
									</button>
									<button>
										<HeartIcon />
									</button>
								</div>
							</div>
						</div>
						<span className='tagline'>{data.tagline}</span>
						<span className='overview'>{data.overview}</span>
					</div>
				</div>
			</div>
			<div className='video-trailer-section'>
				<iframe
					className='trailer-iframe'
					width="568.54"
					height="320"
					src={data.trailer || 'https://craftypixels.com/placeholder-image/594x334/999799/31317d'}
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>
				<div className='data-container scrollbar-none'>
					<DividerTwo />
					<div className="details-container">
						<div className="info-row">
							<span className="label">Original Title</span>
							<span>{data.original_title}</span>
						</div>
					</div>
					<DividerTwo />
					<div className="director-container">
						<span className="label">Director</span>
						{data.director ? (
							<a className="link">{data.director}</a>
						) : (
							<span className="na">N/A</span>
						)}
					</div>
					<DividerTwo />
					<div className="writers-container">
						<span className="label">Writers</span>
						<div className="writers-list">
							{data.writers && data.writers.length > 0 ? (
								data.writers.map((writer, index) => (
									<React.Fragment key={index}>
										<span className="writer">
											<a className="link">{writer}</a>
										</span>
										{index < data.writers.length - 1 && <span> • </span>}
									</React.Fragment>
								))
							) : (
								<span className="na">N/A</span>
							)}
						</div>
					</div>
					<DividerTwo />
					<div className="stars-container">
						<div className="info-row">
							<span className="label">Stars</span>
							<div className="stars-list">
								{data.stars && data.stars.length > 0 ? (
									data.stars.map((star, index) => (
										<React.Fragment key={index}>
											<span className="star">
												<a className="link">{star}</a>
											</span>
											{index < data.stars.length - 1 && <span> • </span>}
										</React.Fragment>
									))
								) : (
									<span className="na">N/A</span>
								)}
							</div>
						</div>
					</div>
					<DividerTwo />
					<div className="links-container">
						<div className="info-row">
							<span className="label">Links</span>
							<div className="links-list">
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
									<span className="na">N/A</span>
								)}
							</div>
						</div>
					</div>
					<DividerTwo />
					<div className="status-container">
						<div className="info-row">
							<span className="label">Status</span>
							<span className="status">{data.status}</span>
						</div>
					</div>
					<DividerTwo />
					<div className="budget-container">
						<div className="info-row">
							<span className="label">Budget</span>
							{data.budget !== "$0.00" ? (
								<span>{data.budget}</span>
							) : (
								<span className="na">N/A</span>
							)}
						</div>
					</div>
					<DividerTwo />
					<div className="revenue-container">
						<div className="info-row">
							<span className="label">Revenue</span>
							{data.revenue !== "$0.00" ? (
								<span>{data.revenue}</span>
							) : (
								<span className="na">N/A</span>
							)}
						</div>
					</div>
					<DividerTwo />
				</div>
			</div>
			<div className='cast-crew-section'>
				<div className='cast-container scrollbar-none'>
					<div className='section-header'>
						<span className='section-title'>Cast</span>
						<span className='.section-count'>{data.credits.cast.length}</span>
						<div className='divider-width--one'>
							<DividerTwo />
						</div>
					</div>
					<ul className='member-list scrollbar-none'>
						{data.credits.cast.map((member, index) => {
							return (
								<li key={index} className='member-item'>
									<img
										className='member-image'
										src={member.profile_path
											? `https://image.tmdb.org/t/p/original${member.profile_path}`
											: 'https://placehold.co/66x66'}
										alt={member.name}
									/>
									<div className='member-details'>
										<span className='member-name'>{member.name}</span>
										<span className='member-role'>{member.character}</span>
									</div>
								</li>
							)
						})}
					</ul>
				</div>
				<div className='crew-container'>
					<div className='section-header'>
						<span className='section-title'>Crew</span>
						<span className='section-count'>{data.crew_count}</span>
						<div className='divider-width--one'>
							<DividerTwo />
						</div>
					</div>
					<div className='member-list scrollbar-none'>
						{Object.entries(data.credits.crew).map(([department, members]) => (
							<div key={department} className="admin-movie-details--department-container">
								<h2 className="department-title">{department}</h2>
								<ul className="members-list">
									{members.map((member, index) => (
										<li key={index} className="member-item">
											<img
												className="profile-image"
												src={member.profile_path
													? `https://image.tmdb.org/t/p/original${member.profile_path}`
													: 'https://placehold.co/66x66'}
												alt={member.name}
											/>
											<div className="member-info">
												<span className="member-name">{member.name}</span>
												<span className="member-job">{member.job}</span>
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
