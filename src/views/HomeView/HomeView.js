import * as moviesApi from '../../services/movies-api'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import styles from './HomeView.module.css'
import Loader from "react-loader-spinner";




export default function HomeView() {
    const [trendMovies, setTrendMovies] = useState();
    const [loading, setLoading]= useState(false)
    const { pathname } = useLocation()
    


    useEffect(() => {
        setLoading(true)
        moviesApi.fetchPopularMovies().then(results => {
            setTrendMovies(results.results)
            setLoading(false)
        });
    },[])

    return (
        <>
            <h1>Trending Today</h1>
            {loading && <Loader className={styles.Loader} type="Circles" color="#3f51b5" height={100} width={100} timeout={5000} />}

            <ul>
                {trendMovies && trendMovies.map(movie => (
                    <li key={movie.id}>
                        <Link to={{
                            pathname: `/movies/${movie.id}`,
                            state: {
                                from: pathname
                            }
                        }}>{movie.title || movie.name}</Link>
                    </li>
                ))}
            </ul>
        
        </>


    );
    
}