import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:2rem;
 
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

function Profile(props) {
  const searchParams = new URLSearchParams(props.location.search);
  const email = searchParams.get('email');
  const age = searchParams.get('age');
  const name = searchParams.get('name');
  const education = searchParams.get('education');
  const phoneNumber = searchParams.get('phoneNumber');
  const handleGoBack = () => {
    
    window.location.href=`/dashboard?email=${email}&age=${age}&name=${name}&education=${education}&phoneNumber=${phoneNumber}`
    
    
  };

  return (
    <ProfileContainer>
      <ProfileBox>
        <h1>{name}</h1>
        <ProfileDetails>
          <div style={{ textAlign: 'left' }}>
          <p>Email: <span>{email}</span></p>
          <p>Age: <span>{age}</span></p>
          <p>Education: <span>{education}</span></p>
          <p>Phone Number: <span>{phoneNumber}</span></p>

          </div>
          
          <button style={{width: '170px',
    height: '60px',
    fontPalette: "dark",
    fontSize: '18px',
    background: '#f2f2f2',
    border: '#f2f2f2',
    borderRadius: '50px',
    color: 'darksalmon',
    outline: '#333333',
    cursor: 'pointer',
    transition: 'all 0.4s'}} onClick={handleGoBack}>Go Back</button>
          
        </ProfileDetails>
      </ProfileBox>
    </ProfileContainer>
  );
}

export default Profile;
