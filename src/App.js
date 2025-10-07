import React from 'react';
import './App.css';
import NetflixCarousel from './components/NetflixCarousel';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Drew Skelton</h1>
          <p>Software Developer & AI Engineer</p>

        </div>
      </header>
      
      <main className="main-content">
        <NetflixCarousel />
      </main>
      
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Drew Skelton - Programming Portfolio</p>
      </footer>
    </div>
  );
}

export default App;
