import React, { Component } from 'react';

export default ({ context }) => {
  const authUser = context.authenticatedUser;
  console.log(authUser)

    return (
      <div className="bounds">
        <div className="grid-100">
          <h1>{authUser.authUser.firstName} is authenticated!</h1>
          <p>Your username is {authUser.authUser.emailAddress}.</p>
        </div>
      </div>
    );
}
  
