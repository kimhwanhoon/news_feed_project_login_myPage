import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import LoginModal from './auth/Login';
import SignUpModal from './auth/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, loggedInUserCheck, useAuth } from 'firebaseConfig/firebaseAuth';
import { fetchUserData } from 'redux/modules/user';
import { handleToggleLoginModal } from 'redux/modules/loginModalToggler';
import { handleToggleHeaderMenuButton } from 'redux/modules/headerMenuToggle';
import { useNavigate } from 'react-router-dom';

function Header() {
  // store에서 userdata를 구독하여
  // 나중에 dispatch로 userdata가 변경되면 재랜더링을 되게 한다.
  const subscribedUserData = useSelector((state) => {
    return state.userData;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //유저가 로그인 되어있는지 확인하여 새로고침해도 로그아웃이 되지 않게 설정
  const currentUser = useAuth();
  useEffect(() => {
    loggedInUserCheck()
      .then((subscribedUserData) => {
        if (!subscribedUserData) {
          return;
        } else {
          dispatch(fetchUserData(subscribedUserData));
        }
      })
      .catch((error) => {
        console.log('Error fetching user:', error);
      });
  }, [dispatch]);

  return (
    <>
      <StyledHeader>
        <div id="header-left-div">
          <h1 onClick={() => navigate('/')}>{'React =>'}</h1>
          <Nav />
        </div>
        <div id="header-right-div">
          <div id="header-button-div">
            {!currentUser && (
              <img
                id="header-login-button"
                onClick={() => handleToggleLoginModal(dispatch)}
                src="https://i.ibb.co/VmK9M1R/4115234-login-sign-in-114046.png"
                alt="login"
              />
            )}
            {currentUser && (
              <img
                id="header-logout-button"
                onClick={() => logOut(dispatch)}
                src="https://i.ibb.co/QKfs48k/logout-icon-151219.png"
                alt="logout"
              />
            )}
          </div>
          <div id="header-profile-div">
            <img
              alt=""
              id="profile-image"
              src={
                // subscribedUserData.~ : loggedInUserCheck()에서 가져온 userData
                // subscribedUserData.profile.picture: Google
                // subscribedUserData.profile.avatar_url: Github
                // 맨 처음 로드시 아무런 정보가 없기 때문에 옵셔널 체이닝(?.)을 사용하여 에러를 예방
                subscribedUserData?.user?.photoURL ??
                subscribedUserData?.photoURL ??
                subscribedUserData?.profile?.picture ??
                subscribedUserData?.profile?.avatar_url ??
                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
              }
              onClick={() => handleToggleHeaderMenuButton(dispatch)}
            />
            <div id="header-profile-username-container" onClick={() => handleToggleHeaderMenuButton(dispatch)}>
              <p id="header-profile-username-p">
                {
                  // subscribedUserData.~ : loggedInUserCheck()에서 가져온 userData
                  // subscribedUserData.user: Google
                  // subscribedUserData.profile: Github
                  // 맨 처음 로드시 아무런 정보가 없기 때문에 옵셔널 체이닝(?.)을 사용하여 에러를 예방
                  subscribedUserData?.displayName ??
                    subscribedUserData?.email ??
                    subscribedUserData?.user?.displayName ??
                    subscribedUserData?.profile?.name ??
                    subscribedUserData?.profile?.email ??
                    subscribedUserData?.user?.email ??
                    'Not signed in'
                }
              </p>
              <img
                id=""
                src="https://i.ibb.co/XCyzThz/arrow-down.png"
                alt="header menu"
                className="header-profile-menu-button"
              />
            </div>
          </div>
        </div>
        <UserOptions />
      </StyledHeader>
      <LoginModal />
      <SignUpModal />
    </>
  );
}

export default Header;

const UserOptions = () => {
  const currentUser = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Redux에서 loginAndLogoutButtonToggler 사용
  const headerMenuButtonClassName = useSelector((state) => {
    return state.HeaderMenuButtonToggler.HeaderMenuToggle;
  });
  return (
    <div id="header-user-info-options-container" className={headerMenuButtonClassName}>
      {currentUser && (
        <>
          <div
            className="header-user-info-option"
            onClick={() => {
              handleToggleHeaderMenuButton(dispatch);
              navigate(`/profile-page/user/${currentUser?.uid}`);
            }}
          >
            유저 정보
          </div>
          <div
            className="header-user-info-option"
            onClick={() => {
              handleToggleHeaderMenuButton(dispatch);
              logOut(dispatch);
            }}
          >
            로그아웃
          </div>
        </>
      )}
      {!currentUser && (
        <div
          className="header-user-info-option"
          onClick={() => {
            handleToggleHeaderMenuButton(dispatch);
            handleToggleLoginModal(dispatch);
          }}
        >
          로그인
        </div>
      )}
    </div>
  );
};

const Nav = () => {
  const currentUser = useAuth();
  return (
    <nav>
      <a id="nav-home" href="/">
        Home
      </a>
      <a id="nav-write" href="/">
        Write
      </a>
      <a id="nav-profile" href={`/profile-page/user/${currentUser?.uid}`}>
        Profile
      </a>
    </nav>
  );
};

const StyledHeader = styled.header`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 4px 0 #999;
  #header-right-div {
    display: flex;
    gap: 1rem;
  }
  #header-profile-div {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-right: 2rem;
  }
  #profile-image {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-bottom: 0.25rem;
    cursor: pointer;
  }
  h1 {
    margin-left: 2rem;
    font-size: 2rem;
    font-weight: 600;
    color: #5196fe;
    cursor: pointer;
  }
  #header-button-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #header-button-div img {
    cursor: pointer;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
    width: 32px;
    margin-right: 1rem;
  }
  #header-button-div img:hover {
    transform: scale(1.05);
  }

  #header-profile-username-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    opacity: 0.7;
  }
  #header-profile-username-container:hover {
    opacity: 1;
    transition: 0.3s ease-in-out;
  }
  .header-profile-menu-button {
    width: 16px;
  }

  #header-left-div {
    display: flex;
    gap: 5rem;
    align-items: center;
  }
  nav {
    display: flex;
    gap: 2.5rem;
  }
  nav a {
    font-size: 0.9rem;
    font-weight: 600;
    color: #aaa;
    letter-spacing: 0.25px;
    text-shadow: 0.25px 0.25px 2px #ddd;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.25s;
  }
  #nav-home {
    color: #5196fe;
  }
  nav a:hover {
    color: #222;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.25s;
  }

  #header-user-info-options-container {
    position: absolute;
    right: 2rem;
    top: 60px;
    border-radius: 10px;
    box-shadow: 1px 1px 3px 1px #777;
    border: 1px solid transparent;
    background-color: #fff;
  }
  .header-user-info-option {
    padding: 0.75rem 1.25rem;
    background-color: white;
    border-radius: 10px;
    cursor: pointer;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
  }
  .header-user-info-option:hover {
    background-color: #5196fe;
    color: white;
  }
`;
