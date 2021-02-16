const API_KEY = 'd8bf019d0cca372bd804735f172f67e8';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=d8bf019d0cca372bd804735f172f67e8';

const searchId = document.querySelector('#search');
const inputId = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');

function movieSection(movies) { //Return movie image information
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `<img
                src=${IMAGE_URL + movie.poster_path}
                data-movie-id=${movie.id}
            />`;
        }
    })
}

function createMovieContainer(movies) {

    //Create an element to have movie data appended on the spot
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = //Contains movie data to be displayed
    `
        <section class="section">
            ${movieSection(movies)} 
        </section>
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSearchMovies(data) {
    movieSearchable.innerHTML = ''; //Clear previous data
    const movies = data.results; //Contains movie data taken from API
    const movieBlock = createMovieContainer(movies);
     movieSearchable.appendChild(movieBlock);
    console.log("Data: ", data);
}

$(searchId).on("click", function(event) { //Initiate API search on click
    event.preventDefault();
    const value = inputId.value;
    const newUrl = url + '&query=' + value;

    fetch(newUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)

    inputId.value = '';
    console.log("Value: ", value);
});