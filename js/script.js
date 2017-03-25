$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText){
    axios.get('http://www.omdbapi.com?s='+searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index,movie) => {
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}" alt="imagen de portada">
                            <h5>${movie.Title}</h5>
                            <a href="#" onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary">Detalles de pelicula</a>
                        </div>
                    </div>
                `;
            });
            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    return false;
}
function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

      axios.get('http://www.omdbapi.com?i='+movieId)
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class=""thumbnail>
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group"><strong>Genero: </strong> ${movie.Genre}</li>
                            <li class="list-group"><strong>Lanzamiento: </strong> ${movie.Released}</li>
                            <li class="list-group"><strong>Calificacion: </strong> ${movie.Rated}</li>
                            <li class="list-group"><strong>Rating: </strong> ${movie.imdbRating}</li>
                            <li class="list-group"><strong>Director: </strong> ${movie.Director}</li>
                            <li class="list-group"><strong>Escritores: </strong> ${movie.Writer}</li>
                            <li class="list-group"><strong>Actores: </strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <h3>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Ver en IMDB</a>
                        <a href="index.html" class="btn btn-default">Nueva busqueda</a>
                    </div>
                </div>
            `;

            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        }); 
}