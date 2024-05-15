// Movie.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Movie.css';

const Movie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const formattedDate = formatDate(yesterday);
      const baseUrl = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
      const myKey = 'd0c0ebcd8606c274ad0c8fc093094bc7';
      const url = `${baseUrl}key=${myKey}&targetDt=${formattedDate}`;

      const response = await axios.get(url);
      const movieList = response.data.boxOfficeResult.dailyBoxOfficeList;
      setMovies(movieList);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  };

  return (
    <div className="container">
      <h1 className="title">현재 상영 중인 영화 목록</h1>
      <div className="movie-container">
        {movies.map((movie, index) => (
          <div key={index} className="movie-item">
            <p>{movie.rank}위 {movie.movieNm}</p>
            <a href={`https://search.naver.com/search.naver?query=${encodeURIComponent(movie.movieNm)} 영화`} target="_blank" rel="noopener noreferrer">
              영화 정보 보기
            </a>
            &nbsp;
            <Link
              to={{
                pathname: `/Reservation`,
                state: { movieNm: movie.movieNm, ticketCount: 100 } // Pass movie name and initial ticket count as state
              }}
            >
              예매 하러가기
            </Link>
            <p>티켓 개수: {movie.reserved_tickets}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
