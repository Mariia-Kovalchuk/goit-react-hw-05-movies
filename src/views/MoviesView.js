import { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import * as moviesApi from '../services/movies-api'



export default function MoviesView(params) {
    const [searchMovies, setSearchMovies] = useState();
    const [query, setQuery] = useState('');
    const history = useHistory()

    // useEffect(() => {
        // moviesApi.fetchSearch(query).then(console.log)
    // })



    const handleChangeInput = (e) => {
        setQuery(e.target.value);
        history.push({
            // pathname,
            search: `?query=${e.target.value}`,
        });
    };

    function fetchQuery() {
        moviesApi.fetchSearch(query).then(films=>(setSearchMovies(films.results)))

    }
    
    return (
        <div>
            <input type='text' onChange={handleChangeInput} value={query} />
            <button type='button' onClick={fetchQuery} >Search</button>

            <ul>
                {searchMovies && searchMovies.map(movie => (
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`}>{movie.title || movie.name}</Link>
                    </li>
                ))}
            </ul>

        </div>

    );
    
}