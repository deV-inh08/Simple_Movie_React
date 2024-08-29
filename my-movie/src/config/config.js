export const fetcher = (...args) => fetch(...args).then(res => res.json())
export const API_KEY = "939b4d71a1347aced70fc77fe9800e68";
export const endPoint = 'https://api.themoviedb.org/3/movie'
export const tmdbAPI = {
    getMoviesList: (type) => `${endPoint}/${type}?api_key=${API_KEY}`,
    getMovieDetail: (movieId) => `${endPoint}/${movieId}?api_key=${API_KEY}`,
    getMovieMeta: (movieId, type) => `${endPoint}/${movieId}/${type}?api_key=${API_KEY}`,
    getMovieUpComing: (type) => `${endPoint}/${type}?api_key=${API_KEY}`,
    setMoviePopular: (page) => `${endPoint}/popular?api_key=${API_KEY}&page=${page}`,
    setMovieQuery: (type, query, page) => `https://api.themoviedb.org/3/${type}/movie?api_key=939b4d71a1347aced70fc77fe9800e68&query=${query}&page=${page}`,
    imageBanner500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
    imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
}