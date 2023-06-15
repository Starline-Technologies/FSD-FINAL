import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { LockOutlined } from '@material-ui/icons';
import axios from 'axios';
import './SignInStyles.css';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('createProfile', { email, password });
      // Handle successful login here
      console.log(response.data); // Assuming the response contains the created profile data
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
