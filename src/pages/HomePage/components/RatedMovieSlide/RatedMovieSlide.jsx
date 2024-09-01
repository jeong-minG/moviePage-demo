import React from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useRatedMoviesQuery } from '../../../../hooks/useRatedMovie';
import MovieCard from '../MovieCard/MovieCard';
import './RatedMovieSlide.style.css';

const RatedMovieSlide = () => {
    const { data, isLoading, isError, error } = useRatedMoviesQuery();
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };
    console.log('data2:', data);
    if (isLoading) {
        <Spinner animation="grow" variant="danger" />;
    }
    if (isError) {
        <Alert variant="danger">{error.message}</Alert>;
    }
    return (
        <div>
            <h3 className="carousel-title">Top Rated Movie</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                itemClass="movie-slider p-1"
                containerClass="carousel-container"
                responsive={responsive}
            >
                {data?.results.map((movie, index) => (
                    <MovieCard movie={movie} key={index} />
                ))}
            </Carousel>
        </div>
    );
};

export default RatedMovieSlide;
