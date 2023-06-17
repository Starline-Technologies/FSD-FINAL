import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  padding: 2rem;
  text-align: center;
  background-color:#898F8C;
  height:100vh;
  
  
  
  
`;

const ProfileDetails = styled.div`
  margin-top: 2rem;

  p {
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
    font-size:2rem;
  }

  span {
    color: #666;
  }
`;

function Profile(props) {
  const searchParams = new URLSearchParams(props.location.search);
  const email = searchParams.get('email');
  const age = searchParams.get('age');
  const name = searchParams.get('name');
  const education = searchParams.get('education');
  const phoneNumber = searchParams.get('phoneNumber');

  return (
    <ProfileContainer>
      <h1>PROFILE</h1>
      <ProfileDetails>
        <p>Email: <span>{email}</span></p>
        <p>Age: <span>{age}</span></p>
        <p>Name: <span>{name}</span></p>
        <p>Education: <span>{education}</span></p>
        <p>Phone Number: <span>{phoneNumber}</span></p>
      </ProfileDetails>
    </ProfileContainer>
  );
}

export default Profile;
