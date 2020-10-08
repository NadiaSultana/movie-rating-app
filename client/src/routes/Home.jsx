//The homepage structure


import React from 'react';
import Header from '../components/Header';
import AddMovies from "../components/AddMovies";
import MovieList from "../components/MovieList";

const Home = () =>{
    return(
        <div>
            <Header/>

            <AddMovies/>

            <MovieList/>
        </div>

    )

}

export default Home;