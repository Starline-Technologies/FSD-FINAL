import { TextField, Button, Grid } from '@material-ui/core';
import './SignUpStyles.css';
import axios from 'axios';
import React, { useState } from 'react';

function SignupPage() {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [education, setEducation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      const response = await axios.post('http://localhost:8080/api/v1/createProfile', profileData);
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
    setEducation('');
    setPhoneNumber('');
  };

  return (
    <div className='container'>
      {errorAlert && <div className="alert error">Error: Failed to submit the form. Please try again.</div>}
      {successAlert && (
  <div
    style={{
      fontSize: '2rem',
      color: 'white',
      backgroundColor: 'rgba(0, 35, 102, 1)',
      padding: '1.5rem',
      borderRadius: '10px',
      textAlign: 'center',
      display: 'inline-block'
    }}
  >
    Success: Form submitted successfully.
  </div>
)}
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
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default SignupPage;
