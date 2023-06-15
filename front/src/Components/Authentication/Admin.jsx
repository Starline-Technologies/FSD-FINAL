import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: '0 auto',
  },
  textField: {
    marginBottom: theme.spacing(2),
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
      <h1>Admin Page</h1>
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
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default AdminPage;
