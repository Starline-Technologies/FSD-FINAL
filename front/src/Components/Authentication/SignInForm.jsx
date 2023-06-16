import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Email, LockOutlined } from '@material-ui/icons';
import axios from 'axios';
import './SignInStyles.css';
import { AuthContext } from './AuthContext';


const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const { login } = useContext(AuthContext);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true); // Start the loading animation

      const response = await axios.get('http://localhost:8080/api/v1/getProfiles');

      const profileData = response.data;
      const profiles = Object.values(profileData); // Convert object values to an array

      let matchFound = false;
    

      // Iterate through each profile
      for (const profile of profiles[1]) {
        console.log(profile);
        console.log(profile.email);
        if (profile.email === email && profile.password === password) {
          matchFound = true;
          loggedInPerson = {
            name: profile.name,
            place: profile.place,
            age: profile.age,
            email: profile.email,
            education: profile.education,
            phoneNumber: profile.phoneNumber
        };
        break;
      }
    }

      if (matchFound) {
        // Redirect to the dashboard with email as query parameter
        login(loggedInPerson);
        console.log("Signed In")

        window.location.href = `/dashboard?email=${encodeURIComponent(email)}`; // Change '/dashboard' to your desired URL
      } else {
        setLoginError(true); // Set login error state to display the error message
      }
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false); // Stop the loading animation
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
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? 'Loading...' : 'Sign In'}
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignInForm;