import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin white-text">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                  <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
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

  submit = () => {
    const { context } = this.props;
    
    // Destructure and unpack properties from the state object.
    const {
      firstName,
      lastName,
      emailAddress,
      password,
    } = this.state;

    // New user payload that will be passed to the createUser() method.
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    // CreateUser() is an asynchronous operation that returns a promise.
    context.data.createUser(user)
    .then(errors => {
      if(errors.length) { // Handles sign up issues ex. empty array.
        this.setState({errors});
      } else {
        console.log(`${emailAddress} is successfully signed up and authenticated!`);
        context.actions.signIn(emailAddress, password)
          .then(() => {
            this.props.history.push('/Full-Stack-App-with-React-and-a-REST-API');
          })
      }
    })
    .catch (err => {
      console.log(err); // Handle rejected promises.
      this.props.history.push('/error'); 
    })
  }

  cancel = () => {
      this.props.history.push('/Full-Stack-App-with-React-and-a-REST-API');
  }
}