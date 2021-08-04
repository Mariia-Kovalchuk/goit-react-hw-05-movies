import { lazy, Suspense, } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';

const HomeView = lazy(() => import('./views/HomeView.js' /* webpackChunkName: "home-view" */));
const MoviesView = lazy(() => import('./views/MoviesView.js' /* webpackChunkName: "movies-view" */));
const MovieDetails =lazy(()=>import('./views/MovieDetails.js' /* webpackChunkName: "movies-details" */))


function App() {
  return (
    <div>
      <Navigation />

      <Suspense fallback={<h1>ЗАГРУЖАЕМ МАРШРУТ...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path='/movies' exact>
            <MoviesView />
          </Route>

          <Route path='/movies/:id'>
            <MovieDetails />
          </Route>

        </Switch>



      </Suspense>
      

    </div>
  );
}

export default App;
