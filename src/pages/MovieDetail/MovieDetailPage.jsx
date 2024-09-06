import React from 'react';
import './MovieDetailPage.style.css';
import { useParams } from 'react-router-dom';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { Spinner, Alert } from 'react-bootstrap';
import YutubeVideos from './components/YutubeVodeo/YutubeVideos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';
import MovieReview from './components/MovieReview/MovieReview';
import RecomandMovie from './components/RecomandMovie';

const MovieDetailPage = () => {
    const { id } = useParams();

    const formatRuntime = (runtime) => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}hr ${minutes}m`;
    };

    const { data, isLoading, isError, error } = useMovieDetails({ id });

    if (isLoading) {
        return <Spinner animation="grow" variant="danger" />;
    }

    if (isError) {
        return <Alert variant="danger">{error?.message || '영화 정보를 불러오는 데 실패했습니다.'}</Alert>;
    }

    const DataBudget = data?.budget ? data.budget.toLocaleString() : '예산 정보 없음';

    return (
        <div className="detail-container">
            <div
                className="detail-bk"
                style={{
                    backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.backdrop_path})`,
                }}
            >
                <div>
                    <h1>{data?.title}</h1>
                    <div>
                        {data?.release_date}ㆍ{data?.origin_country} ㆍ{formatRuntime(data?.runtime)}
                    </div>
                    {DataBudget}
                    <div>
                        {data?.genres?.map((genre, index) => (
                            <span key={genre.id}>
                                {genre.name} {index < data.genres.length - 1 && <span> / </span>}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className="detail-poster">
                    <div>
                        <img
                            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${data?.poster_path}`}
                            alt={`${data?.title} 포스터`}
                        />
                        <div className="movie_vote_average">
                            <FontAwesomeIcon className="card-icon" icon={faRankingStar} size="lg" />{' '}
                            {data?.vote_average}
                        </div>
                    </div>
                    <div className="detail-right">
                        <div className="movie-overview">{data?.overview}</div>
                        <YutubeVideos movieId={id} />
                        <MovieReview reviewId={id} />
                        <RecomandMovie recomand={id} /> {/* 수정된 부분 */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
