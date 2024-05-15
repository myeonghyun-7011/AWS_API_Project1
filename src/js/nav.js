import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Nav.css';

const Nav = () => {
    const isLoggedIn = sessionStorage.getItem('userId');
    return (
        <nav>
            <Link to="/">HOME</Link>
            <Link to="/Movie">MOVIE</Link>
            <Link to="/MovieTheaters">MAP</Link>
            <Link to="/Reservation">RESERVATION</Link> {/* Reservation 페이지로 이동하는 링크 추가 */}
            {isLoggedIn ? (
                <>
                    <Link to="/mypage">MY PAGE</Link>
                    <Link to="/logout">LOGOUT</Link>
                </>
            ) : (
                <>
                    <Link to="/LoginForm">LOGIN</Link>
                    <Link to="/join">JOIN</Link>
                </>
            )}
        </nav>
    );
}

export default Nav;
