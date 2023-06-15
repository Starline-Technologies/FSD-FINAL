import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Email, LockOutlined } from '@material-ui/icons';
import axios from 'axios';
import './SignInStyles.css';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:8080/api/v1/getProfiles');

      const profileData = response.data;
      const profiles = Object.values(profileData); // Convert object values to an array

      let matchFound = false;
     

      // Iterate through each profile
      for (const profile of profiles[1]) {
        console.log(profile);
        console.log(profile.email);
        if (profile.email === email && profile.password === password) {
          console.log('matched');
          matchFound = true;
          break;
        }
      }

      if (matchFound) {
        // Redirect to the dashboard or perform any other action
        window.location.href = '/dashboard'; // Change '/dashboard' to your desired URL
      } else {
        setLoginError(true); // Set login error state to display the error message
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setLoginError(false); // Reset login error state when email changes
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setLoginError(false); // Reset login error state when password changes
  };

  return (
    <div className="shape">
      <form onSubmit={handleSubmit} className="signin-form">
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <LockOutlined />
          </Grid>
          <Grid item>
            <FormControl>
              <TextField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              {loginError && <p className="error-message">Invalid credentials. Please try again.</p>}
              <Button type="submit" variant="contained" color="primary">
                Sign In
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignInForm;
