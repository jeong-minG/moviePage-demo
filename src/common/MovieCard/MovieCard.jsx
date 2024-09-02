import React from 'react';
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const MovieCard = ({ movie }) => {
    const { data: genreData } = useMovieGenreQuery();
    const showGenre = (genreIdList) => {
        if (!genreIdList || !genreData) return [];
        const genreNameList = genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre.id === id);
            return genreObj ? genreObj.name : 'Unknown';
        });
        return genreNameList;
    };
    return (
        <div
            style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movie?.poster_path})`,
            }}
            className="movie-card"
        >
            <div className="overlay p-3">
                <h1>{movie?.title}</h1>
                <div>
                    {showGenre(movie?.genre_ids).map((id) => (
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
