import styles from './SharedLayout.module.scss';
import styled from 'styled-components';
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const StyledLink = styled(NavLink)`
background: linear-gradient(to left, #485563, #29323c);
  border: solid 1px black;
  border-radius: 0.8em;
  font-size: 1.2em;
  padding: 15px;
  margin-top: 6px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
   &.active {
    color: #09ff00;
  }
`;
const SharedLayout = () => {
    const { header, nav } = styles;
    return (
        <div>
            <header className={header}>
                <nav className={nav}>
                    <StyledLink to="/">
                        Home
                    </StyledLink>
                    <StyledLink to="/movies">
                        Movies
                    </StyledLink>
                </nav>
            </header>
            <Outlet />
        </div>
    );
};

export default SharedLayout;