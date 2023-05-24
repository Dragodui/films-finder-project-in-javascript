const input = document.querySelector('#filmName');
const findButton = document.querySelector('#findButton');
const filmsField = document.querySelector('#filmsField')

const apiKey = 'e5273486';
const apiLink = 'http://www.omdbapi.com/?apikey=';
const apiUrl = `${apiLink}${apiKey}`;

const fetchFilms = async(filmName) =>  {
    try {
        const url = `${apiUrl}&s=${filmName.replace(/\s/g, "+")}`;
        const response = await fetch(url);
        let result = await response.json();
        if (response.ok) {
            showFilmInfo(result.Search);
          } else {
            filmsField.innerHTML = `<p>Error ocupied: ${result.Error}</p>`;
          }
    }
    catch (error) {
        console.log(error)
        filmsField.innerHTML = `<p>Error ocupied: ${error.message}</p>`;
    }
}

const showFilmInfo = (results) => {
    filmsField.innerHTML = '';
    const resultTitle = document.createElement('h3');
    resultTitle.textContent ='Results:'

    const filmsList = document.createElement('div');
    filmsList.classList.add('filmsList')

    filmsField.appendChild(resultTitle);
    filmsField.appendChild(filmsList);
    results.forEach(result => {
        const filmTitle = document.createElement('h2');
        filmTitle.textContent = result.Title;
        filmTitle.classList.add('film__title');

        const filmRelease = document.createElement('p');
        filmRelease.textContent = result.Year;
        filmRelease.classList.add('film__date');

        const filmPoster = document.createElement('img');
        filmPoster.src = result.Poster;
        filmPoster.classList.add('film__poster');

        const film = document.createElement('div');
        film.classList.add('film');
        
        film.appendChild(filmPoster);
        film.appendChild(filmTitle);
        film.appendChild(filmRelease);

        filmsList.append(film);
    });
} 
findButton.addEventListener('click', () => {
    fetchFilms(input.value);
})