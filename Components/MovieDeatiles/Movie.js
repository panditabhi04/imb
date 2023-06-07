import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie=()=>{
    const [currentMovieDetail,setMovie]=useState();
    const {id}=useParams()

    useEffect(()=>{
        getData()
        window.scrollTo(0,0)
    },[])

    const getData=()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`).then(res=>res.json()).then(data=>setMovie(data))
    }

    return(
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`}/>
            </div>
            <div className="movie__detalRight">
                <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
            </div>
            <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
            <div className="movie__rating">
                {currentMovieDetail ? currentMovieDetail.vote_averge:""}<i className="fas fa-star"/>
                <span className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_data:""}</span>
            </div>
            <div className="movie__runtime">{ currentMovieDetail? currentMovieDetail.runtime + " mins" : ""}</div>
            <div className="movie__genres">
                {
                    currentMovieDetail && currentMovieDetail.genres
                    ?
                    currentMovieDetail.genres.map(genre=>(
                        <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                    ))
                    :
                    ""
                }
            </div>
            <div className="movie__heading">production compnies</div>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}
export default Movie;