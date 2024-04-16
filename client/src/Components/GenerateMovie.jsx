import React, { useState } from 'react';

export default function DisplayMovies({ id, title, watched, remove }) {
    const [watch, setWatch] = useState(watched)

    const handleClickWatched = (id) => {
        fetch(`http://localhost:8080/movies/${id}`,
            {
                method: 'PATCH',
                body: JSON.stringify({ watched: !watch }),
                headers: {
                    "Content-Type": "application/json",
                }

            })
            .then(res => {
                if (res.ok) {
                    setWatch(!watch);
                }
            })
            .catch(err => { console.error('Error:', err) })
    }


    return (
        <div id={id} >
            <h4 key={id} id={id}>{title}</h4>
            <button id={id} type="button" onClick={() => remove(id)}>Remove</button>
            <button id={id} type="button" onClick={() => handleClickWatched(id)}>{watch ? "Watched" : "Need to Watch"}</button>
        </div >
    )
}