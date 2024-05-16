import React from 'react';

const MainPage = ({ children }) => {
    return (
        <main id="main" role="main">
            {children}
        </main>
    );
};

export default MainPage;