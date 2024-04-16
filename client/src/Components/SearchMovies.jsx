import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function DisplayMovies() {
    const [movieList, setMovieList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8080/movies')
            .then(res => res.json())
            .then(data => setMovieList(data))
    }, [])
    const handleSubmit = () => {
        let input = document.getElementById('search-box').value
        console.log(input)
        navigate(`/search/${input}`)
    }

    return (
        <form>
            <label>
                Search For A Movie:
                <input type="text" id='search-box' name="movie_search" />
                <input type="button" value="submit" onClick={handleSubmit} />
            </label>

        </form>
    )
}