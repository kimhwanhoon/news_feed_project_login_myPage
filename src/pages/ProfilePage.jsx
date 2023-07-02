import Header from 'components/Header';
import UserPageDetail from 'components/UserPage/UserPage';
import UserPageMenu from 'components/UserPage/UserPageMenu';
import { useAuth } from 'firebaseConfig/firebaseAuth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function ProfilePage() {
  const currentUser = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 처음 로딩시에 currentUser가 로그인이 되어있음에도 undefined를 배출한다.
    // 로그인이 안 되어있다면 currentUser는 null인것 같다.
    if (!currentUser && currentUser !== undefined) {
      alert('잘못된 접근입니다.\n로그인을 해주세요.');
      navigate('/');
    }
  }, [navigate, currentUser]);

  return (
    <>
      <Header />
      <StyledDiv>
        <div id="profile-page-title-div">
          <h1>Settings</h1>
          <div id="profile-page-divider"></div>
        </div>
        <div id="profile-page-component-container">
          <UserPageMenu />
          <UserPageDetail />
        </div>
      </StyledDiv>
    </>
  );
}

export default ProfilePage;

const StyledDiv = styled.div`
  background-color: #f0f0f0;
  height: calc(100vh - 80px);
  padding: 5rem 10%;
  #profile-page-title-div {
  }
  #profile-page-title-div h1 {
    font-size: 2.5rem;
    font-weight: 800;
  }
  #profile-page-divider {
    width: 100%;
    border-bottom: 2px #ddd solid;
    margin: 2rem 0;
  }
  #profile-page-component-container {
    display: flex;
    gap: 2rem;
    justify-content: center;
  }
`;
