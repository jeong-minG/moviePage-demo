import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ReviewCard = ({ author, content }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // 리뷰가 세 줄 이상인지 확인하는 함수
    const isLongContent = (text) => {
        const lines = text.split('\n');
        return lines.length > 3; // 세 줄 이상인지 확인
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div style={styles.card}>
            <h3 style={styles.author}>{author}</h3>
            <p style={styles.content}>
                {isExpanded || !isLongContent(content) ? content : `${content.split('\n').slice(0, 3).join('\n')}...`}
            </p>
            {isLongContent(content) && (
                <button onClick={toggleExpand} style={styles.toggleButton}>
                    {isExpanded ? '접기' : '더 보기'}
                </button>
            )}
        </div>
    );
};

// 스타일 객체
const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px 0',
    },
    author: {
        margin: '0 0 5px 0',
        fontSize: '1.2em',
        fontWeight: 'bold',
    },
    content: {
        margin: '0',
        fontSize: '1em',
    },
    toggleButton: {
        marginTop: '10px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
};

// PropTypes를 사용하여 props의 타입을 검증
ReviewCard.propTypes = {
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default ReviewCard;
