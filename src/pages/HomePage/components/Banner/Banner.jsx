import React from 'react';
import { usePoplarMoviesQuery } from '../../../../hooks/usePopularMovies';
import { Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css';

const Banner = () => {
    const { data, isLoading, isError, error } = usePoplarMoviesQuery();
    console.log('data:', data);
    if (isLoading) {
        <Spinner animation="grow" variant="danger" />;
    }
    if (isError) {
        <Alert variant="danger">{error.message}</Alert>;
    }
    return (
        <div
            style={{
                backgroundImage:
                    'url(' +
                    `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.results[0].backdrop_path}` +
                    ')',
            }}
            className="banner"
        >
            <div className="text-white banner-text-area">
                <h1>{data?.results[0].title}</h1>
                <p>{data?.results[0].overview}</p>
            </div>
        </div>
    );
};

export default Banner;
