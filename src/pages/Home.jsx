// import DefaultLayout from "../layouts/DefaultLayout";
import { useEffect, useState } from "react";




    let API_key="&api_key=b02a6a803e1ffd4b310ba6dbcadf3c53";
    let base_url="https://api.themoviedb.org/3";
    let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
    let arr=["Popular","Theatre","Kids","Drama","Comedy", "18+"];

    const Home =()=>{

        const [movies, setMovies] = useState([])
        const [url_set,setUrl]=useState(url);
        const [search,setSearch]=useState();
        
        function handleChange(e) {
            setSearch(e.currentTarget.value)

            url=base_url+"/search/movie?api_key=b02a6a803e1ffd4b310ba6dbcadf3c53&query="+search;
                    setUrl(url);
                   

        }

        function submit() {
            setMovies(
              [...movies, search]
            )
        }
        
        useEffect(()=>{
            fetch(url_set).then(res=>res.json()).then(data=>{
                setMovies(data.results);
                // console.log(data.results)
            });
        },[url_set])

        

        const getData=(movieType)=>{
            if(movieType==="Popular")
            {
                url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
            }
            if(movieType==="Theatre")
            {
                url=base_url+"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+API_key;
            }
            if(movieType==="Kids")
            {
                url=base_url+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+API_key;
            }
            if(movieType==="Drama")
            {
                url=base_url+"/discover/movie?with_genres=18&primary_release_year=2014"+API_key;
            }
            if(movieType==="Comedy")
            {
                url=base_url+"/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc"+API_key;
            }
            if(movieType==="18+")
            {
                url=base_url+"/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc"+API_key;
            }
            setUrl(url);
    
        }

    
      
//         let img_path="https://image.tmdb.org/t/p/w500";
    return(
        
           <main className="main1">
                <div className="header">

                     <nav>
                    <ul>
                        {
                            arr.map((value,pos)=>{
                                return(
                                    <li key={pos}><a href="#home"  name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }
                       
                    </ul>
                </nav>
        
            <div className="search-btn">
                <input type="text" placeholder="Enter Movie Name" 
                className="inputText" onKeyUp={handleChange} 
                 />
                 <button onClick={submit} className="btn"><i className="fas fa-search"></i></button>
            </div>
      
    </div>
                   {/* <DefaultLayout> */}
                      <div  style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                         {movies.map((item, index) => {

                return (
                    
                    <div className="movie"  key={index}>
                        <img src={item.poster_path} className="poster"/>
                            <div className="movie-details">
                                 <div className="box" key={item.id}>
                                     <h4 className="title">{item.title}</h4>
                                    <p className="rating">{item.vote_average}</p>
                            </div>
                        <div className="overview">
                        <h1>overview</h1>
                        {item.overview}
                    </div>
                </div>
            </div>
                )
            })}
                        </div>     
                    {/* </DefaultLayout> */}
           </main>
    );
}
export default Home;
