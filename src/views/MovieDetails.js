import { Suspense, useEffect, useState, lazy } from 'react';
// import { useLocation, useHistory } from 'react-router-dom';
import * as moviesApi from '../services/movies-api'
import { useParams, Link, useRouteMatch, Route } from 'react-router-dom';

const Cast =lazy(()=>import('./CastView' /* webpackChunkName: "cast" */))
const Reviews =lazy(()=>import('./ReviewsView' /* webpackChunkName: "reviews" */))



const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState('');
  // const { state } = useLocation();
  // const history = useHistory();
  const { movieId } = useParams();
  const {url, path} = useRouteMatch()



  useEffect(() => {
    moviesApi.fetchMovieDetails(movieId)
      .then((response) => setMovieDetails(response));
  }, [movieId]);
  

  return (
    <>
      <div className="movie-details">
        <button onClick={() => { }}>back</button>
        {movieDetails&&<img src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`} alt={movieDetails.title || movieDetails.name} />}
        <h1>{movieDetails.title || movieDetails.name}</h1>
        <h2>Overview</h2>
        <p>{movieDetails.overview}</p>
        <h2>Genres</h2>

        <h3>Additional Informatin</h3>
        <ul>
          <li>
            <Link to={`${url}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`${url}/reviews`}>Reviews</Link>
          </li>

        </ul>


      </div>

      <Suspense fallback={<h1>ЗАГРУЖАЕМ МАРШРУТ...</h1>}>
        <Route path={`${path}/cast`} >
          <Cast/>
        </Route>
        <Route path={`${path}/reviews` }>
          <Reviews/>
        </Route>
      </Suspense>
    </>
  );
};

export default MovieDetails;
