import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchRecomandMovie = ({ id }) => {
    return api.get(`/movie/${id}/recommendations`);
};

export const useRecomandMovie = ({ id }) => {
    return useQuery({
        queryKey: ['movie-recomand', { id }],
        queryFn: () => fetchRecomandMovie({ id }), // 함수로 변경
        select: (result) => result.data,
    });
};
