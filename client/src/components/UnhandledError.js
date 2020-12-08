import React from 'react';
import { Link } from 'react-router-dom'

export default () => (
  <div className="bounds white-text">
    <h1>Error</h1>
    <p>Oops! An unexpected error has occured.</p>
    <Link className="button button-secondary" to="/Full-Stack-App-with-React-and-a-REST-API">Return to List</Link>
  </div>
);