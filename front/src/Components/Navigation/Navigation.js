import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import images from '../../img/images.png'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { AuthContext } from '../Authentication/AuthContext';

function Navigation({active, setActive}) {
    const { loggedInPerson } = useContext(AuthContext);
    console.log(loggedInPerson)
    const getEmailFromURL = () => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get('email');
      };
    
    const email = getEmailFromURL();
    var strippedEmail = email.replace(/@gmail\.com$/, "");
    return (
        <NavStyled>
            <div className="user-con">
                <img src={images} alt="" />
                <div className="text">
                    <h2>{strippedEmail}</h2>
                    <p>Transaction</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                <li>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(173, 216, 230, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }

    h2 {
      color: rgba(0, 35, 102, 1);
    }

    p {
      color: rgba(0, 35, 102, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;

    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(0, 35, 102, 0.6);
      padding-left: 1rem;
      position: relative;

      i {
        color: rgba(0, 35, 102, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(0, 35, 102, 1) !important;

    i {
      color: rgba(0, 35, 102, 1) !important;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;

export default NavStyled;

export default Navigation
