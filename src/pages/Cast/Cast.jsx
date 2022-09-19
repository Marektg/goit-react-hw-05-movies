import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../service/movieApi';
import { nanoid } from 'nanoid';
import noImage from '../../images/noImage.png';
import styles from './Cast.module.scss';
// import PropTypes from 'prop-types';

const Cast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    // console.log(location);
    useEffect(() => {
        const getMovieCast = () => {
            return fetchMovieCast(movieId)
                .then(response => {
                    // console.log(response);
                    return setCast(response.cast);
                })
                .catch(error => {
                    console.error(error);
                });
        };
        getMovieCast();
    }, [movieId]);
    const { castSection, actorCard } = styles
    return (
        <div>
            <section className={castSection}>
                {cast.length < 1 ? (
                    <p>Sorry, the cast is not available!</p>
                ) : (
                    <ul>
                        {cast.map(({ character, name, profile_path }) => {
                            return (
                                <li className={actorCard} key={nanoid()}>
                                    {profile_path === null ? (
                                        <img
                                            src={noImage}
                                            alt={`just placeholder`}
                                        />
                                    ) : (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                                            alt={`${name}`}
                                        />

                                    )}
                                    <h4>Name: {name}</h4>
                                    <p>Character: {character}</p>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </div>
    );
};

// Cast.propTypes = {

// };

export default Cast;