import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import { Spinner, Alert } from 'react-bootstrap';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/resposive';

const PopularMovieSlide = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();
    if (isLoading) {
        return <Spinner animation="grow" variant="danger" />;
    }
    if (isError) {
        return <Alert variant="danger">{error?.message}</Alert>;
    }
    return (
        <div>
            <MovieSlider title="Popular Movies" movies={data.results} responsive={responsive} />
        </div>
    );
};

export default PopularMovieSlide;
