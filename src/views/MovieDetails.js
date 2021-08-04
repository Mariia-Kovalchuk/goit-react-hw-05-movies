import { useEffect, useState } from 'react';
// import { useLocation, useHistory } from 'react-router-dom';
import * as moviesApi from '../services/movies-api'
import { useParams } from 'react-router-dom';


const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState('');
  // const { state } = useLocation();
  // const history = useHistory();
  const { id } = useParams();


  useEffect(() => {
    moviesApi.fetchMovieDetails(id)
      .then((response) => setMovieDetails(response));
  }, [id]);

  return (
    <div className="movie-details">
      <button onClick={() => { }}>back</button>
      <img src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`} alt={movieDetails.title || movieDetails.name} />
      <h1>{movieDetails.title || movieDetails.name}</h1>
      <h2>Overview</h2>
      <p>{movieDetails.overview}</p>
      <h2>Genres</h2>

      <h3>Additional Informatin</h3>
    </div>
  );
};

export default MovieDetails;
