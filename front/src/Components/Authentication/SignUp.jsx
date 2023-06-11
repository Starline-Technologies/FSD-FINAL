import React, { useState } from 'react';
import { TextField, Checkbox, Button, Grid } from '@material-ui/core';
import './SignUpStyles.css'

function SignupPage() {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      name,
      place,
      age,
      email,
      education,
      phoneNumber,
      termsAndConditions,
    });
  };

  return (
    <div className='container'>
    <form onSubmit={handleSubmit} className='form-container form-field' style={{marginRight:'0px'}}>
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
            id="email2"
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
          <Checkbox
            id="termsAndConditions"
            checked={termsAndConditions}
            onChange={(e) => setTermsAndConditions(e.target.checked)}
          />
          <label htmlFor="termsAndConditions">I agree to the terms and conditions</label>
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
