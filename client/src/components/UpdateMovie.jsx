//This file edits the movie information that is already in the database.

import React , {useState,useContext, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {MoviesContext} from "../context/MoviesContext";
import MovieFinder from "../apis/MovieFinder";



const UpdateMovie = (props) =>{

    const {id} = useParams();
    let history= useHistory();
    const {movies} = useContext(MoviesContext)
    const [title,setTitle]= useState("");
    const [releaseDate,setReleaseDate]= useState("");
    const [genre,setGenre]= useState("");
    const [plot,setPlot]= useState("");



    useEffect(() =>{

        const fetchData = async() =>{
            const response = await MovieFinder.get(`/${id}`);
            setTitle(response.data.data.movie.title)
            setReleaseDate(response.data.data.movie.release_date)
            setGenre(response.data.data.movie.genre)
            setPlot(response.data.data.movie.plot)

        };
        fetchData();
    },[]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const updatedMovie = await MovieFinder.put(`/${id}`,{
            title,
            release_date :releaseDate,
            genre,plot
        })
        history.push("/home")
    }


    return(
        <div className="px-5 py-3 card text-white bg-secondary mb-3">

            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Movie Title</label>
                    <input value={title} onChange = {e=> setTitle(e.target.value)} id="title" className="form-control" placeholder="name of the movie" type="text" />
                </div>

                <div className="form-group">
                    <label htmlFor="release_date">Release Date</label>
                    <input value={releaseDate} onChange = {e=> setReleaseDate(e.target.value)} id="location" className="form-control" placeholder="YYYY/MM/DD" type="date" />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <input value={genre} onChange = {e=> setGenre(e.target.value)} id="genre" className="form-control" placeholder="genre" type="text" />
                </div>

                <div className="form-group">
                    <label htmFor="plot">Plot</label>
                    <textarea value={plot} onChange={e=>setPlot(e.target.value)}  id="plot" className="form-control" placeholder="plot"></textarea>
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>


            </form>

        </div>
    )
}

export default UpdateMovie;