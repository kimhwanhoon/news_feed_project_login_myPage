import React, { useRef } from 'react';
import { styled } from 'styled-components';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { deleteUserAccount } from 'firebaseConfig/firebaseAuth';
import { useDispatch } from 'react-redux';

function UserDeleteAccount() {
  const checkbox = useRef('');
  const dispatch = useDispatch();
  return (
    <StyledDiv>
      <div className="profile-detail-container" id="profile-detail-delete-account-container">
        <div className="profile-page-detail-container">
          <DangerousIcon style={{ color: 'red' }} />
          <h3 id="delete-account-warning" className="profile-detail-my-email-subtitle" style={{ color: 'red' }}>
            Delete your account will permanently delete your account.
          </h3>
          <p>Are you sure you want to delete your account?</p>
          <span>
            <input type="checkbox" name="confirm to delete account" ref={checkbox} id="delete-checkbox" />I confirm to
            delete account.
          </span>
          <button onClick={() => deleteUserAccount(checkbox, dispatch)}>Delete Account</button>
        </div>
      </div>
    </StyledDiv>
  );
}

export default UserDeleteAccount;

// style
const StyledDiv = styled.div`
  span {
    display: block;
    padding: 1rem 0;
    color: #444;
  }
  #delete-checkbox {
    margin-right: 0.5rem;
  }

  #profile-detail-delete-account-container {
    box-shadow: 0px 0px 5px 0px #ff4c33;
  }

  .profile-page-detail-input-div {
    position: relative;
  }
  .profile-page-detail-input-div p:hover {
    font-weight: 600;
  }
  .profile-page-detail-input-div button {
    margin-top: 2rem;
    border: none;
    padding: 10px;
    box-shadow: 1px 1px 5px -1px #649ffe;
    background-color: white;
    color: #333;
    border-radius: 10px;
    font-size: 0.9rem;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    cursor: pointer;
  }

  .profile-page-detail-input-div button:hover {
    transform: scale(1.03);
    color: white;
    background-color: #649ffe;
  }
  #user-page-verify-email-button {
    margin-top: 1rem;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    box-shadow: 1px 1px 5px -1px #649ffe;
    background-color: #fff;
    cursor: pointer;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
  }
  #user-page-verify-email-button:hover {
    transform: scale(1.03);
    color: white;
    background-color: #022a03;
  }
  p {
    line-height: 1.75;
    font-weight: 700;
  }

  //
  svg {
    margin-top: 3rem;
    margin-bottom: 0.25rem;
  }

  #delete-account-warning {
    padding-top: 0.5rem;
  }

  button {
    margin-top: 0.5rem;
    padding: 5px 20px;
    border: none;
    box-shadow: 1px 1px 2px 0 #ff4c33;

    border-radius: 8px;
    cursor: pointer;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid red;
    color: #fff;
    background-color: #ff4c33;
  }
  button:hover {
    background-color: #fff;
    color: #022a03;
    box-shadow: 1px 1px 2px 0 #222;
    border: 1px transparent solid;
  }
`;
