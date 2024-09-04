import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieDetails = () => {
    return api.get(`/movie/${id}`);
};
export const useMovieDetails = () => {
    return useQuery({ queryKey: ['movie-details'], queryFn: fetchMovieDetails });
};
