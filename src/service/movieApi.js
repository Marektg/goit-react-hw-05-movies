import axios from 'axios';
const API_KEY = "6fabefdb44ed110e1291f5d3ba9d7ac8";
const BASE_URL = 'https://api.themoviedb.org/3/';

const fetchTrendyMovies = async (pageNumber = 1, period = 'day') => {
    const endPoints = {
        media_type: 'movie',
        time_window: period,
    };

    const params = new URLSearchParams({
        api_key: API_KEY,
        page: pageNumber,
    });

    try {
        const { media_type, time_window } = endPoints;
        const response = await axios.get(`
    ${BASE_URL}trending/${media_type}/${time_window}?${params}`);
        return response.data;
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
    }
};
const fetchMovieById = async movieId => {
    try {
        const response = await axios.get(
            `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
const fetchMovieCast = async movieId => {
    try {
        const response = await axios.get(
            `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
const fetchMovieReviews = async movieId => {
    try {
        const response = await axios.get(
            `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
const fetchMovieByQuery = async query => {
    try {
        const response = await axios.get(
            `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&page=1&include_adult=false`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export {
    fetchMovieById,
    fetchTrendyMovies,
    fetchMovieCast,
    fetchMovieReviews,
    fetchMovieByQuery,
};