import styles from './MovieList.module.scss';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieList = ({ movies }) => {
    const { movie__item, movie__list, link } = styles;
    const location = useLocation();
    console.log(location.search);
    return (
        <ul className={movie__list}>
            {movies.map(movie => (

                <li className={movie__item} key={movie.id}>
                    <Link className={link} to={`/movies/${movie.id}`} state={{ from: location }}>
                        {movie.poster_path ? (
                            <img src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={movie.title}
                            />
                        ) : (
                            // eslint-disable-next-line jsx-a11y/img-redundant-alt
                            <img src={`../../images/noImage.png`} alt={`There is no image`} />

                        )}

                        <p>{movie.title}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

MovieList.propTypes = {
    movies: PropTypes.array,
};

export default MovieList;