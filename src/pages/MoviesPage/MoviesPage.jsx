import styles from './MoviesPage.module.scss';
import React, { useEffect, useState, useCallback } from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { fetchMovieByQuery} from '../../service/movieApi';
import MovieList from '../../components/Movies/MoviesList';
import SearchBar from '../../components/Movies/SearchBar';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
// import PropTypes from 'prop-types';

const MoviesPage = () => {
    const params = useParams();
    const [query, setQuery] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [moviesByQuery, setMoviesByQuery] = useState([]);
  

    const queryChangeHandler = (e) => {
        setQuery(e.target.value);
    };

    const querySubmitHandler = (e) => {
        e.preventDefault();

        if (!query) {
            Notiflix.Notify.failure("Enter the search value!");
        }

        query ? setSearchParams({ query: query }) : setSearchParams('');

        setQuery('');
    };

    const getWantedMovies =  useCallback(async () => {
        try {
            const query = searchParams.get('query');
            if (query) {
                const moviesList = await fetchMovieByQuery(query);
                setMoviesByQuery(moviesList.results);
          
            }
        } catch (error) {
            console.log(error);
        }
   
    }, [searchParams]);
    

    

    useEffect(() => {
        getWantedMovies();
    }, [getWantedMovies]);

    const {  container } = styles;
    return (
        <>
          
            {!params.movieId && (
                <>
               
                    <SearchBar
                        value={query}
                        submitHandler={querySubmitHandler}
                        changeHandler={queryChangeHandler}
                        />
                  
                    <div className={container}>
                        <MovieList movies={moviesByQuery} />
                    </div>
                </>
            )}
            {params.movieId && (
                <>
                    <Outlet />
                </>
            )}
        </>
    );
};

export default MoviesPage;


// const MoviesPage = () => {
//     const { container } = styles;
//     const [query, setQuery] = useState('');
//     const [movies, setMovies] = useState([]);
//     const [errorMessage, setErrorMessage] = useState();

//     const setInitialParams = (query) => {
//         if (query === "") {
//             Notiflix.Notify.failure("Enter the search value!");
//             return;
//         }

//         if (query === query) {
//             return;
//         }

//         setQuery(query);
//     }

//     const addMovies = useCallback(async () => {
//         try {
//             if (!query) {
//                 return;
//             }

//             const movies = await fetchMovieByQuery(query);
//             const { resoult: newResoult } = movies;
//             setMovies(oldMovies => newResoult)
//             console.log(movies);
//             return movies
           
           
//         } catch (err) {
//             setErrorMessage(err);
//         }
//     }, [query]
//     );
//     useEffect(() => {
//         addMovies();
//         console.log(movies);
//     }, [addMovies]);
//     return (
//         <main className={container}>
//             <SearchBar onSubmit={setInitialParams} />
//             {errorMessage && <div>{errorMessage}</div>}
//             <MovieList movies={movies} />
//             <Outlet />
//         </main>
//     );
// };

// // MoviesPage.propTypes = {

// // };

// export default MoviesPage;