import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      name,
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="name" 
                  name="name" 
                  type="text"
                  value={name} 
                  onChange={this.change} 
                  placeholder="Name" />
                <input 
                  id="username" 
                  name="username" 
                  type="text"
                  value={username} 
                  onChange={this.change} 
                  placeholder="User Name" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const {
      name,
      username,
      password,
    } = this.state;

    // New user payload that will be passed to the createUser() method
    const user = {
      name,
      username,
      password,
    };

    // createUser() is an asynchronous operation that returns a promise
    // take a look at createUser() in Data.js
    context.data.createUser(user)
    .then(errors => {
      if(errors.length) { //handles sign up issues ex. empty array
        this.setState({errors});
      } else {
        console.log(`${username} is successfully signed up and authenticated!`);
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