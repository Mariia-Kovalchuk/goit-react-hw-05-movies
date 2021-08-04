const BASE_URL = 'https://api.themoviedb.org';
const API_KEY = 'eef5b52b5bdae4055927ca22f3b3a010';

function ApiService (url) {
    return fetch(url).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`No match found. Please check your query!`));
    })
};

export function fetchPopularMovies() {
  return ApiService(`${BASE_URL}/3/trending/all/day?api_key=${API_KEY}`);
};

export function fetchSearch(query) {
    return ApiService(`${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`)   
};

export function fetchMovieDetails(movieId) {
    return ApiService(`${BASE_URL}/3/movie/${movieId}?api_key=${API_KEY}`)
};

export function fetchActorsDetails(movieId) {
    return ApiService(`${BASE_URL}/3/movie/${movieId}/credits?api_key=${API_KEY}`)
};

export function fethReviews(movieId) {
    return ApiService(`${BASE_URL}/3/movie/${movieId}/reviews?api_key=${API_KEY}&page=1`)
}