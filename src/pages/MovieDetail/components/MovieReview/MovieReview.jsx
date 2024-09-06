import React from 'react';
import { useMovieReviewQuery } from '../../../../hooks/useMovieReview';
import ReviewBox from './ReviewBox';

const MovieReview = ({ reviewId }) => {
    const { data, isLoading, isError } = useMovieReviewQuery({ id: reviewId });

    if (isLoading) {
        return <div>Loading...</div>; // 로딩 중 메시지
    }

    if (isError) {
        return <div>Error loading video</div>; // 에러 처리
    }
    console.log('rere', data);
    return (
        <div>
            <ReviewBox reviews={data.results} />
        </div>
    );
};

export default MovieReview;
