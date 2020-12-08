import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="bounds white-text">
    <h1>Not Found</h1>
    <p>Sorry! We couldn't find the page you're looking for.</p>
    <Link className="button button-secondary" to="/Full-Stack-App-with-React-and-a-REST-API">Return to List</Link>
  </div>
);
