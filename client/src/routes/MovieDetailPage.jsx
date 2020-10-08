//This file is for displaying all movie info after user hits on the detail button

import React , {useContext,useEffect} from 'react';
import { useParams } from "react-router-dom";
import {MoviesContext} from "../context/MoviesContext";
import MovieFinder from "../apis/MovieFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";


const MovieDetailPage = () =>{

    const {id} = useParams();
    const {selectedMovie, setSelectedMovie} = useContext(MoviesContext)

    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response = await MovieFinder.get(`/${id}`)
                console.log("response",response)
                setSelectedMovie(response.data.data);
            }
            catch(err){
                console.log(err)
            }
        };
        fetchData();
    },[]);
    return(

        <div>
            {selectedMovie &&  (
                <>
                    <div className=" card-header">
                    <h1 className="text-center display-4 ">{selectedMovie.movie && selectedMovie.movie.title}</h1>
                    <div className="text-center">
                        <StarRating rating ={selectedMovie.movie && selectedMovie.movie.average_rating} />

                        <span className="text-waring ml-1">
                            {selectedMovie.movie && selectedMovie.movie.count ? `(${selectedMovie.movie.count})`:"(0)"}

                        </span>

                    </div>

                    </div>


                    <div className="px-5 py-3">
                        <div className="card border-warning mb-3" >
                            <div className="card-header">
                                <h4 >Movie Details</h4>
                            </div>

                            <div className="card-body">

                                <div className="card-title">Title : {selectedMovie.movie && selectedMovie.movie.title}</div>

                                <div className="card-title">Release Date : {selectedMovie.movie && selectedMovie.movie.release_date}</div>

                                <div className="card-title">Genre : {selectedMovie.movie && selectedMovie.movie.genre}</div>

                                <div className="card-title">plot : {selectedMovie.movie && selectedMovie.movie.plot}</div>

                            </div>

                        </div>

                    </div>




                    <div className="mt-3">
                        <Reviews reviews={selectedMovie.reviews} />
                    </div>
                    <AddReview />
                </>
            )}

        </div>



    )

}

export default MovieDetailPage;