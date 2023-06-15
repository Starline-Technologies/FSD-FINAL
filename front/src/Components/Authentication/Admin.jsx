import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';
import backgroundImage from './4.jpg';
import { red, yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize:'size'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom:'100px'
    
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  loginButton: {
    marginTop: theme.spacing(2),
  },
}));

const AdminPage = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Check if email and password match the default values
    if (email === 'admin@gmail.com' && password === 'password') {
      // Perform successful login action here
      setRedirectToDashboard(true);
    } else {
      // Show alert for incorrect login credentials
      setShowAlert(true);
    }
  };

  if (redirectToDashboard) {
    // Redirect to the admin dashboard
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <div className={classes.root}>
      <h1 style={{color:'white'}}>Login</h1>
      <br />
      <form className={classes.form}>
        {showAlert && (
          <Alert severity="error" onClose={() => setShowAlert(false)}>
            Email and password don't match.
          </Alert>
        )}
        <TextField
          className={classes.textField}
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          className={classes.textField}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          className={classes.loginButton}
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default AdminPage;
