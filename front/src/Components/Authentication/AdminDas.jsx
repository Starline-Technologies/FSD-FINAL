import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: 'center',
    overflow: 'auto',
    maxHeight: '500px',
  },
  tableContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    width: '80%',
    marginTop: theme.spacing(2),
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
}));

const AdminDas = () => {
  const classes = useStyles();
  const [profiles, setProfiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Fetch profiles from the API initially
    fetchProfiles();

    // Set up an interval to fetch profiles every 10 seconds (adjust as needed)
    const interval = setInterval(fetchProfiles, 10000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [profiles]);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/getProfiles');
      const profilesArray = Object.values(response.data);
      setProfiles(profilesArray);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const deleteProfile = async (profileId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/deleteProfile/${profileId}`);
      setShowAlert(true);
      fetchProfiles();
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">Admin Dashboard</Typography>
      {showAlert && (
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          Profile deleted successfully.
        </Alert>
      )}
      {profiles.length === 0 ? (
        <Typography>No profiles found.</Typography>
      ) : (
        <div className={classes.tableContainer}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {profiles[1].map((profile) => (
                <tr key={profile._id}>
                  <td>{profile.name}</td>
                  <td>{profile.email}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteProfile(profile._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDas;
