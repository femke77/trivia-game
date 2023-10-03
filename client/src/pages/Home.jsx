import React from 'react';
import Login from './Login.jsx';
import Auth from '../utils/auth';
import '../../src/index.css';
import Categories from './Category';


function Home() {
  const loggedIn = Auth.loggedIn();
  return (
    <>
      <h1>Welcome to the Triva App!!!</h1>

      {!loggedIn ? <Login  /> : <div className="clform" ><Categories/></div>}
    </>
  );
}

export default Home;
