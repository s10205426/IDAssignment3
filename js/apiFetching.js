const API_KEY = 'd8bf019d0cca372bd804735f172f67e8';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=d8bf019d0cca372bd804735f172f67e8`;
    return url;
}

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function searchMovie(value) {
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;

    requestMovies(url, renderSearchMovies, handleError);
}