import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AppLayout = () => {
    const [keyword, setkeyword] = useState('');
    const navigate = useNavigate();

    const searchByKeyword = (event) => {
        event.preventDefault();
        // 위 url을 바꿔준다
        navigate(`/movies?q=${keyword}`);
        setkeyword('');
    };
    return (
        <div>
            <Navbar expand="lg" className="px-5 bg-black" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand className="me-4">
                        <Link to={'/'}>
                            <img src="https://i.ibb.co/vs4Ph9V/image.png" width={94} alt="logo" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Link
                                to={'/'}
                                className="text-white link-offerset-2 me-4 link-underline link-underline-opacity-0"
                            >
                                Home
                            </Link>
                            <Link
                                to={'/movies'}
                                className="text-white link-offerset-2 me-4 link-underline link-underline-opacity-0"
                            >
                                Movies
                            </Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={searchByKeyword}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2 bg-secondary"
                                aria-label="Search"
                                value={keyword}
                                onChange={(event) => setkeyword(event.target.value)}
                            />
                            <Button variant="outline-danger" type="submit">
                                Search
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
};

export default AppLayout;
