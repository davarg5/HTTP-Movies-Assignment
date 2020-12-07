import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialValues = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}

const AddForm = props => {
    const { push } = useHistory()

    const [movie, setMovie] = useState(initialValues);

    const handleChanges = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const addMovie = e => {
        e.preventDefault();
        const newMovie = {
            ...movie,
            stars: movie.stars.split(', ')
        }
        console.log(newMovie);
        axios.post(`http://localhost:5000/api/movies`, newMovie)
        .then( res => {
            props.setMovieList(res.data);
            push('/');
        })
        .catch( err => {
            console.log(err);
        })
    }

    return(
        <div>
            <h2>Add Movie</h2>
            <form onSubmit={addMovie}>
                Title
                <input
                name='title'
                type='text'
                value={movie.title}
                onChange={handleChanges}
                />
                Director
                <input
                name='director'
                type='text'
                value={movie.director}
                onChange={handleChanges}
                />
                Metascore
                <input
                name='metascore'
                type='text'
                value={movie.metascore}
                onChange={handleChanges}
                />
                Stars(separate by commas)
                <input
                name='stars'
                type='text'
                value={movie.stars}
                onChange={handleChanges}
                />

                <button>Add!</button>
            </form>


        </div>
    )

}

export default AddForm;

