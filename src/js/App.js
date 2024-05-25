import React, { useState } from 'react';
import '../css/App.css';
import '../css/style.css';
import '../css/reset.css';
import Header from './Header';
import Router from './Router';
import Footer from './Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [responseData, setResponseData] = useState(null);

  return (
    <div className="App">
      <Header />
      <Router setResponseData={setResponseData} responseData={responseData} />
      <Footer />
    </div>
  );
}

export default App;
