import React from 'react';
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';

const MovieCard = ({ movie }) => {
    return (
        <div
            style={{
                backgroundImage:
                    'url(' + `https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}` + ')',
            }}
            className="movie-card"
        >
            <div className="overlay p-3">
                <h1>{movie?.title}</h1>
                <div>
                    {movie?.genre_ids.map((id) => (
                        <Badge className="me-1" bg="danger">
                            {id}
                        </Badge>
                    ))}
                </div>
                <div className="card-sub-txt">
                    <div>{movie?.vote_average}</div>
                    <div>{movie?.popularity}</div>
                    <div>{movie?.adult ? 'over18' : 'under18'}</div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
