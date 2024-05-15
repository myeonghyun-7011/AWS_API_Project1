import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Movie from './Movie';
import MovieTheaters from './MovieTheaters';
import Join from './join';
import Reservation from './Reservation'; // Reservation 컴포넌트를 import합니다.

const Router = () => {
    return (
        <Routes>
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/Movie" element={<Movie />} />
            <Route path="/MovieTheaters" element={<MovieTheaters />} />
            <Route path="/join" element={<Join />} />
            <Route path="/Reservation" element={<Reservation />} /> {/* Reservation 페이지에 대한 라우트 추가 */}
        </Routes>
    );
}

export default Router;
