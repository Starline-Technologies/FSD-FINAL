import { TextField, Button, Grid, Snackbar } from '@material-ui/core';
import './SignUpStyles.css';
import axios from 'axios';
import React, { useState } from 'react';

function SignupPage() {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [education, setEducation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorAlert(true); // Show error alert
      return;
    }

    const profileData = {
      name,
      place,
      age,
      email,
      password,
      education,
      phoneNumber,
    };

    try {
      const response = await axios.post('https://spendsence.onrender.com/api/v1/createProfile', profileData);
      console.log(response.data); // Handle the response from the server
      setSuccessAlert(true); // Show success alert
      clearFields(); // Clear input fields
    } catch (error) {
      console.error(error);
      setErrorAlert(true); // Show error alert
    }
  };

  const clearFields = () => {
    setName('');
    setPlace('');
    setAge('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setEducation('');
    setPhoneNumber('');
  };

  const isPasswordValid = () => {
    // Include your password validation logic here
    // For example, check if the password contains at least one special character
    const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    return specialChars.test(password);
  };

  return (
    <div className='container'>
      <Snackbar
        open={errorAlert}
        autoHideDuration={5000}
        onClose={() => setErrorAlert(false)}
        message={password !== confirmPassword ? "Error: Passwords do not match." : "Error: Failed to submit the form. Please try again."}
        ContentProps={{
          className: 'alert error',
        }}
      />
      <Snackbar
        open={successAlert}
        autoHideDuration={5000}
        onClose={() => setSuccessAlert(false)}
        message="Success: Form submitted successfully."
        ContentProps={{
          className: 'alert success',
        }}
      />
      <form onSubmit={handleSubmit} className='form-container form-field' style={{ marginRight: '0px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="place"
              label="Place"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="age"
              label="Age"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="education"
              label="Education"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phoneNumber"
              label="Phone Number"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="password"
              label="Password"
              type='password'
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={password !== '' && !isPasswordValid()}
              helperText={password !== '' && !isPasswordValid() ? 'Password must include special characters.' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type='password'
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPassword !== '' && password !== confirmPassword}
              helperText={confirmPassword !== '' && password !== confirmPassword ? 'Passwords do not match.' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
          <a href="terms.txt" download target="_blank">Terms and Conditions</a>
        </Grid>
      </form>
    </div>
  );
}

export default SignupPage;
