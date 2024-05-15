import React, { useState, useEffect } from 'react';
import '../css/Reservation.css';
import { useLocation } from 'react-router-dom';

const Reservation = () => {
  const location = useLocation();
  const { movieNm } = location.state || {};

  const [remainingTickets, setRemainingTickets] = useState(100);
  const [selectedCount, setSelectedCount] = useState(1);

  useEffect(() => {
    setRemainingTickets(100);
  }, []);

  const handleIncrement = () => {
    setSelectedCount(prevCount => Math.min(prevCount + 1, 3));
  };

  const handleDecrement = () => {
    setSelectedCount(prevCount => Math.max(prevCount - 1, 1));
  };

  const handlePurchase = () => {
    if (selectedCount <= remainingTickets) {
      setRemainingTickets(prevCount => prevCount - selectedCount);
      console.log(`예매가 완료되었습니다. 선택한 티켓 수량: ${selectedCount}`);
    } else {
      console.log('예매할 수 있는 티켓 수량이 부족합니다.');
    }
  };

  const handleCancel = () => {
    if (selectedCount > 0) {
      setRemainingTickets(prevCount => prevCount + selectedCount);
      setSelectedCount(0);
      console.log(`예매가 취소되었습니다. 취소한 티켓 수량: ${selectedCount}`);
    } else {
      console.log('취소할 예매가 없습니다.');
    }
  };

  return (
    <div className="reservation-container">
      <h1>{movieNm} 티켓 예매 페이지</h1>
      <p className="remaining-tickets">남은 티켓 수: {remainingTickets}</p>
      <div className="ticket-buttons">
        <button onClick={handleDecrement}>-</button>
        <span className="selected-count">{selectedCount}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <div className="action-buttons">
        <button onClick={handlePurchase}>예매하기</button>
        <button onClick={handleCancel}>예매 취소하기</button>
      </div>
    </div>
  );
};

export default Reservation;
