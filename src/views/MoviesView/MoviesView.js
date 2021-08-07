import { useEffect, useState, useRef} from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import * as moviesApi from '../../services/movies-api'
import qs from 'query-string';
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";



export default function MoviesView() {
    const { pathname, search } = useLocation()
    const [searchMovies, setSearchMovies] = useState();
    const [query, setQuery] = useState(qs.parse(search)?.query || '');
    const history = useHistory()
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);
    

    useEffect(() => {
         if (!search) {
            return;
        };

        const query = qs.parse(search)?.query;
        moviesApi.fetchSearch(query).then(films => (setSearchMovies(films.results)));
        setQuery('')
    }, [search]);



    const handleSearchQueryChange = (event) => {
        
        setQuery(event.target.value.toLowerCase());
    };



    function handleSubmit ( event) {
        event.preventDefault();

        if (query.trim() === '') {
            error({
                text: "Please enter your search query!",
                delay: 2000,
            });
            return
        };

        history.push({
            pathname,
            search: `?query=${query}`,
        });

        
    };
    
    return (
        <div>
            <header >
                <form  onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search movies"
                        onChange={handleSearchQueryChange}
                        value={query}
                        ref={inputRef}
                    />
                    <button type="submit" >Search </button>
                </form>
            </header>

            {searchMovies && searchMovies.length > 0 &&
                <ul>
                    {searchMovies && searchMovies.map(movie => (
                        <li key={movie.id}>
                            <Link to={{
                                pathname: `/movies/${movie.id}`,
                                state: {
                                    from: pathname,
                                    query: qs.parse(search)?.query,
                                }
                            }} >{movie.title || movie.name}</Link>
                        </li>
                    ))}
                </ul>
            
            }
            {searchMovies && searchMovies.length === 0 && <p>No match found. Please check your query!</p>}
        </div>

    );
    
}