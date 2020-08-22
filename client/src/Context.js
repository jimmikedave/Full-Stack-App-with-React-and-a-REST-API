// In React, Context is primarily used when some data needs to be accessible by many components 
// at different nesting levels.
// Context lets you pass data through the component tree without having to pass props down manually at every level.

import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext(); 

// The provider is what provides the data that needs to be consumed by other components of the application
// This class is a high-order component that returns a provider component which provides state. 
export class Provider extends Component {

  state = {
    authenticatedUser: null
  };

  constructor() {
    super();
    this.data = new Data(); //initialize a new instance of the Data class 
  }

  // value represents an object containing the context to be shared throughout the component tree
  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: { // Add the 'actions property and object'
        signIn: this.signIn,
        signOut: this.signOut
      }
    };
    // The Provider is what provides the data that needs to be consumed by other components
    // provides the application state via a required 'value' prop
    // value represents an object containing the context to be shared throughout the component tree
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (emailAddress, password) => {
    // returned promise value will look like {emailAddress: "emailAddress", password: "password"}
    const user = await this.data.getUser(emailAddress, password);
    if(user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
    }
    return user;
  }

  signOut = () => {
    this.setState({authenticatedUser: null});
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

// withContext automatically connects the component passed to it to all actions and context changes
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

