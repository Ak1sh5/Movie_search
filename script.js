const SEARCHAPI = 'https://imdb8.p.rapidapi.com/auto-complete?q=';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'b616ad0577msh29100b899d91052p133ccejsn0b49025bbf2a',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
};

function fetchMovies(url) {
    return fetch(url, options)
        .then(response => response.json())
        .then(data => data.d)
        .catch(err => {
            console.error(err);
            return [];
        });
}

function displayMovies(list) {
    const moviesContainer = document.querySelector('.movies');
    moviesContainer.innerHTML = "";

    list.forEach(item => {
        const name = item.l;
        const poster = item.i && item.i.imageUrl ? item.i.imageUrl : 'placeholder.jpg';
        const movie = `<li><img src="${poster}"><h2>${name}</h2></li>`;
        moviesContainer.innerHTML += movie;
    });
}

// Initial load
const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=game';
fetchMovies(url).then(displayMovies);

// Search functionality
const form = document.getElementById("form");
const search = document.getElementById("query");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = search.value;

    if (searchItem) {
        const newurl = SEARCHAPI + searchItem;
        fetchMovies(newurl).then(displayMovies);
        search.value = "";
    }
});
