import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieById } from '../../service/movieApi';
import styles from './MovieDetailsPage.module.scss';
// import PropTypes from 'prop-types';

const MovieDetailsPage = () => {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const location = useLocation();
    const { title, overview, vote_average, genres, poster_path } =
        movie;
    console.log(location);
    useEffect(() => {
        const getMovieById = () => {
            return fetchMovieById(movieId)
                .then(response => {

                    const choosenMovie = response;

                    return setMovie(choosenMovie);
                })

                .catch(error => {
                    console.error(error);
                });
        };
        getMovieById();
    }, [movieId]);
    // console.log(location.state?.from?.search);

    const backLink =
        `${location.state?.from?.pathname}${location.state?.from?.search}` ??
        '/movies';



    const goBackHandler = e => {
        if (location.pathname.includes('cast') || location.pathname.includes('reviews')) {
            const searchVal = `${location.state.from.state.from.search}`;
            console.log(searchVal);
            if (searchVal === "") {
                const mainLink = `/`;
                navigate(mainLink, { replace: true });
            } else {
                const additionalInfoBackLink = `/movies/${searchVal}` ?? '/movies';
                console.log("działa");
                navigate(additionalInfoBackLink, { replace: true });
            }
        } else {
            navigate(backLink, { replace: true });
        }
    };
    const { mainContainer, item1, information, extraInfo, link } = styles;
    return (
        <main className={mainContainer}>
            <div className={item1}>
                <button type="button" onClick={goBackHandler}>
                    Go back
                </button>
                <img
                    src={`https://image.tmdb.org/t/p/w400${poster_path}`}
                    alt={`Poster of ${title}`}
                />
            </div>
            <div className={information}>
                <h1>{title}</h1>
                <p>User Score: {(vote_average * 10).toFixed(0)}%</p>
                <h2>Overwiew</h2>
                <p>{overview}</p>
                <h2>Genres</h2>
                <p>{genres?.map(({ name }) => name + ', ')}</p>
            </div>
            <div className={extraInfo}>
                <h3>Additional information</h3>
                <ul>
                    <li>
                        <Link className={link} to={`cast`} state={{ from: location }}>Cast</Link>
                    </li>
                    <li>
                        <Link className={link} to={`reviews`} state={{ from: location }}>Reviews</Link>
                    </li>
                </ul>
            </div>
            <Outlet />

        </main>
    );
};



export default MovieDetailsPage;