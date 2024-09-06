import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useRecomandMovie } from '../../../hooks/useRecomandMovie';
import MovieSlider from '../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../constants/resposive';

const RecomandMovie = ({ recomand }) => {
    const { data, isLoading, isError, error } = useRecomandMovie({ id: recomand });

    if (isLoading) {
        return <Spinner animation="grow" variant="danger" />;
    }

    if (isError) {
        return <Alert variant="danger">{error?.message || '영화를 불러오는 데 실패했습니다.'}</Alert>;
    }

    console.log('Fetched data:', data); // 확인용

    return (
        <div>
            <MovieSlider title="Recomand Movie" movies={data?.results} responsive={responsive} />
        </div>
    );
};

export default RecomandMovie;
