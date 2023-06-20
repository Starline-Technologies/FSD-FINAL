import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import BlockIcon from "@mui/icons-material/Block";
import Paper from "@material-ui/core/Paper";
import { flexbox } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: "center",
    overflow: "auto",
    maxHeight: "500px",
    
    
  },
  tableContainer: {
    display: "flex",
    justifyContent: "center",
    
  },
  table: {
    width: "80%",
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    
    ...flexbox.center, // Apply flexbox utility class to center the table
  },
  userContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  signoutButton: {
    position: "absolute",
    right: theme.spacing(2),
    bottom: theme.spacing(1),
  },
}));

const AdminDas = () => {
  const classes = useStyles();
  const history = useHistory();
  const [profiles, setProfiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [blockedProfiles, setBlockedProfiles] = useState([]);


  useEffect(() => {
    fetchProfiles();

    const interval = setInterval(fetchProfiles, 10000);

    return () => clearInterval(interval);
  }, [profiles]);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(
        "https://spendsence.onrender.com/api/v1/getProfiles"
      );
      const profilesArray = Object.values(response.data);
      setProfiles(profilesArray);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const deleteProfile = async (profileId) => {
    try {
      await axios.delete(
        `https://spendsence.onrender.com/api/v1/delete-profile/${profileId}`
      );
      setShowAlert(true);
      fetchProfiles();
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const blockProfile = async (profileId) => {
    try {
      const updatedProfiles = [...blockedProfiles];
      const index = updatedProfiles.indexOf(profileId);
  
      if (index === -1) {
        // Profile is not blocked, so block it
        updatedProfiles.push(profileId);
        setShowAlert('blocked');
      } else {
        // Profile is blocked, so unblock it
        updatedProfiles.splice(index, 1);
        setShowAlert('unblocked');
      }
  
      setBlockedProfiles(updatedProfiles);
      fetchProfiles();
    } catch (error) {
      console.error('Error blocking/unblocking profile:', error);
    }
    try {
      // Make the necessary API call to block the profile
      await axios.post(`https://spendsence.onrender.com/api/v1/blockProfile/${profileId}`);
      setShowAlert(true);
      fetchProfiles();
    } catch (error) {
      console.error('Error blocking profile:', error);
    }
  };
  

  const signOut = () => {
    history.push("/");
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        style={{ fontFamily: "Josefin Sans",fontWeight: 'bold', fontSize: "2rem" ,}}
      >
        Admin Dashboard
      </Typography>
      <br />
      <hr />
      {showAlert && (
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          Profile action performed successfully.
        </Alert>
      )}

      {profiles.length === 0 ? (
        <Typography>No profiles found.</Typography>
      ) : (
        <div className={classes.tableContainer}>
          <Paper elevation={3} className={classes.table}>
            <table>
              <thead>
                
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Delete</th>
                  <th>Block</th>

                </tr>
              </thead>
              <tbody>
                {profiles[1].map((profile) => (
                  <tr
                    key={profile._id}
                    style={{
                      color: blockedProfiles.includes(profile._id)
                        ? "red"
                        : "inherit",
                    }}
                  >
                    <td>{profile.name}</td>
                    <td>{profile.email}</td>
                    <td>
                      <IconButton
                        color="secondary"
                        onClick={() => deleteProfile(profile._id)}
                      >
                        <DeleteIcon />    
                      </IconButton>
                      </td>
                      <td>
                      <IconButton
                        color="secondary"
                        onClick={() => blockProfile(profile._id)}
                      >
                        <BlockIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Paper>
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        className={classes.signoutButton}
        onClick={signOut}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default AdminDas;
