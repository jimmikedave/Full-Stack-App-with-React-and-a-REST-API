import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Course() {

  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios(`http://localhost:5000/api/courses`)
      .then(response => setCourseList(response))
      .catch(error => console.log('Error fetching and parsing data', error))
      .finally(() => setIsLoading(false));
  });
        
  
  console.log(courseList)

    
  return (
    <div>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css?family=Work+Sans:400,500"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Cousine"
        rel="stylesheet"
        type="text/css"
      />
      <link href="../styles/global.css" rel="stylesheet" />
      <title>Courses</title>
      <div id="root">
        <div>
          <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              <nav>
                <a className="signup" href="sign-up.html">
                  Sign Up
                </a>
                <a className="signin" href="sign-in.html">
                  Sign In
                </a>
              </nav>
            </div>
          </div>
          <hr />
          <div className="bounds">
            <div className="grid-33">
              <a className="course--module course--link" href="course-detail.html">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">Build a Basic Bookcase</h3>
              </a>
            </div>
            <div className="grid-33">
              <a className="course--module course--link" href="course-detail.html">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">Learn How to Program</h3>
              </a>
            </div>
            <div className="grid-33">
              <a className="course--module course--link" href="course-detail.html">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">Learn How to Test Programs</h3>
              </a>
            </div>
            <div className="grid-33">
              <a
                className="course--module course--add--module"
                href="create-course.html"
              >
                <h3 className="course--add--title">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 13 13"
                    className="add"
                  >
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                  </svg>
                  New Course
                </h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
    
export default Course
