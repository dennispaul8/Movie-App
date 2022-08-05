import { useEffect, useState } from "react";

    let API_key="&api_key=b02a6a803e1ffd4b310ba6dbcadf3c53";
    let base_url="https://api.themoviedb.org/3";
    let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;

const Navbar = ({ }) => {

    const [movies, setMovies] = useState([]);
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState();

    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            setMovies(data.results);
            // console.log(data.results)
        });
    },[url_set])

    
    const searchMovie=(evt)=>{
        if(evt.key=="Enter")
        {
            url=base_url+"/search/movie?api_key=b02a6a803e1ffd4b310ba6dbcadf3c53&query="+search;
            setUrl(url);
            setSearch(" ");
        }
    }

    return (
        <div className="header">
        <form>
            <div className="search-btn">
                <input type="text" placeholder="Enter Movie Name" 
                className="inputText" onChange={(e)=>{setSearch(e.target.value)}} 
                value={search} onKeyPress={searchMovie}/>
            </div>
        </form>
    </div>
    )
}

export default Navbar;
