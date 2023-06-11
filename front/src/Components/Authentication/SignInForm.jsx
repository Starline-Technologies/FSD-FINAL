import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { LockOutlined } from '@material-ui/icons';
import './SignInStyles.css'

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('email:', email);
    console.log('password:', password);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className='shape'>
    <form onSubmit={handleSubmit} className='signin-form'>
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
