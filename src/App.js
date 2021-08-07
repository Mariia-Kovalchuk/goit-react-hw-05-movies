import { lazy, Suspense, } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Loader from "react-loader-spinner";
import styles from './views/HomeView/HomeView.module.css'



const HomeView = lazy(() => import('./views/HomeView' /* webpackChunkName: "home-view" */));
const MoviesView = lazy(() => import('./views/MoviesView' /* webpackChunkName: "movies-view" */));
const MovieDetails =lazy(()=>import('./views/MovieDetailsView' /* webpackChunkName: "movies-details" */))
const NotFoundView =lazy(()=>import('./views/NotFoundView' /* webpackChunkName: "error404" */))


function App() {
  return (
    <div>
      <Navigation />

      <Suspense fallback={<Loader className={styles.Loader} type="Circles" color="#3f51b5" height={100} width={100} timeout={5000} />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path='/movies' exact>
            <MoviesView />
          </Route>

          <Route path='/movies/:movieId'>
            <MovieDetails />
          </Route>

          <Route >
            <NotFoundView />
          </Route>

        </Switch>



      </Suspense>
      

    </div>
  );
}

export default App;
