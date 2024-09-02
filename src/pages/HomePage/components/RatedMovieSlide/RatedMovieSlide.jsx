import React from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { useRatedMoviesQuery } from '../../../../hooks/useRatedMovie';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/resposive';

const RatedMovieSlide = () => {
    const { data, isLoading, isError, error } = useRatedMoviesQuery();
    if (isLoading) {
        return <Spinner animation="grow" variant="danger" />;
    }
    if (isError) {
        return <Alert variant="danger">{error?.message}</Alert>;
    }
    return (
        <div>
            <MovieSlider title="Top Rated Movie" movies={data.results} responsive={responsive} />
        </div>
    );
};

export default RatedMovieSlide;
