import React from 'react'
import { NavLink } from 'react-router-dom'

const NavigationMenu = () => {
	return (
		<ul className='flex gap-[1.75rem] items-center'>
			<li>
				<NavLink to="/movies">Movies</NavLink>
			</li>
			<li>
				<NavLink to="/tv">TV Shows</NavLink>
			</li>
			<li>
				<NavLink to="/people">People</NavLink>
			</li>
		</ul>
	)
}

export default NavigationMenu
