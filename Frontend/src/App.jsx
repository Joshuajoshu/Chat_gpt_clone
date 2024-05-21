import { NavLink, Outlet } from "react-router-dom";
import React, { useState } from 'react';
import Button from '@mui/material/Button';

function App() {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(true);
  };

  return (
    <div className="login-register-buttons">
      {!clicked && (
        <>
          <Button variant="outlined" onClick={handleButtonClick} component={NavLink} to="/login" style={{ textDecoration: 'none', marginRight: '10px' }}>Login</Button>
          <Button variant="outlined" onClick={handleButtonClick} component={NavLink} to="/register" style={{ textDecoration: 'none' }}>Register</Button>
        </>
      )}
      <Outlet/>
    </div>
  );
}

export default App;
