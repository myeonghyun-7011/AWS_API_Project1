import React from 'react';
import '../css/App.css';
import '../css/style.css';
import Header from './Header';
import Router from './Router';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;