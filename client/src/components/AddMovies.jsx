//This file adds a movie and its details to the database and UI on user prompt.

import React, {useState,useEffect, useContext} from 'react';
import MovieFinder from "../apis/MovieFinder";
import {MoviesContext} from "../context/MoviesContext";
import {useParams, useLocation, useHistory} from "react-router-dom";


const AddMovies =() =>{

    const {addMovies}= useContext(MoviesContext)
    const [title,setTitle]= useState("");
    const [releaseDate,setReleaseDate]= useState("");
    const [genre,setGenre]= useState("");
    const [plot,setPlot]= useState("");
    const location = useLocation();
    const history= useHistory();



    //HandleSubmit function triggers on hitting submit button
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const response= await MovieFinder.post('/',{
                title:title,
                release_date:releaseDate,
                genre,plot
            })

            addMovies(response.data.data.movie)

            history.push("/movies")
            history.push(location.pathname);


        }
        catch (e) {
            console.log("error",e)
        }
    }

    return(
        <div className = "my-5">
            <div className="border border-warning px-5 py-3 bg-light">
            <h3 className="text-center">
                <small className="text-muted" >Add a movie of your choice!</small>
            </h3>
            <form action="">
                <div className="form-row">
                    <div className ="form-group col-8">
                        <label htmlFor="title">Movie Title</label>
                        <input value={title} onChange={e=>setTitle(e.target.value)} type="text" id="title" placeholder="name of the movie" className="form-control"/>
                    </div>
                    <div className ="form-group col-4">
                        <label htmlFor="release_date">Release Date</label>
                        <input value={releaseDate} onChange={e=>setReleaseDate(e.target.value)} type="date" id="release_date" placeholder="YYYY-MM-DD" className="form-control"/>
                    </div>



                </div>
                <div className="form-group">
                    <label htmFor="genre">Genre</label>
                    <input value={genre} onChange={e=>setGenre(e.target.value)} type="text" id="genre" placeholder="genre of the movie" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmFor="plot">Plot</label>
                    <textarea value={plot} onChange={e=>setPlot(e.target.value)}  id="plot" className="form-control" placeholder="plot"></textarea>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
            </form>
            </div>
        </div>
    )





}

export default AddMovies;