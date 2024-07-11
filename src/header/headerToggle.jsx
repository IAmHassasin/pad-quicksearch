import React from 'react';
import { IconButton, AppBar, Toolbar } from '@mui/material';
import { Brightness4, Brightness7, Balance } from '@mui/icons-material';

const Header = ({ darkMode, callbackChangeMode, callbackComparePopup }) => {
  const handleColorMode = () => {
    callbackChangeMode();
  };

  const handleComparePopup = () => {
    callbackComparePopup();
  }

  return (
    <AppBar position="static" color="transparent" style={{ boxShadow: "none" }}>
      <Toolbar>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton color="inherit" onClick={handleComparePopup}>
          <Balance />
        </IconButton>
        <IconButton color="inherit" onClick={handleColorMode}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
