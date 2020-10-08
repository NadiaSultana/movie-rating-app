//This file is for loading all movies and information of the movie in the homepage and also for deleting or updating or navigating to the detail page

import React, {useEffect, useContext} from 'react';
import MovieFinder from "../apis/MovieFinder";
import {MoviesContext} from "../context/MoviesContext";
import {useParams, useLocation, useHistory} from "react-router-dom";
import StarRating from "./StarRating";


const MovieList =(props) =>{
    const {movies, setMovies}= useContext(MoviesContext);
    const location = useLocation();
    const history= useHistory();

    useEffect(() =>{

        const fetchData = async () =>{
            try{
                const response = await MovieFinder.get("/")
                console.log("latest response", response.data.data)
                setMovies(response.data.data.movies)
            }
            catch (e) {

            }
        };
        fetchData();
    }, [])

    const handleDelete = async(e,id) =>{
        e.stopPropagation();
        try{
            const response= await MovieFinder.delete(`/${id}`)
            console.log("latest response for delete", response)
            setMovies(movies.filter((movie)=>{
                return movie.id!==id;
            }))

        }
        catch(e){
            console.log('Delete error',e)
        }
    }

    const handleUpdate = (e,id) =>{
        e.stopPropagation();
        history.push(`/movies/${id}/update`)

    }

    const handleMovieSelect =(id) =>{
        history.push(`/movies/${id}`)
    }


    const renderRating = (movie) => {
        if(!movie.count){
            return <span className="text-warning">0 reviews</span>
        }

        return(
            <>
                <StarRating rating = {movie.average_rating} />
                <span className="text-warning ml-1">({movie.count})</span>

            </>

        )


    }

    return(

        <div className = "my-5">
        <div className= "list-group">
            <table className ="table table-hover table-dark " >

                <thead>
                <tr className="bg-primary">
                    <th scope="col">Movie Title</th>
                    <th scope="col">Release Date</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>

                </tr>
                </thead>

                <tbody >


                { movies.map((movie)=>{
                    return(

                        <tr >
                            <td>{movie.title}
                            <div className="px-2">
                            <button className="btn btn-outline-primary" onClick ={()=>handleMovieSelect(movie.id)} key={movie.id} style={{cursor: 'pointer'}} >Details</button>
                            </div>
                            </td>
                            <td>{movie.release_date}</td>
                            <td>{renderRating(movie)}</td>
                            <td><button onClick={(e)=>handleUpdate(e,movie.id)} className="btn btn-warning">Update</button></td>
                            <td><button  onClick ={(e) =>handleDelete(e,movie.id)}
                                            className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })}

                </tbody>

            </table>

        </div>
        </div>

    )
}

export default MovieList;