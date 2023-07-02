import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  userPageChangePasswordToggler,
  userPageDeleteAccountToggler,
  userPageMyEmailToggler,
  userPageProfileToggler
} from 'redux/modules/profilePageMenuToggler';
import { styled } from 'styled-components';
import Person2Icon from '@mui/icons-material/Person2';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function UserPageMenu() {
  const dispatch = useDispatch();
  const menuToggler = useSelector((state) => {
    return state.profilePageMenuToggler;
  });
  // MY_EMAIL, PROFILE, CHANGE_PASSWORD
  return (
    <StyledDiv>
      <div id="profile-page-menu-container">
        <div className="profile-page-menu" onClick={() => userPageProfileToggler(dispatch)}>
          {menuToggler.PROFILE ? (
            <>
              <Person2Icon style={{ color: '#3176cc' }} />
              <h2 style={{ color: '#3176cc' }}>Profile</h2>
            </>
          ) : (
            <>
              <Person2Icon />
              <h2>Profile</h2>
            </>
          )}
        </div>
        <div className="profile-page-menu" onClick={() => userPageMyEmailToggler(dispatch)}>
          {menuToggler.MY_EMAIL ? (
            <>
              <EmailIcon style={{ color: '#3176cc' }} />
              <h2 style={{ color: '#3176cc' }}>My Email</h2>
            </>
          ) : (
            <>
              <EmailIcon />
              <h2>My Email</h2>
            </>
          )}
        </div>
        <div className="profile-page-menu" onClick={() => userPageChangePasswordToggler(dispatch)}>
          {menuToggler.CHANGE_PASSWORD ? (
            <>
              <KeyIcon style={{ color: '#3176cc' }} />
              <h2 style={{ color: '#3176cc' }}>Change Password</h2>
            </>
          ) : (
            <>
              <KeyIcon />
              <h2>Change Password</h2>
            </>
          )}
        </div>
        <div className="profile-page-menu" onClick={() => userPageDeleteAccountToggler(dispatch)}>
          {menuToggler.DELETE_ACCOUNT ? (
            <>
              <PersonRemoveIcon style={{ color: '#3176cc' }} />
              <h2 style={{ color: '#3176cc' }}>Delete Account</h2>
            </>
          ) : (
            <>
              <PersonRemoveIcon />
              <h2>Delete Account</h2>
            </>
          )}
        </div>
      </div>
    </StyledDiv>
  );
}

export default UserPageMenu;

const StyledDiv = styled.div`
  margin-top: 3rem;
  min-width: 220px;
  height: 50vh;
  #profile-page-menu-container {
    box-shadow: 1px 1px 3px 0 #abc;
    background-color: #fff;
  }
  .profile-page-menu {
    height: 40px;
    display: flex;
    padding: 0 1rem;
    align-items: center;
    cursor: pointer;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    border-radius: 12px;
  }
  .profile-page-menu svg {
    width: 20px;
  }
  .profile-page-menu:hover {
    background-color: #fafaea;
  }
  .profile-page-menu h2 {
    margin-top: 3px;
    margin-left: 0.7rem;
    color: #5f5f5f;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }
`;
