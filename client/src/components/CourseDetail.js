import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import ReactMarkdown, { contextType } from "react-markdown";


export default ({ match, context }) => {

  const course = context.courseDetail;
  const courseUserId = course.userId;
  const history = useHistory();
  
  let courseSettings;
  let authUserId;
  let authPassword;
  let authEmail;
  
  // Collects information about a targetted course.
  useEffect(() => {
    context.actions.courseInfo(match.params.id)
  }, [])

  
  
  if(context.authenticatedUser !== null) {
    authUserId = context.authenticatedUser.authUser.id;
     authPassword = context.authPassword;
     authEmail = context.authenticatedUser.authUser.emailAddress;
  }

  // Deletes targetted course when submitted
  const submit = () => {
    context.actions.courseDelete(course.id, authEmail, authPassword)
    history.push('/course/delete')
  }

  // Checks if the course's user matches the user currently authenticated.
  if(authUserId === courseUserId) {
    courseSettings = (
      <>
        <Link className="button" to={{pathname: `/courses/${match.params.id}/update`}}>Update Course</Link>
        <button className="button" type='submit'>
          Delete Course
        </button>
      </>
    );
  } 

  return (
    <div>
        <div id="root">
          <div>
            </div>
            <div>
              <div className="actions--bar">
                <div className="bounds">
                  <div className="grid-100">
                  <form onSubmit={submit}>
                      <span>
                        {courseSettings}
                      </span>
                      <Link className="button button-secondary" to="/">Return to List</Link>
                  </form>
                  </div>
                </div>
              </div>
              <div className="bounds course--detail">
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                    <p>By {course.firstName} {course.lastName}</p>
                  </div>
                  <div className="course--description">
                    <ReactMarkdown source={course.description} />
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4 >Estimated Time</h4>
                        <h3 className="white-text">{course.estimatedTime}</h3>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <ReactMarkdown className="white-text" source={course.materialsNeeded} />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );    
}

  