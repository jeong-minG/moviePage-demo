import React from 'react';
import { useMovieVideosQuery } from '../../../../hooks/useMovieVideos';
import YouTube from 'react-youtube';

const YutubeVideos = ({ movieId }) => {
    const { data, isLoading, isError } = useMovieVideosQuery({ id: movieId });

    if (isLoading) {
        return <div>Loading...</div>; // 로딩 중 메시지
    }

    if (isError) {
        return <div>Error loading video</div>; // 에러 처리
    }

    console.log('datadata', data);

    // 비디오 키가 있는지 확인
    const videoKey = data?.results?.[0]?.key;

    const opts = {
        height: '500px',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    return <div>{videoKey ? <YouTube videoId={videoKey} opts={opts} /> : <div>No video available</div>}</div>;
};

export default YutubeVideos;
