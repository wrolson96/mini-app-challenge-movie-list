import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GenerateMovie from "./GenerateMovie"

export default function DisplayMovies() {
    const [searchedMovieList, setSearchedMovieList] = useState([])
    const { query } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8080/search/${query}`)
            .then(res => res.json())
            .then(data => setSearchedMovieList(data))
    }, [query])

    const handleClickRemove = (id) => {
        fetch(`http://localhost:8080/delete/${id}`,
            { method: 'DELETE' }
        )
            .then(res => { console.log(res.ok) })
            .catch(err => { console.error('Error:', err) })
    }

    return (
        <>
            <h1>Search Results</h1>
            {searchedMovieList.map(movie => {
                return (
                    <div key={movie.id}>
                        <GenerateMovie remove={handleClickRemove} id={movie.id} title={movie.title} watched={movie.watched} />
                    </div>
                )
            })}
        </>
    )
}