import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="center-container">
      <div className="box">
        <h3>Explore global map of wind, weather and ocean conditions</h3>
        <p className='subtitle'>Planning your trip become more easier with ideate weather app you can start instantly see the while world weather within few seconds.</p>
        <a href="/register"><button className='login-button'>Get Started</button></a>
        <p>
          Already have an account ? <a href="/login" className='login'>Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Home;
