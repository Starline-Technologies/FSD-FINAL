import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const API_URL = 'https://spendsence.onrender.com/api/v1/';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  height: 100vh;
  background-color: #f2f2f2;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background-color: #ffffff;
  border: 2px solid #333333;
  border-radius: 8px;
`;

const ProfileDetails = styled.div`
  margin-top: 2rem;

  p {
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }

  span {
    color: #666;
  }
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  label {
    width: 100px;
    margin-right: 1rem;
    font-weight: bold;
    color: #333;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #333333;
    border-radius: 4px;
  }
`;

const UpdateButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #333333;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Message = styled.div`
  margin-top: 1rem;
  color: ${({ success }) => (success ? 'green' : 'red')};
`;

function Profile(props) {
  const searchParams = new URLSearchParams(props.location.search);
  const email = searchParams.get('email');

  const [profiles, setProfiles] = useState([]);
  console.log(profiles)
  const [updatedName, setUpdatedName] = useState('');
  console.log(updatedName)
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedAge, setUpdatedAge] = useState('');
  const [updatedEducation, setUpdatedEducation] = useState('');
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');
  console.log(updatedPhoneNumber)
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  

  const history = useHistory();

  useEffect(() => {
    fetch(`${API_URL}/getProfiles`)
      .then((response) => response.json())
      .then((data) => {
        const profilesArray = Array.isArray(data) ? data : [data]; // Convert to array if not already an array
        console.log(profilesArray)
        setProfiles(profilesArray);
        console.log(profiles)
        const arr = profilesArray[0].data

        const matchingProfile = arr.find((profile) => profile.email === email);
        console.log("Not Found")
        if (matchingProfile) {
          console.log("FOUND")
          const { name, email, age, education, phoneNumber } = matchingProfile;
          setUpdatedName(name);
          setUpdatedEmail(email);
          setUpdatedAge(age);
          setUpdatedEducation(education);
          setUpdatedPhoneNumber(phoneNumber);
        }
      })
      .catch((error) => {
        console.error('Error retrieving profiles:', error);
        setErrorMessage('Failed to retrieve profiles. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleGoBack = () => {
    const dashboardUrl = `/dashboard?email=${encodeURIComponent(updatedEmail)}&age=${encodeURIComponent(updatedAge)}&name=${encodeURIComponent(updatedName)}&education=${encodeURIComponent(updatedEducation)}&phoneNumber=${encodeURIComponent(updatedPhoneNumber)}`;
    window.location.href = dashboardUrl;
  };
  
  const handleUpdateProfile = () => {
    let matchingProfile = false;

    for (const profile of profiles[0].data) {
      if (profile.email === updatedEmail) {
        matchingProfile = profile;
        break;
      }
    }

    if (matchingProfile) {
      const { _id, place, password } = matchingProfile;

      const updatedProfile = {
        _id,
        name: updatedName,
        email: updatedEmail,
        age: updatedAge,
        education: updatedEducation,
        phoneNumber: updatedPhoneNumber,
        place,
        password
      };

      fetch(`${API_URL}update-profile/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Profile updated:', data);

          // Update the state of profiles with the updated profile
          setProfiles((prevProfiles) => {
            const updatedProfiles = prevProfiles.map((profile) => {
              if (profile._id === _id) {
                return { ...profile, ...updatedProfile };
              }
              return profile;
            });
            return updatedProfiles;
          });

          setSuccessMessage('Profile updated successfully.');
          setErrorMessage('');
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
          setSuccessMessage('');
          setErrorMessage('Failed to update profile. Please try again.');
        });
    } else {
      setSuccessMessage('');
      setErrorMessage('No matching profile found.');
    }
  };

  return (
    <ProfileContainer>
      <ProfileBox>
        <h1>{updatedName}</h1>
        <ProfileDetails>
          {!isLoading && (
            <>
              <FormField>
                <label>Name:</label>
                <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
              </FormField>
              <FormField>
                <label>Email:</label>
                <input type="text" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
              </FormField>
              <FormField>
                <label>Age:</label>
                <input type="text" value={updatedAge} onChange={(e) => setUpdatedAge(e.target.value)} />
              </FormField>
              <FormField>
                <label>Education:</label>
                <input type="text" value={updatedEducation} onChange={(e) => setUpdatedEducation(e.target.value)} />
              </FormField>
              <FormField>
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={updatedPhoneNumber}
                  onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
                />
              </FormField>
              <UpdateButton onClick={handleUpdateProfile}>Update</UpdateButton>
              {successMessage && <Message success>{successMessage}</Message>}
              {errorMessage && <Message>{errorMessage}</Message>}
            </>
          )}
        </ProfileDetails>
        <button
          style={{
            width: '170px',
            height: '60px',
            fontPalette: 'dark',
            fontSize: '18px',
            background: '#f2f2f2',
            border: '#f2f2f2',
            borderRadius: '50px',
            color: 'darksalmon',
            outline: '#333333',
            cursor: 'pointer',
            transition: 'all 0.4s',
          }}
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </ProfileBox>
    </ProfileContainer>
  );
}

export default Profile;
