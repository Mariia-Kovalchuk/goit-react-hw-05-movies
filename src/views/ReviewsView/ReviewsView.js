import { useState, useEffect } from "react"
import * as moviesApi from '../../services/movies-api'
import { useParams } from "react-router";
import styles from '../CastView/CastView.module.css'
import Loader from "react-loader-spinner";




export default function ReviewsViews() {
    const [reviews, setReviews] = useState();
    const [loading, setLoading] = useState(false);
      const { movieId } = useParams();


    useEffect(() => {
        setLoading(true)
        moviesApi.fethReviews(movieId).then(reviews => {
            setReviews(reviews.results);
            setLoading(false)
        })
    }, [movieId]);

    
    if (loading) {
        return (
            <Loader className={styles.Loader} type="Circles" color="#3f51b5" height={100} width={100} timeout={5000} />
        );
    };

    
    if (!loading && reviews &&reviews.length>0) {
        return (
            <ul>
                {reviews && reviews.map(review => (
                    <li key={review.id}>
                        <h3>{review.author}</h3>
                        <p>{review.content} </p>
                    </li>
                ))}
                
            </ul>
        );
    };

    if (!loading && reviews && reviews.length === 0) {

        return (
            <div>We don't have any reviews for this movie.</div>
        )
    };
    return (
        <div></div>
    )
};
