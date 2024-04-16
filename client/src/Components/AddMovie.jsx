import React from 'react';

export default function DisplayMovies({ submit }) {
    return (
        <form>
            <label>
                Add A Movie:
                <input type="text" id='add-box' name="movie_search" />
                <input type="button" value="submit" onClick={() => submit()} />
            </label>

        </form>
    )
}