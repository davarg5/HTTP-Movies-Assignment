import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";

const initialValues = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateForm = props => {  
    const { push } = useHistory();
    const { id } = useParams();


    const [movie, setMovie] = useState(initialValues);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then( res => {
                setMovie(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleChanges = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const updateMovie = e => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                props.setMovieList(props.movieList.map(mov => {
                    if(mov.id === res.data.id) {
                        return res.data;
                    }
                    return mov
                }))
                push(`/movies/${id}`)
            })
            .catch( err => {
                console.log(err);
            })
    }

    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={updateMovie}>
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
                <button>Update!</button>
            </form>
        </div>
    )

}

export default UpdateForm;