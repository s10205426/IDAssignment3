const searchId = document.querySelector('#search');
const inputId = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');

function movieSection(movies) { //Return movie image information
    const section = document.createElement('section');
    section.classList = 'section';

    movies.map((movie) => {
        if (movie.poster_path) { //Display poster if image is available
            const img = document.createElement('img');
            img.setAttribute('class', 'movie-poster');
            img.src = IMAGE_URL + movie.poster_path;
            img['data-movie-id'] = IMAGE_URL + movie.poster_path;

            section.appendChild(img);
        }
    })
    return section;
}

function createMovieContainer(movies) {

    //Create an element to have movie data appended on the spot
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'container movie');

    const content = document.createElement('div');
    content.classList = 'content';

    const section = movieSection(movies);

    movieElement.appendChild(section);
    movieElement.appendChild(content);

    return movieElement;
}

function renderSearchMovies(data) {
    movieSearchable.innerHTML = ''; //Clear previous data
    const movies = data.results; //Contains movie data taken from API
    const movieBlock = createMovieContainer(movies);
     movieSearchable.appendChild(movieBlock);
}

function handleError(error) {
    console.log('Error: ', error);
}

$(searchId).on("click", function(event) { //Initiate API search on click
    event.preventDefault();
    const value = inputId.value;
    searchMovie(value);
    inputId.value = '';
});