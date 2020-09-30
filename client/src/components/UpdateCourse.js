import React, { Component } from 'react';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  }

  componentDidMount() {
    this.loadCourse();    
  }

  // Collect targetted course information to check if the user has authorization.
  loadCourse = () => {
    this.props.context.actions.courseInfo(this.props.match.params.id)
    .then(response => {
      // If the current user does not have authentication for the course redirect to /forbidden.
        if(response.course.userId !== this.props.context.authenticatedUser.authUser.id) {
          this.props.history.push('/forbidden')
        } else {
          this.setState({
            title: response.course.title,
            description: response.course.description,
            estimatedTime: response.course.estimatedTime,
            materialsNeeded: response.course.materialsNeeded,
            userId: response.course.userId,
            author: response.course.user
          })
        }

      
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    })
  };


  render() {
    
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    

    return (
        <div className="bounds course--detail">
            <h1 className="white-text">Update Course</h1>
            <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
            <div>
            
                <div className="grid-66">
                <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className="input-title course--title--input"
                        placeholder="Course title..."
                        onChange={this.change}
                        value={title}
                    />
                    </div>
                </div>
                <div className="course--description">
                    <div>
                    <textarea
                        id="description"
                        name="description"
                        className=""
                        placeholder="Course description..."
                        onChange={this.change}
                        value={description}
                    />
                    </div>
                </div>
                </div>
                <div className="grid-25 grid-right">
                <div className="course--stats">
                    <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            className="course--time--input"
                            placeholder="Hours"
                            onChange={this.change}
                            value={estimatedTime}
                        />
                        </div>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                        <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            className=""
                            placeholder="List materials..."
                            onChange={this.change}
                            value={materialsNeeded}
                        />
                        </div>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            )} />
        </div> 
    );
  }

  // Allows change in the input values.
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // On submit update course.
  submit = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser.authUser.emailAddress;
    const authPassword = context.authPassword;
    const courseId = this.props.match.params.id;

    // console.log(this.props)

    
    // Destructure and unpack properties from the state object.
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;

    // New user payload that will be passed to the createUser() method
    const courseBody = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    };

    // console.log(courseBody)

    // CreateUser() is an asynchronous operation that returns a promise.
    context.data.updateCourse(courseId, courseBody, authUser, authPassword)
    .then(errors => {
      if(errors.length) { //handles sign up issues ex. empty array
        this.setState({errors});
      } else {
        this.props.history.push('/');
      }
    })
    .catch (err => {
      console.log(err); // handle rejected promises
      this.props.history.push('/error'); //push to history stack
    })
  }

  cancel = () => {
      this.props.history.push('/');
  }
}