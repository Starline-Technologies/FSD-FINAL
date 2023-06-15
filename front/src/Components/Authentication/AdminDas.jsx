import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  userInfo: {
    marginRight: theme.spacing(2),
  },
}));

const AdminDas = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Fetch users from the database
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); // Replace with your backend API endpoint to fetch users
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`); // Replace with your backend API endpoint to delete a user
      setShowAlert(true);
      // Refresh the user list
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">Admin Dashboard</Typography>
      {showAlert && (
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          User deleted successfully.
        </Alert>
      )}
      {users.map((user) => (
        <div key={user._id} className={classes.userContainer}>
          <div className={classes.userInfo}>
            <Typography>{user.name}</Typography>
            <Typography variant="body2">{user.email}</Typography>
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => deleteUser(user._id)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AdminDas;
