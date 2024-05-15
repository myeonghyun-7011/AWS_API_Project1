// App.js
import React, { useState, useEffect } from 'react';
import '../css/App.css';
import Nav from './nav';
import Header from './Header';
import Router from './Router';

function App() {
  const [message, setMessage] = useState('');

  return (
    <div className="App">
      <Header />
      <Nav />
      <Router />
    </div>
  );
}

export default App;
