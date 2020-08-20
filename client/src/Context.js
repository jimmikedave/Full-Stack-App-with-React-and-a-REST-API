// In React, Context is primarily used when some data needs to be accessible by many components at different nesting levels
// Context lets you pass data through the component tree without having to pass props down manually at every level


import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext(); 

// The provider is what provides the data that needs to be consumed by other components of the application
// This class is a high-order component that returns a provider component which provides state. 
export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data(); //initialize a new instance of the Data class 
  }

  // value represents an object containing the context to be shared throughout the component tree
  render() {
    const value = {
      data: this.data,
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async () => {

  }

  signOut = () => {

  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

