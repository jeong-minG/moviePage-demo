import React, { useState } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Spinner, Alert, Container, Row, Col, Button } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './MoviePage.style.css';
import { useNavigate } from 'react-router-dom';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const MoviePage = () => {
    const [query] = useSearchParams();
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedGenres, setSelectedGenres] = useState([]);

    const navigate = useNavigate();
    const keyword = query.get('q');
    const { data: genreData } = useMovieGenreQuery();
    const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });

    const handlePageClick = ({ selected }) => {
        setPage(selected + 1);
    };

    const toggleGenre = (genreId) => {
        setSelectedGenres((prev) =>
            prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
        );
    };

    const resetGenres = () => {
        setSelectedGenres([]);
    };

    const filterMoviesByGenre = (movies) => {
        if (selectedGenres.length === 0) return movies;
        return movies.filter((movie) => movie.genre_ids.some((id) => selectedGenres.includes(id)));
    };

    if (isLoading) return <Spinner animation="grow" variant="danger" />;
    if (isError) return <Alert variant="danger">{error?.message}</Alert>;

    if (data?.results.length === 0) {
        setTimeout(() => navigate('/'), 3000);
        return <Alert variant="warning">검색 결과가 없습니다. 3초 후 홈 페이지로 돌아갑니다.</Alert>;
    }

    const sortedMovies = [...filterMoviesByGenre(data.results)].sort((a, b) => {
        return sortOrder === 'desc' ? b.popularity - a.popularity : a.popularity - b.popularity;
    });

    return (
        <Container>
            <Row>
                <Col lg={4} xs={12}>
                    <div>
                        <Button
                            variant="light"
                            onClick={() => setSortOrder('all')}
                            className={`me-2 ${sortOrder === 'all' ? 'active-button' : ''}`}
                        >
                            전체
                        </Button>
                        <Button
                            variant="light"
                            onClick={() => setSortOrder('desc')}
                            className={`me-2 ${sortOrder === 'desc' ? 'active-button' : ''}`}
                        >
                            인기 높은 순
                        </Button>
                        <Button
                            variant="light"
                            onClick={() => setSortOrder('asc')}
                            className={`me-2 ${sortOrder === 'asc' ? 'active-button' : ''}`}
                        >
                            인기 낮은 순
                        </Button>
                    </div>
                    <div className="genre-button-container">
                        <h5>Genre</h5>
                        <Button variant="light" onClick={resetGenres} className="me-2">
                            ALL
                        </Button>
                        {genreData &&
                            genreData.map((genre) => (
                                <Button
                                    key={genre.id}
                                    variant={selectedGenres.includes(genre.id) ? 'primary' : 'light'}
                                    onClick={() => toggleGenre(genre.id)}
                                    className="me-2"
                                >
                                    {genre.name}
                                </Button>
                            ))}
                    </div>
                </Col>
                <Col lg={8} xs={12}>
                    <Row>
                        {sortedMovies.map((movie, index) => (
                            <Col key={index} lg={4} xs={12}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <Row>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={data?.total_pages > 200 ? 200 : data?.total_pages}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    forcePage={page - 1}
                />
            </Row>
        </Container>
    );
};

export default MoviePage;
