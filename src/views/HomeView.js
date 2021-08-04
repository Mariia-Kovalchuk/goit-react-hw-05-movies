import * as moviesApi from '../services/movies-api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';



export default function HomeView() {
    const [trendMovies, setTrendMovies] = useState();


    useEffect(() => {
        moviesApi.fetchPopularMovies().then(results => {
            console.log(results)
            setTrendMovies(results.results)
        });
    },[])

    return (
        <>
        <h1>Trending Today</h1>
        <ul>
            {trendMovies&&trendMovies.map(movie=>(
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>{movie.title || movie.name}</Link>
                </li>
            ))}
        </ul>
        
        </>


    )
    
}