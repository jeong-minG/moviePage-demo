import React, { useState } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import './MoviePage.style.css';
import { useNavigate } from 'react-router-dom';

// 경로 2가지
// nav바에서 클릭, popular
// keyword 입력해서 온 경우, 키워드 관련
const MoviePage = () => {
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState(1);
    const handlePageClick = ({ selected }) => {
        setPage(selected + 1);
    };
    const navigate = useNavigate();
    const keyword = query.get('q');
    const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
    if (isLoading) {
        return <Spinner animation="grow" variant="danger" />;
    }
    if (isError) {
        return <Alert variant="danger">{error?.message}</Alert>;
    }

    // 검색 결과가 없을 경우 안내 메시지 및 홈 페이지로 리다이렉트
    if (data?.results.length === 0) {
        setTimeout(() => {
            navigate('/movies'); // 홈 페이지로 리다이렉트
        }, 3000); // 3초 후 리다이렉트
        return <Alert variant="warning">검색 결과가 없습니다. 3초 후 홈 페이지로 돌아갑니다.</Alert>;
    }
    return (
        <Container>
            <Row>
                <Col lg={4} xs={12}>
                    필터
                </Col>
                <Col lg={8} xs={12}>
                    <Row>
                        {data?.results.map((movie, index) => (
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
                    pageCount={data?.total_pages > 200 ? 200 : data?.total_pages} //전체페이지
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
                    renderOnZeroPageCount={null}
                    forcePage={page - 1}
                />
            </Row>
        </Container>
    );
};

export default MoviePage;
