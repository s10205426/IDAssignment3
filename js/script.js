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
    sessionStorage.setItem('movieId', id);
    window.location = 'movieInfo.html';
    return false;
}

function getMovie(data) {
    let moviePosterPath = IMAGE_URL + data.poster_path;

    let genreList = '';
    for (i=0; i < data.genres.length; i++) {
        genreList += data.genres[i].name + ', ';
    }

    let productionList = '';
    for (i=0; i < data.production_companies.length; i++) {
        productionList += data.production_companies[i].name + ', ';
    }
    
    let output = `
        <div class="row">
            <div class="col-md-4">
                <img src="${moviePosterPath}" class="thumbnail">
            </div>
            <div class="col-md-8">
                <h4>${data.title}</h4>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre: </strong>${genreList.slice(0, -2)}</li>
                    <li class="list-group-item"><strong>Release Date: </strong>${data.release_date}</li>
                    <li class="list-group-item"><strong>Production: </strong>${productionList.slice(0, -2)}</li>
                    <li class="list-group-item"><strong>Ratings: </strong>${data.vote_average}</li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="well">
                <h4>Plot:</h4>
                <h5>${data.overview}<h5>
                <a href="index.html" class="btn"><h6>Go Back</h6></a>
            </div>
        </div>
    `;
    
    $('#movie').html(output);
}

$(searchId).on("click", function(event) { //Initiate API search on click
    event.preventDefault();
    const value = inputId.value;
    searchMovie(value);
    inputId.value = '';
});