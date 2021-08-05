import { useState, useEffect } from "react"
import * as moviesApi from '../services/movies-api'
import { useParams } from "react-router";



export default function ReviewsViews() {
    const [reviews, setReviews] = useState([])
      const { movieId } = useParams();


    useEffect(() => {
        moviesApi.fethReviews(movieId).then(reviews=>(setReviews(reviews.results)))
    }, [movieId])
    
    if (reviews.length>0) {
    return (
        <ul>
                {reviews&&reviews.map(review => (
                    <li key={review.id}>
                        <h3>{review.author}</h3>
                        <p>{review.content} </p>
                    </li>
                ))}
                
        </ul>
    )
    }
    return (
        <p>We don't have any reviews for this movie.</p>
    )
};
