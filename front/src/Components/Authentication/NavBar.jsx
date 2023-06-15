import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = (event, path) => {
    event.preventDefault();
    try {
      handleClose();
      window.location.href = path;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#FFC3A0' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={(event) => handleRedirect(event, '/signin')}>Login</MenuItem>
          <MenuItem onClick={(event) => handleRedirect(event, '/signup')}>Sign Up</MenuItem>
          <MenuItem onClick={(event) => handleRedirect(event, '/')}>Dashboard</MenuItem>
          <MenuItem onClick={(event) => handleRedirect(event, '/admin')}>Admin Login</MenuItem>
        </Menu>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" style={{ fontFamily: 'fantasy', fontSize: '30px' }}>
            SpendSense
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
