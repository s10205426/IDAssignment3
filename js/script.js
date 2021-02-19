const searchId = document.querySelector('#search');
const inputId = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');

//Create container containing image & movie id
function createImageContainer(imageUrl, id) {
    const tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'imageContainer');
    tempDiv.setAttribute('data-id', id);

    const movieElement = `
        <img src="${imageUrl}" alt="" data-movie-id="${id}" onclick="movieSelected('${id}')" class="movie-poster">
    `;
    tempDiv.innerHTML = movieElement;

    return tempDiv;
}

//Initialise creation of individual image containers
function generateMoviesBlock(data) {
    const movies = data.results;
    const section = document.createElement('section');
    section.classList = 'section';

    for (let i = 0; i < movies.length; i++) {
        const { poster_path, id } = movies[i];

        if (poster_path) { //Check if poster is available
            const imageUrl = IMAGE_URL + poster_path;
    
            const imageContainer = createImageContainer(imageUrl, id);
            section.appendChild(imageContainer);
        }
    }

    const movieSectionAndContent = createMovieContainer(section);
    return movieSectionAndContent;
}

function createMovieContainer(section) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'container movie');

    const template = `
    `;

    movieElement.innerHTML = template;
    movieElement.insertBefore(section, movieElement.firstChild);
    return movieElement;
}

function renderSearchMovies(data) {
    movieSearchable.innerHTML = ' '; //Clear previous data
    const movieBlock = generateMoviesBlock(data);
    movieSearchable.appendChild(movieBlock);
}

function handleError(error) {
    console.log('Error: ', error);
}

function movieSelected(id) {
    console.log('hi');
    sessionStorage.setItem('movieId', id);
    window.location = 'movieInfo.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
}

$(searchId).on("click", function(event) { //Initiate API search on click
    event.preventDefault();
    const value = inputId.value;
    searchMovie(value);
    inputId.value = '';
});

$(document).on("click", function(event) { //Checking purpose to be deleted
    const target = event.target;
    
    if (target.tagName.toLowerCase() === 'img') {
        console.log('hello');
        console.log(event);
    }
})