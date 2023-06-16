import React from 'react';
import styled from 'styled-components';

function Profile({ email, age, name, education, phoneNumber }) {
  return (
    <ProfileStyled>
      <h1>Profile</h1>
      <div className="profile-details">
        <div className="detail">
          <label>Email:</label>
          <span>{email}</span>
        </div>
        <div className="detail">
          <label>Age:</label>
          <span>{age}</span>
        </div>
        <div className="detail">
          <label>Name:</label>
          <span>{name}</span>
        </div>
        <div className="detail">
          <label>Education:</label>
          <span>{education}</span>
        </div>
        <div className="detail">
          <label>Phone Number:</label>
          <span>{phoneNumber}</span>
        </div>
      </div>
    </ProfileStyled>
  );
}

const ProfileStyled = styled.div`
  padding: 2rem;

  h1 {
    color: rgba(34, 34, 96, 1);
    margin-bottom: 1rem;
  }

  .profile-details {
    display: grid;
    grid-gap: 1rem;
  }

  .detail {
    display: grid;
    grid-template-columns: 100px auto;
    align-items: center;

    label {
      font-weight: bold;
    }

    span {
      color: rgba(34, 34, 96, 0.6);
    }
  }
`;

export default Profile;