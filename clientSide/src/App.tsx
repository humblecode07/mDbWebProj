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
import './styles/Components/Header/Admin/Header.css'
import './styles/Components/Admin/CreateMovie/AdditionalDetails.css'
import './styles/Components/Admin/CreateMovie/AddMovieDetails.css'
import './styles/Components/Admin/CreateMovie/MovieContentCheck.css'
import './styles/Components/Admin/CreateMovie/TranslationCheck.css'
import './styles/Components/Admin/CreateMovie/VerifyAndSave.css'
import './styles/Components/Admin/Credits/Jobs/JobSearch.css'
import './styles/Components/Admin/Credits/Jobs/JobSearchBar.css'
import './styles/Components/Admin/Credits/Search.css'
import './styles/Components/Admin/Credits/SearchBar.css'
import './styles/Components/Admin/Credits/SearchResult.css'
import './styles/Components/Admin/EditMovie/PrimaryDetails/AdultMovie.css'
import './styles/Components/Admin/EditMovie/PrimaryDetails/Budget.css'
import './styles/Components/Admin/EditMovie/PrimaryDetails/Homepage.css'
import './styles/Components/Admin/EditMovie/PrimaryDetails/MovieStatus.css'
import './styles/Components/Admin/EditMovie/PrimaryDetails/OriginalMovieLanguage.css'
import './styles/Components/Admin/EditMovie/PrimaryDetails/OriginalTitle.css'
import './styles/Components/Admin/EditMovie/PrimaryDetails/OriginCountry.css'
import './styles/Components/Admin/EditMovie/PrimaryDetails/Revenue.css'
import './styles/Components/Admin/EditMovie/PrimaryDetails/Runtime.css'
import './styles/Components/Admin/EditMovie/PrimaryDetails/TranslatedOverview.css'
import './styles/Components/Admin/EditMovie/PrimaryDetails/TranslatedTitle.css'
import './styles/Components/Admin/EditMovie/PrimaryDetails/Video.css'
import './styles/Components/Admin/EditMovie/ReleaseDates/CertificationsSelect.css'
import './styles/Components/Admin/EditMovie/ReleaseDates/CountrySearch.css'
import './styles/Components/Admin/EditMovie/ReleaseDates/CountrySearchBar.css'
import './styles/Components/Admin/EditMovie/ReleaseDates/LanguageSearch.css'
import './styles/Components/Admin/EditMovie/ReleaseDates/LanguageSearchBar.css'
import './styles/Components/Admin/EditMovie/Cast.css'
import './styles/Components/Admin/EditMovie/Crew.css'
import './styles/Components/Admin/EditMovie/ExternalIDs.css'
import './styles/Components/Admin/EditMovie/Genres.css'
import './styles/Components/Admin/EditMovie/Images.css'
import './styles/Components/Admin/EditMovie/PrimayDetails.css'
import './styles/Components/Admin/EditMovie/ReleaseInformation.css'
import './styles/Components/Admin/EditMovie/Taglines.css'
import './styles/Components/Admin/EditMovie/Videos.css'
import './styles/Components/Admin/Modals/Modals.css'
import './styles/Components/Admin/MovieDetails/Images.css'
import './styles/Components/Admin/MovieDetails/Recommendations.css'
import './styles/Components/Admin/MovieDetails/Videos.css'
import './styles/Components/Admin/SearchFilter.css'
import './styles/Components/Details/Casts.css'
import './styles/Components/Details/Credits.css'
import './styles/Components/Details/Divider.css'
import './styles/Components/Details/DividerTwo.css'
import './styles/Components/Details/Medias.css'
import './styles/Components/Details/Overview.css'
import './styles/Components/Details/OverviewMedia.css'
import './styles/Components/Details/OverviewPanel.css'
import './styles/Components/Details/Recommendations.css'
import './styles/Components/Details/Section.css'
import './styles/Components/Details/ShowCollege.css'
import './styles/Components/Details/Videos.css'
import './styles/Components/ShowsList/ListManager/FilteringOption/Certification.css'
import './styles/Components/ShowsList/ListManager/FilteringOption/Genres.css'
import './styles/Components/ShowsList/ListManager/FilteringOption/Keywords.css'
import './styles/Components/ShowsList/ListManager/FilteringOption/Language.css'
import './styles/Components/ShowsList/ListManager/FilteringOption/ReleaseYear.css'
import './styles/Components/ShowsList/ListManager/FilteringOption/Runtime.css'
import './styles/Components/ShowsList/ListManager/FilteringOption/SearchKeywords.css'
import './styles/Components/ShowsList/ListManager/FilteringOption/UserRating.css'
import './styles/Components/ShowsList/ListManager/FilteringOption/WatchProvider.css'
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
import SignIn from './pages/SignIn'
import { AuthProvider } from './context/AuthContext'
import PublicLayout from './pages/PublicLayout'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminPage from './pages/Admin/AdminPage'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './pages/PersistLogin'
import AdminMovie from './pages/Admin/AdminMovie'
import CreateMovie from './pages/Admin/CreateMovie'
import EditMovie from './pages/Admin/EditMovie'
import AdminMovieDetails from './pages/Admin/AdminMovieDetails'
import Register from './pages/Register'

const adminRole = Number(import.meta.env.VITE_YT_ROLE_ADMIN);
export const LOCALHOST = 'http://localhost:3000';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
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
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/signup',
        element: <Register />
      }
    ]
  },
  {
    path: '*',
    element: <PersistLogin />,
    children: [
      {
        path: 'admin',
        element: (
          <RequireAuth allowedRoles={[adminRole]}>
            <AdminLayout />
          </RequireAuth>
        ),
        children: [
          { path: '', element: <AdminPage /> },
          { path: 'movie', element: <AdminMovie /> },
          { path: 'movie/create', element: <CreateMovie /> },
          { path: 'movie/:movieId', element: <AdminMovieDetails /> },
          { path: 'movie/:movieId/edit', element: <EditMovie /> },
        ]
      }
    ]
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

