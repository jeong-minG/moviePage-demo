import React, { useState } from 'react';
import ReviewCard from './ReviewCard';

const ReviewBox = ({ reviews }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReviews = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            {reviews.slice(0, isExpanded ? reviews.length : 1).map(({ author, content }, index) => (
                <ReviewCard key={index} author={author} content={content} />
            ))}
            <button onClick={toggleReviews} style={styles.button}>
                {isExpanded ? '접기' : '더 보기'}
            </button>
        </div>
    );
};

// 스타일 객체
const styles = {
    button: {
        marginTop: '10px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
};

export default ReviewBox;
