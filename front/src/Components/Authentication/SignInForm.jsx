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
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      setLoading(true);
  
      const response = await axios.get('https://spendsence.onrender.com/api/v1/getProfiles');
  
      const profileData = response.data;
      const profiles = Object.values(profileData);
  
      let matchFound = false;
      let loggedInPerson = null;
  
      for (const profile of profiles[1]) {
        if (profile.email === email && profile.password === password) {
          matchFound = true;
          loggedInPerson = {
            name: profile.name,
            place: profile.place,
            age: profile.age,
            email: profile.email,
            education: profile.education,
            phoneNumber: profile.phoneNumber,
          };
          break;
        }
        
      }
      if(email === 'admin@gmail.com' && password === 'password'){
        matchFound = true;
      }

  
      if (matchFound) {
        if (email === 'admin@gmail.com' && password === 'password') {
          window.location.href = '/admin/dashboard';
        } else {
          login(loggedInPerson);
  
          const encodedEmail = encodeURIComponent(loggedInPerson.email);
          const encodedAge = encodeURIComponent(loggedInPerson.age);
          const encodedPlace = encodeURIComponent(loggedInPerson.place);
          const encodedName = encodeURIComponent(loggedInPerson.name);
          const encodedEducation = encodeURIComponent(loggedInPerson.education);
          const encodedPhoneNumber = encodeURIComponent(loggedInPerson.phoneNumber);
  
          window.location.href = `/dashboard?email=${encodedEmail}&age=${encodedAge}&place=${encodedPlace}&name=${encodedName}&education=${encodedEducation}&phoneNumber=${encodedPhoneNumber}`;
        }
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setLoginError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setLoginError(false);
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
              <p style={{ marginTop: '10px' }}>
                Don't have an account? <a href='/signup'>Sign up</a> 
              </p>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignInForm;
