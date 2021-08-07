import { Suspense, useEffect, useState, lazy } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import * as moviesApi from '../../services/movies-api'
import { useParams, Link, useRouteMatch, Route } from 'react-router-dom';
import styles from './MovieDetailsView.module.css'
import Loader from "react-loader-spinner";


const Cast =lazy(()=>import('../CastView/CastView' /* webpackChunkName: "cast" */))
const Reviews =lazy(()=>import('../ReviewsView/ReviewsView' /* webpackChunkName: "reviews" */))



const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState('');
  const [error, setError] = useState()
  const { state } = useLocation();
  const history = useHistory();
  const { movieId } = useParams();
  const { url, path } = useRouteMatch()
  



  useEffect(() => {
    moviesApi.fetchMovieDetails(movieId)
      .then((response) => setMovieDetails(response))
      .catch(error => {
        setError(error);
      });
  }, [movieId]);

  const handleGoBack = () => {
  if (state?.query) {
    history.push({
      pathname: state.from,
      search: `query=${state.query}`

    })
    return;
    }

     if (!state?.query && state?.from) {
    history.push({
      pathname: state.from,
    })
    return;
    }
  

  history.push({
    pathname: '/',
  });
};
  

  return (
    <>
      <button className={styles.GoBackBtn} onClick={handleGoBack}>Go back</button>
      {movieDetails && <div className="movie-details">

        <div className={styles.MainMovieInfo}>
          {movieDetails.poster_path && <img src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`} className={styles.MoviePoster} alt={movieDetails.title || movieDetails.name} />}
          <div className={styles.MainMovieInfoDetails}>
            <h1>{movieDetails.title || movieDetails.name}</h1>
            {movieDetails.vote_average ? <p>User score: {Math.round(movieDetails.vote_average * 10)}%</p> : <p>No data</p>}
            <h2>Overview</h2>
            {movieDetails.overview ? <p>{movieDetails.overview}</p> : <p>No data</p>}
            <h2>Genres</h2>
            {movieDetails.genres && movieDetails.genres.length > 0 ? <ul className={styles.GenresList}>
              {movieDetails.genres.map(genre => (
                <li key={genre.id} className={styles.GenreItem}>{genre.name}</li>
              ))}
            </ul> : <p>No data</p>}
          </div>
        </div>

        <hr />

        <h3>Additional Informatin</h3>
        <ul>
          <li>
            <Link to={{
              pathname: `${url}/cast`,
              state: {
                from: state?.from || '/',
                query: state?.query || '',
              }
            }}
            >Cast</Link>
          </li>
          <li>
            <Link to={{
              pathname: `${url}/reviews`,
              state: {
                from: state?.from || "/",
                query: state?.query || '',
              }
            }}
            >Reviews</Link>
          </li>

        </ul>
        <hr />

      </div>}
      {error &&
        <>
          <p > No detailed information found. </p>
        </>}


      <Suspense fallback={<Loader className={styles.Loader} type="Circles" color="#3f51b5" height={100} width={100} timeout={5000} />}>
        <Route path={`${path}/cast`} >
          <Cast />
        </Route>
        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </Suspense>
    </>
  );
};

export default MovieDetails;
