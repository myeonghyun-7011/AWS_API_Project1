import React from 'react';
import '../css/App.css';
import '../css/style.css';
import '../css/reset.css';
import Header from './Header';
import Router from './Router';
import Footer from './Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';

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