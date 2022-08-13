
import { useEffect, useState } from 'react';

let API_key = "&api_key=b02a6a803e1ffd4b310ba6dbcadf3c53";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["Popular", "Theatre", "Kids", "Drama", "Comedy"];

const Home = () => {
    const [movieData, setData] = useState([]);
    const [url_set, setUrl] = useState(url);
    const [search, setSearch] = useState();

    useEffect(() => {
        fetch(url_set)
            .then(res => res.json())
            .then(data => {
            setData(data.results);
            // console.log(data.results);
        });
    }, [url_set])

    const getData = (movieType) => {
        if (movieType === "Popular") {
            url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
        }
        if (movieType === "Theatre") {
            url = base_url + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + API_key;
        }
        if (movieType === "Kids") {
            url = base_url + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" + API_key;
        }
        if (movieType === "Drama") {
            url = base_url + "/discover/movie?with_genres=18&primary_release_year=2014" + API_key;
        }
        if (movieType === "Comedy") {
            url = base_url + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" + API_key;
        }
        setUrl(url);

    }
    let img_path="https://image.tmdb.org/t/p/w500";

    const searchMovie=(evt)=>{
        if(evt.key==="Enter")
        {
            url=base_url+"/search/movie?api_key=b02a6a803e1ffd4b310ba6dbcadf3c53&query="+search;
            setUrl(url);
            setSearch(" ");
        }
    }
    return (
        <>
            <div className="header">
                <nav>
                    <ul>
                        {
                            arr.map((value, pos) => {
                                return (
                                    <li key={pos}><a href="#home" key={pos} name={value} onClick={(e) => { getData(e.target.name) }}>{value}</a></li>
                                )
                            })
                        }

                    </ul>
                </nav>
                <form>
                <div className="search-btn">
                        <input type="text" placeholder="Enter Movie Name" 
                        className="inputText" onChange={(e)=>{setSearch(e.target.value)}} 
                         onKeyPress={searchMovie}>
                        </input>
                        <button type='submit' aria-label="Name"><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </div>
            <div className="container">

                {movieData.map((movie) => (

                    <div key={movie.id} className="movie">
                        <img src={img_path + movie.poster_path} alt="poster" className="poster" />
                        <div className="movie-details">
                            <div className="box">
                                <h4 className="title">{movie.title}</h4>
                                <p className="rating">{movie.vote_average}</p>
                            </div>
                            <div className="overview">
                                <h1>overview</h1>
                                {movie.overview}
                            </div>
                        </div>
                    </div>

                ))}

            </div>
        </>
    )
}
export default Home;
