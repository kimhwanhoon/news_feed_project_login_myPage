import {
  fetchUserPageInfo,
  sendVerificationMailToPrimaryEmail,
  useAuth,
  userPrimaryEmailUpdate,
  userSecondaryEmailUpdate
} from 'firebaseConfig/firebaseAuth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';

function UserMyEmail() {
  const currentUser = useAuth();
  const dispatch = useDispatch();
  const [CombinedUserData, setCombinedUserData] = useState(null);
  // fetch user data from fireStore
  useEffect(() => {
    if (currentUser) {
      fetchUserPageInfo(currentUser, setCombinedUserData);
    }
  }, [currentUser]);
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [isPrimaryMailDisabled, setIsPrimaryMailDisabled] = useState(true);
  const [isSecondaryMailDisabled, setIsSecondaryMailDisabled] = useState(true);
  useEffect(() => {
    setPrimaryEmail(currentUser?.email);
    setSecondaryEmail(CombinedUserData?.secondaryEmail ?? '');
  }, [currentUser, CombinedUserData]);
  return (
    <StyledDiv>
      <div className="profile-detail-container">
        <div className="profile-page-detail-container">
          <h3 className="profile-detail-my-email-subtitle">Personal details</h3>
          <div className="profile-page-detail-input-con">
            <div className="profile-page-detail-input-div">
              <p onClick={() => setIsPrimaryMailDisabled(!isPrimaryMailDisabled)}>Edit</p>
              <label htmlFor="email">Primary Email</label>
              <input
                type="text"
                name="email"
                value={primaryEmail}
                onChange={(e) => setPrimaryEmail(e.target.value)}
                disabled={isPrimaryMailDisabled}
              />
              <button
                onClick={() =>
                  userPrimaryEmailUpdate(
                    primaryEmail,
                    currentUser,
                    setIsPrimaryMailDisabled,
                    isPrimaryMailDisabled,
                    dispatch
                  )
                }
              >
                Change primary email
              </button>
            </div>
            <div className="profile-page-detail-input-div">
              <p onClick={() => setIsSecondaryMailDisabled(!isSecondaryMailDisabled)}>Edit</p>
              <label htmlFor="email">Secondary Email</label>
              <input
                type="text"
                name="email"
                value={secondaryEmail}
                onChange={(e) => setSecondaryEmail(e.target.value)}
                disabled={isSecondaryMailDisabled}
              />
              <button
                onClick={() =>
                  userSecondaryEmailUpdate(secondaryEmail, setIsSecondaryMailDisabled, isSecondaryMailDisabled)
                }
              >
                Change Secondary email
              </button>
            </div>
          </div>
          <div>
            <h3 className="profile-detail-my-email-subtitle">Verify primary email</h3>
            {currentUser?.emailVerified ? (
              <p>Your primary email is already verified.</p>
            ) : (
              <>
                <p>Your primary email address is not verified.</p>
                <button id="user-page-verify-email-button" onClick={sendVerificationMailToPrimaryEmail}>
                  Verify email
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </StyledDiv>
  );
}

export default UserMyEmail;

// style
const StyledDiv = styled.div`
  .profile-detail-my-email-subtitle {
    padding-top: 3rem;
  }
  .profile-page-detail-input-div {
    position: relative;
  }
  .profile-page-detail-input-div p {
    position: absolute;
    right: 5px;
    top: 2px;
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.9rem;
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
`;
