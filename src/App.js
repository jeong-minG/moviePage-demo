import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

// 홈페이지
// 영화 전체 보여주는 페이지 (서치) /movies
// 영화 디테일 페이지 /movies/:id
function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="movies">
                    <Route index element={<MoviePage />} />
                    <Route path=":id" element={<MovieDetailPage />} />
                </Route>
                {/* <Route path="/movies" element={<MoviePage />} />
                <Route path="/movies/:id" element={<MovieDetailPage />} /> */}
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
