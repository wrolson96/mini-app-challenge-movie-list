import React from 'react';
import { useEffect, useState } from "react";
import GenerateMovie from "./GenerateMovie"
import AddMovie from "./AddMovie";

export default function DisplayMovies() {
    const [movieList, setMovieList] = useState([])
    const [update, setUpdate] = useState(false)
    const [watch, setWatch] = useState(true)
    const [watchMovieList, setWatchMovieList] = useState()

    useEffect(() => {
        fetch('http://localhost:8080/movies')
            .then(res => res.json())
            .then(data => setMovieList(data))
    }, [update])

    useEffect(() => {
        fetch(`http://localhost:8080/movies/watched/${watch}`)
            .then(res => res.json())
            .then(data => setWatchMovieList(data))

    }, [watch])

    const handleClickRemove = (id) => {
        fetch(`http://localhost:8080/delete/${id}`,
            { method: 'DELETE' }
        )
            .then(res => {
                setUpdate(!update)
            })
            .catch(err => { console.error('Error:', err) })
    }

    const handleSubmit = () => {
        const newMovie = {
            title: document.getElementById('add-box').value
        }
        fetch(`http://localhost:8080/movies`, {
            method: "POST",
            body: JSON.stringify(newMovie),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                console.log("posted")
                setUpdate(!update)
            })
    }

    const handleWatch = () => {
        setWatch(!watch)
    }

    return (
        <div className="container">
            <div className="movie-list">
                <h1>Movie List</h1>
                <AddMovie submit={handleSubmit} />
                {movieList.map((movie) => {
                    return (
                        <div key={movie.id}>
                            <GenerateMovie remove={handleClickRemove} id={movie.id} title={movie.title} watched={movie.watched} />
                        </div>
                    )

                })}
            </div>
            <div className="watched-list">
                <button type="button" value="Watch" onClick={() => handleWatch()}>{watch ? "Watched Movies" : "Need to Watch"}</button>
                {watchMovieList.map((movie) => <h4>{movie.title}</h4>)}

            </div>
        </div>
    )
}

