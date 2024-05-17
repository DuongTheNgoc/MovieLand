import React, { useState, useEffect } from "react";
import { FaSearch  } from 'react-icons/fa';
import {Typed} from 'react-typed';
import MovieCard from "./MovieCard";
import './App.css';
const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect (() => {
        const typed = new Typed(".multiple-text", {
          strings: ["Movies Land"],
          typeSpeed: 40,
          backSpeed: 40,
          backDelay: 300,
          loop: true
        });
        return () => {
            typed.destroy();
        };}, []);

    useEffect(() => {
        searchMovies('all');
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    const handleSearch = () => {
        searchMovies(searchTerm);
    }

    return(
        <div className="app">
            <h1 className="multiple-text">Online Movies</h1>

            <div className="search">
                <input 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search for movies"
                />
                <FaSearch  
                    className="search-icon"
                    onClick={handleSearch}
                />
             </div>
                {movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    );
}

export default App;