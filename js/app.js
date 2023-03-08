const baseUrl ='https://api.themoviedb.org/3'
const key = "api_key=384ad7ece83317e3356e866845658ac0"
const api =
  baseUrl + "/trending/all/day?" +key ;
const img_url = "https://image.tmdb.org/t/p/w500";

const searchUrl = baseUrl +"/search/movie?"+ key

function movieApi(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => showMoives(data.results));
}
movieApi(api);

const main = document.getElementById("main");

function showMoives(data) {
  main.innerHTML=''
  data.forEach((movies) => {
    const { name, title, poster_path, vote_average,overview } = movies;
    //movieContainer
    const movieConatiner = document.createElement("div");
    movieConatiner.setAttribute("class", "movieContainer ");

    //moviemoviePoster
    const moviePoster = document.createElement("div");
    moviePoster.setAttribute("class", "movie");
    var poster = document.createElement("div");
    poster.innerHTML = `<img src="${
      poster_path == null ? 'assets/pngwing.com.png' : img_url + poster_path 
    }" class="moviePoster">`;
    moviePoster.appendChild(poster);
    movieConatiner.appendChild(moviePoster);

    //moviemovieName
    const movieName = document.createElement("div");
    movieName.setAttribute("class", "movieName");
    movieName.innerText = `${title || name}`;
    movieConatiner.appendChild(movieName);

    const rating = document.createElement("div");
    rating.setAttribute("class", "rating");
    rating.innerHTML = `<p>${parseFloat(vote_average).toFixed(1)}</p>`;
    movieConatiner.appendChild(rating);

    const description = document.createElement('div')
    description.setAttribute('class','overview')
    description.innerHTML =`<p >${ String(overview).slice(0,190)}</p>`
    movieConatiner.appendChild(description)

    main.append(movieConatiner);
  });
}

const form = document.getElementById('form')
const search = document.getElementById('search')

form.addEventListener('submit',(e)=>{
  e.preventDefault()
  const searchValue = search.value
  if (searchValue) {
    movieApi(searchUrl+'&query='+searchValue)
  }else{
    movieApi(api)
  }
})