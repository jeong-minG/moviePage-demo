import React from 'react';
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';
import RatedMovieSlide from './components/RatedMovieSlide/RatedMovieSlide';
import UpComingMovieSlide from './components/UpComingMovieSlide/UpComingMovieSlide';

// 1. banner(popular movie 가져와서 첫번째 아이템)
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie
const HomePage = () => {
    return (
        <div>
            <Banner />
            <PopularMovieSlide />
            <RatedMovieSlide />
            <UpComingMovieSlide />
        </div>
    );
};

export default HomePage;
