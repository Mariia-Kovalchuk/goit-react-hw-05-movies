import { useState, useEffect } from "react"
import * as moviesApi from '../../services/movies-api'
import { useParams } from "react-router";
import styles from './CastView.module.css'
import Loader from "react-loader-spinner";




export default function CastView() {
    const [cast, setCast] = useState();
    const [loading, setLoading] = useState(false);
    const {movieId} = useParams()


    useEffect(() => {
        setLoading(true)
            moviesApi.fetchActorsDetails(movieId).then(info => {
            setCast(info.cast);
            setLoading(false);
        })

  }, [movieId])
    
    if (loading) {
        return (
            <Loader className={styles.Loader} type="Circles" color="#3f51b5" height={100} width={100} timeout={5000} />
        )
    };
    
    if (!loading && cast && cast.length > 0) {
    return (
        <ul className={styles.ActorsGallery}>
            {cast && cast.map(actor => (
                <li key={actor.id} className={styles.ActorsGalleryItem}>
                    {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} className={styles.ActorsGalleryItemImage} alt={actor.name} />}
                    <p>{actor.name}</p>
                    <p>Character: {actor.character}</p>
                </li>
            ))}
        </ul>
    );
    
    };
    
    if (!loading && cast && cast.length===0) {
        return (
            <p>We don't have any information about the cast of this movie.</p>
        );
    };

    return (
        <div></div>
    )

};