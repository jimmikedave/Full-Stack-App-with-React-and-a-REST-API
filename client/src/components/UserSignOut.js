import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {
  // call signout function
  useEffect(() => context.actions.signOut());

  return (
    <Redirect to="/" />
  );
}
