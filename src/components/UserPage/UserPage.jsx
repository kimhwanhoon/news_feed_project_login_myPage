import { uploadPhoto, useAuth } from 'firebaseConfig/firebaseAuth';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import ProfilePageDetailProfileContainer from './UserPageProfile';
import UserMyEmail from './UserMyEmail';
import UserChangePassword from './UserChangePassword';
import UserDeleteAccount from './UserDeleteAccount';

function UserPageDetail() {
  const userData = useSelector((state) => {
    return state.userData;
  });

  const menuToggler = useSelector((state) => {
    return state.profilePageMenuToggler;
  });
  // MY_EMAIL, PROFILE, CHANGE_PASSWORD
  return (
    <StyledDiv>
      {menuToggler.PROFILE && (
        <>
          <h1>My profile</h1>
          <div className="profile-detail-container">
            <ProfilePageDetailPhotoContainer userData={userData} />
            <ProfilePageDetailProfileContainer userData={userData} />
          </div>
        </>
      )}
      {menuToggler.MY_EMAIL && (
        <>
          <h1>My email</h1>
          <div className="profile-detail-container">
            <UserMyEmail />
          </div>
        </>
      )}
      {menuToggler.CHANGE_PASSWORD && (
        <>
          <h1>Change Password</h1>
          <div className="profile-detail-container">
            <UserChangePassword />
          </div>
        </>
      )}
      {menuToggler.DELETE_ACCOUNT && (
        <>
          <h1>Delete Account</h1>
          <div className="profile-detail-container">
            <UserDeleteAccount />
          </div>
        </>
      )}
    </StyledDiv>
  );
}

export default UserPageDetail;

const ProfilePageDetailPhotoContainer = ({ userData }) => {
  const [photoURLValue, setPhotoURLValue] = useState('');
  const fileInputRef = useRef(null);
  const currentUser = useAuth();
  const userInfo = useSelector((state) => {
    return state.userData;
  });
  const dispatch = useDispatch();
  // const currentUser = useAuth();
  useEffect(() => {
    if (userInfo?.photoURL) {
      setPhotoURLValue(userInfo.photoURL);
    } else {
      setPhotoURLValue('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png');
    }
  }, [userInfo]);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  //
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    // 파일을 선택하고, 업로드하기 전에 파일을 다시 선택하려고 선택 창을 띄운다음에 취소 버튼을 누르면, 기존에 있는 사진은 취소 되고, 원래 사진으로 돌린다.
    if (!file) {
      setPhotoURLValue(
        userInfo?.photoURL ?? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
      );
      return;
    }
    // 선택한 파일을 새로운 프로필에 보여주기
    const reader = new FileReader();
    reader.onload = () => {
      const uploadedPhotoURL = reader.result;
      setPhotoURLValue(uploadedPhotoURL);
    };
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      fileInputRef.current.value = null;
      return;
    }
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleClick = () => {
    uploadPhoto(photo, currentUser, setLoading, dispatch);
  };
  return (
    <div id="profile-page-detail-container">
      <div id="profile-page-detail-photo-div">
        <div>
          <img src={photoURLValue} alt="profile pic" />
        </div>
        <div id="profile-page-photo-detail-div">
          <h2>{userData?.displayName ?? userData?.user?.displayName ?? 'Username not set'}</h2>
          <p>600x600 or larger recommended</p>
          <input ref={fileInputRef} disabled={loading} type="file" onChange={(e) => handleFileChange(e)} />
          <button disabled={loading || !photo} onClick={() => handleClick()}>
            Upload new
          </button>
        </div>
      </div>
    </div>
  );
};

// style
const StyledDiv = styled.div`
  width: 100%;
  max-width: 800px;
  h1 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1.6rem;
  }
  .profile-detail-container {
    background-color: white;
    box-shadow: 1px 1px 3px 0 #abc;
  }
  #profile-page-detail-photo-div {
    display: flex;
    gap: 2rem;
    padding: 2rem 2.5rem;
  }

  #profile-page-detail-photo-div img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
  }
  #profile-page-photo-detail-div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  #profile-page-photo-detail-div h2 {
    font-size: 1.2rem;
    font-weight: 700;
  }
  #profile-page-photo-detail-div p {
    font-size: 0.9rem;
    font-weight: 600;
    color: #777;
  }
  #profile-page-photo-detail-div button {
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
    width: 120px;
    padding: 10px 10px;
    border: none;
    border-radius: 100px;
    background-color: #5196fe;
    cursor: pointer;
  }
  #profile-page-photo-detail-div button:disabled {
    background-color: white;
    border: 2px solid #ddd;
    color: #ddd;
    font-weight: normal;
  }

  //

  .profile-page-detail-container {
    padding: 0 2rem 2rem 2rem;
  }
  .profile-page-detail-container h3 {
    font-size: 1.15rem;
    font-weight: 600;
    padding-bottom: 1rem;
  }
  //
  .profile-page-detail-input-con {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
  }
  .profile-page-detail-input-con input {
    width: 50%;
  }
  .profile-page-detail-input-div {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 200px;
  }
  .profile-page-detail-input-div label {
    color: #888;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .profile-page-detail-input-div input {
    width: 100%;
    padding: 0.5rem 0.5rem;
    box-shadow: 0 0 2px 0 #aaa;
    border: none;
    outline: black;
  }
  .profile-page-detail-input-div input:focus {
    outline: black 1px solid;
  }
  //
  #profile-page-button-container {
    height: 5rem;
    display: flex;
    justify-content: flex-end;
    padding: 0 2rem 2rem;
    gap: 1rem;
  }
  #profile-page-button-container button {
    width: 100px;
    border: none;
    box-shadow: 0 0 2px 0 #aaa;
    background-color: #fff;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
  }
  #profile-page-button-container button:not([disabled]):hover {
    box-shadow: 0 0 2px 0 #aaa;
    background-color: #5196fe;
    color: white;
  }
`;
