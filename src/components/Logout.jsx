import React from 'react';
import { sessionService } from 'redux-react-session';

function Logout() {
  const handleLogout = () => {
    sessionService.deleteSession();
  };

  return <button onClick={handleLogout}>Logout</button>;
}
export default Logout;