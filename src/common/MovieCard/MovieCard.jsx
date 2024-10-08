import React from 'react';
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';
import { useNavigate } from 'react-router-dom';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRankingStar, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie }) => {
    const { data: genreData } = useMovieGenreQuery();
    const navigate = useNavigate();
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
            onClick={() => navigate(`/movies/${movie.id}`)}
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
                    <div>
                        <FontAwesomeIcon className="card-icon" icon={faRankingStar} size="sm" />
                        {movie?.vote_average?.toFixed(2)}
                    </div>
                    <div>
                        <FontAwesomeIcon className="card-icon" icon={faPeopleGroup} size="sm" />
                        {movie?.popularity?.toFixed(1)}
                    </div>
                    <div>{movie?.adult ? 'over18' : 'under18'}</div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
