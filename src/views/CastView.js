import { useState, useEffect } from "react"
import * as moviesApi from '../services/movies-api'
import { useParams } from "react-router";



export default function CastView() {
    const [cast, setCast] = useState();
    const {movieId} = useParams()


    useEffect(() => {
    moviesApi.fetchActorsDetails(movieId).then(info=>(setCast(info.cast)))
},[movieId])


    return (
        <ul>
            {cast && cast.map(actor => (
                <li key={actor.id} >
                    {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={ actor.name} />}
                    <p>{ actor.name}</p>
                    <p>Character: { actor.character}</p>
                    </li>
            ))}

            </ul>
    )
} 