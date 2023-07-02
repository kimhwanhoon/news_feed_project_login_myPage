import { changePassword, useAuth } from 'firebaseConfig/firebaseAuth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';

function UserChangePassword() {
  const currentUser = useAuth();
  //
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  return (
    <StyledDiv>
      <div className="profile-detail-container">
        <div className="profile-page-detail-container">
          <h3 className="profile-detail-my-email-subtitle">Update new password</h3>
          {currentUser?.providerData[0].providerId === 'password' ? (
            <>
              <div className="profile-page-detail-input-con">
                <div className="profile-page-detail-input-div">
                  <label htmlFor="email">New password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="profile-page-detail-input-div">
                  <label htmlFor="email">Confirm password</label>
                  <input
                    type="password"
                    name="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button onClick={() => changePassword(password, confirmPassword, dispatch)}>Change password</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>Social login doesn't require password.</p>
              <p>Only login with email with password is available.</p>
            </>
          )}
        </div>
      </div>
    </StyledDiv>
  );
}

export default UserChangePassword;

// style
const StyledDiv = styled.div`
  .profile-detail-my-email-subtitle {
    padding-top: 3rem;
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
    color: #444;
  }
`;
