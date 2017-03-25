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
                            <a href="index.html" onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary">Detalles de pelicula</a>
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
