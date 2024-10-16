import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './Styles/App.css'
import './Styles/Components/Header/Header.css'
import './Styles/Pages/Home.css'
import './Styles/Components/Footer/Footer.css'
import './Styles/Components/Home/FreshPicks.css'
import './Styles/Components/Button/Buttons.css'
import './Styles/Components/Home/MovieCarousel.css'
import './Styles/Components/Home/NowShowing.css'
import './Styles/Components/Home/Popular.css'
import './Styles/Components/Home/Upcoming.css'
import Home from './pages/Home'
import MovieList from './pages/Lists/MovieList'
import TvList from './pages/Lists/TvList'
import PeopleList from './pages/Lists/PeopleList'
import './styles/Components/Lists/GridView.css'
import MovieDetails from './pages/Details/MovieDetails'
import MovieImages from './pages/Details/MovieImages'
import MovieCredits from './pages/Details/MovieCredits'
import MovieVideos from './pages/Details/MovieVideos'
import TvDetails from './pages/Details/TvDetails'
import TvCredits from './pages/Details/TvCredits'
import TvVideos from './pages/Details/TvVideos'
import TvImages from './pages/Details/TvImages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/movies',
    element: <MovieList />
  },
  {
    path: '/movies/:movieId',
    element: <MovieDetails />
  },
  {
    path: '/movies/:movieId/cast',
    element: <MovieCredits />
  },
  {
    path: '/movies/:movieId/videos',
    element: <MovieVideos />
  },
  {
    path: '/movies/:movieId/images/:mediaType',
    element: <MovieImages />
  },
  {
    path: '/tv',
    element: <TvList />
  },
  {
    path: '/tv/:tvId',
    element: <TvDetails />
  },
  {
    path: '/tv/:tvId/cast',
    element: <TvCredits />
  },
  {
    path: '/tv/:tvId/videos',
    element: <TvVideos />
  },
  {
    path: '/tv/:tvId/images/:mediaType',
    element: <TvImages />
  },
  {
    path: '/people',
    element: <PeopleList />
  }
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

