import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import images from '../../img/images.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import { AuthContext } from '../Authentication/AuthContext';

function Navigation({ active, setActive }) {
  const history = useHistory();
  const { loggedInPerson, setLoggedInPerson } = useContext(AuthContext);

  const getEmailFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('email');
  };

  const getAgeFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('age');
  };

  const getNameFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('name');
  };

  const getEducationFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('education');
  };

  const getPhoneNumberFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('phoneNumber');
  };

  const email = getEmailFromURL();
  const age = getAgeFromURL();
  const name = getNameFromURL();
  const education = getEducationFromURL();
  const phoneNumber = getPhoneNumberFromURL();

  const strippedEmail = decodeURIComponent(email.replace(/\+/g, ' '));

  const handleProfileClick = () => {
    history.push(
      `/profile?email=${email}&age=${age}&name=${name}&education=${education}&phoneNumber=${phoneNumber}`
    );
    window.location.reload()
  };

  const handleSignOut = () => {
    // Perform sign out logic here (e.g., clearing session, updating state, etc.)
    setLoggedInPerson(null);
    history.push('/');
    window.location.reload();
  };

  return (
    <NavStyled>
      <div className="user-con" onClick={handleProfileClick}>
        <img src={images} alt="" />
        <h1>{name}</h1>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? 'active' : ''}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <div className="signout">
        <a href="/" onClick={handleSignOut}>
          {signout} Sign Out
        </a>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
padding: 2rem;
width: 360px;
height: 86vh;
background: linear-gradient(to right, #3b3054, #1d1b32);
color: #fff;
display: flex;
flex-direction: column;
justify-content: space-between;
border-radius: 50px; /* Added border-radius to make the corners rounder */

  .user-con {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #fff;
      box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2);
      cursor:pointer;
    }

    h1 {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0;
      color:#fff
    }
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      display: flex;
      align-items: center;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;

      i {
        font-size: 1.2rem;
        margin-right: 0.5rem;
      }

      &:hover {
        transform: translateX(5px);
      }

      &.active {
        color: #ff8c00;
        font-weight: bold;

        i {
          color: #ff8c00;
        }
      }
    }
  }


  .signout {
    font-size: 2rem;
    margin-top: auto;
    margin-bottom: 110px;

    a {
      color: #fff;
      text-decoration: none;
      display: flex;
      align-items: center;
      margin-left: 1rem;

      svg {
        margin-right: 0rem;
      }
     
    }
  }
`;

export default Navigation;
