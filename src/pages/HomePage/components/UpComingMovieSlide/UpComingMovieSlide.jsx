import React from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { useUpComingMoviesQuery } from '../../../../hooks/useUpcomingMovie';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/resposive';

const UpComingMovieSlide = () => {
    const { data, isLoading, isError, error } = useUpComingMoviesQuery();
    console.log('data3', data);
    if (isLoading) {
        return <Spinner animation="grow" variant="danger" />;
    }
    if (isError) {
        return <Alert variant="danger">{error?.message}</Alert>;
    }
    return (
        <div>
            <MovieSlider title="Upcoming Movie" movies={data.results} responsive={responsive} />
        </div>
    );
};

export default UpComingMovieSlide;
