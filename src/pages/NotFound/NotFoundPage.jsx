import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: '1em',
                marginTop: '5em',
            }}
        >
            <h1 className="text-white">404 ERROR</h1>
            <Link to="/">
                <Button variant="outline-danger">RETURN TO HOMEPAGE</Button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
