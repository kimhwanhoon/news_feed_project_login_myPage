import { initializeApp } from 'firebase/app';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAdditionalUserInfo,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile
} from 'firebase/auth';
import { sentMailSucess } from 'redux/modules/forgotMailSent';
import { loginSucess, logoutSucess } from 'redux/modules/isLoginSuccess';

import {
  handleToggleForgotPasswordModal,
  handleToggleLoginModal,
  handleToggleSignupModal
} from 'redux/modules/loginModalToggler';
import {
  handleUserLogout,
  saveUserDataWithEmail,
  saveUserDataWithSocial,
  signupUserDataUpdate,
  userInfoUpdateHandler,
  userProfileUpdateHandler
} from 'redux/modules/user';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Create a root reference
const storage = getStorage();
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// email과 password로 로그인
export const loginWithEmailPassword = async (email, password, dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // dispatch로 store에 유저정보 업데이트하기
    dispatch(saveUserDataWithEmail(userCredential));
    dispatch(loginSucess());
    // 로그인 성공 후 모달 닫기
    handleToggleLoginModal(dispatch);

    // 유저의 닉네임이 없으면 이메일로 환영 인사 내보내기
    alert(`Welcome, ${userCredential.user.displayName ?? userCredential.user.email}!`);
    // 에러 핸들링
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      alert(`잘못된 비밀번호입니다.`);
    } else if (error.code === 'auth/invalid-email') {
      alert(`이메일을 다시 확인해주세요.`);
    } else if (error.code === 'auth/user-not-found') {
      alert(`해당 계정이 존재하지 않습니다. 다시 확인해주세요.`);
    } else if (error.code === 'auth/missing-password') {
      alert(`비밀번호가 비어있습니다. 다시 입력해주세요.`);
    }
  }
};

// Google로 로그인
export const loginWithGoogle = (dispatch, e) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const additionalUserInfo = getAdditionalUserInfo(result);
      // dispatch로 store에 유저정보 업데이트하기
      dispatch(saveUserDataWithSocial(additionalUserInfo));
      socialLoginGreetingUser(additionalUserInfo);
      // 로그인 성공 후 모달 닫기, 로그인모달에서 로그인했으면 로그인 모달을 없애고, 회원가입모달에서 로그인 했으면 회원가입 모달을 없애기
      if (e.target.parentNode.parentNode.parentNode.id === 'login-modal') {
        handleToggleLoginModal(dispatch);
      } else {
        handleToggleSignupModal(dispatch);
      }
    })
    .catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
      const errorDetail = [
        { 'error code': error.code },
        { 'error message': error.message },
        { email: error.customData.email },
        { credential: credential }
      ];
      console.log(errorDetail);
    });
};

// Github로 로그인
export const loginWithGithub = (dispatch, e) => {
  const auth = getAuth();
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const additionalUserInfo = getAdditionalUserInfo(result);
      // dispatch로 store에 유저정보 업데이트하기
      dispatch(saveUserDataWithSocial(additionalUserInfo));
      socialLoginGreetingUser(additionalUserInfo);
      // 로그인 성공 후 모달 닫기, 로그인모달에서 로그인했으면 로그인 모달을 없애고, 회원가입모달에서 로그인 했으면 회원가입 모달을 없애기
      if (e.target.parentNode.parentNode.parentNode.id === 'login-modal') {
        handleToggleLoginModal(dispatch);
      } else {
        handleToggleSignupModal(dispatch);
      }
    })
    .catch((error) => {
      const credential = GithubAuthProvider.credentialFromError(error);
      const errorDetail = [
        { 'error code': error.code },
        { 'error message': error.message },
        { email: error.customData.email },
        { credential: credential }
      ];
      console.log(errorDetail);
    });
};

// 로그아웃
export const logOut = (dispatch) => {
  signOut(auth)
    .then(() => {
      handleUserLogout(dispatch);
      dispatch(logoutSucess());
      alert('안전하게 로그아웃되었습니다.');
    })
    .catch((error) => {
      console.log(error);
    });
};

// Home에서 사용자가 로그인 했는지 확인하기
export const loggedInUserCheck = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          resolve(user);
        } else {
          // user is signed out.
          resolve(null);
        }
      },
      (error) => {
        reject('로그아웃 에러 발생', error);
      }
    );
  });
};

// 회원가입하기
export const signingUp = (dispatch, email, password, confirmPassword) => {
  if (email === '') {
    alert('이메일 주소를 입력해주세요.');
    return;
  }
  if (password !== confirmPassword) {
    alert('비밀번호가 다릅니다. 다시 확인해주세요.');
    return;
  }
  if (password.length < 8) {
    alert('비밀번호는 8자리 이상으로 만들어주세요.');
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch(signupUserDataUpdate(user));
      dispatch(loginSucess());
      alert(`회원가입 완료!\n환영합니다. ${user.email}`);
      // 회원가입후 모달 닫기
      handleToggleSignupModal(dispatch);
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-email') {
        alert(`메일 주소를 다시 확인해주세요.`);
        return;
      }
      if (error.code === 'auth/email-already-in-use') {
        alert(`이미 가입되어있는 메일입니다.`);
        return;
      }
      if (error.code === 'auth/weak-password') {
        alert(`비밀번호가 너무 약합니다. 더 강력한 비밀번호를 사용해주세요.`);
        return;
      }
      const errorDetails = [error.code, error.message];
      console.log(errorDetails);
    });
};

// Social 로그인 성공 시 환영 메세지 보내기
const socialLoginGreetingUser = (additionalUserInfo) => {
  if (additionalUserInfo.isNewUser) {
    alert(`Thank you for joining us, ${additionalUserInfo.profile.name ?? additionalUserInfo.profile.email}!`);
  } else {
    alert(`Welcome back, ${additionalUserInfo.profile.name ?? additionalUserInfo.profile.email}!`);
  }
};

// Forgot password => 비밀번호 재설정 이메일 보내기
export const sendResetPasswordMail = (email, dispatch) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('이메일 발송완료!\n이메일 수신함을 확인해주세요.');
      dispatch(sentMailSucess());
      // 비밀번호 찾기 모달 닫기
      handleToggleForgotPasswordModal(dispatch);
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        alert(`등록된 계정이 아닙니다.`);
        return;
      }
      if (error.code === 'auth/missing-email') {
        alert(`이메일 주소를 입력해주세요.`);
        return;
      }
      const errorDetail = [error.code, error.message];
      console.log(errorDetail);
    });
};

// 유저 정보 업데이트

export const userInfoUpdate = async (
  displayNameValue,
  firstNameValue,
  lastNameValue,
  addressValue,
  zipcodeValue,
  cityValue,
  phoneNumberValue,
  dispatch,
  toggleUserPageInputDisabled
) => {
  updateProfile(auth.currentUser, {
    displayName: displayNameValue
  })
    .then(() => {
      alert('Profile updated!');
      dispatch(toggleUserPageInputDisabled());
    })
    .catch((error) => {
      console.log('error', error);
    });

  const otherInfo = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    address: addressValue,
    zipCode: zipcodeValue,
    city: cityValue,
    phoneNumber: phoneNumberValue
  };
  const infoRef = doc(db, 'profile', auth.currentUser.uid);
  await setDoc(infoRef, otherInfo, { merge: true });
  userInfoUpdateHandler(dispatch, displayNameValue);
};

// Custom Hook
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
};

// Storage
export const uploadPhoto = async (photo, currentUser, setLoading, dispatch) => {
  const fileRef = ref(storage, `profile/${currentUser.uid}.image}`);
  setLoading(true);
  await uploadBytes(fileRef, photo);

  const photoURL = await getDownloadURL(fileRef);

  await updateProfile(currentUser, { photoURL });

  setLoading(false);
  userProfileUpdateHandler(dispatch, photoURL);
  alert('Uploaded file!');
};

// fetch user detail
export const fetchUserPageInfo = async (currentUser, setCombinedUserData) => {
  const uid = currentUser.uid;
  const userInfoRef = doc(db, 'profile', uid);
  const docSnap = await getDoc(userInfoRef);

  if (docSnap.exists()) {
    setCombinedUserData(docSnap.data());
  }
};

//유저 Secondary 이메일 정보 업데이트
export const userSecondaryEmailUpdate = async (secondaryEmail, setIsSecondaryMailDisabled, isSecondaryMailDisabled) => {
  try {
    const otherInfo = {
      secondaryEmail
    };
    const infoRef = doc(db, 'profile', auth.currentUser.uid);
    await setDoc(infoRef, otherInfo, { merge: true });
    alert('성공적으로 등록했습니다.');
    setIsSecondaryMailDisabled(!isSecondaryMailDisabled);
  } catch (error) {
    console.log(error);
  }
};

//유저 Primary 이메일 정보 업데이트
export const userPrimaryEmailUpdate = async (
  primaryEmail,
  currentUser,
  setIsPrimaryMailDisabled,
  isPrimaryMailDisabled,
  dispatch
) => {
  if (primaryEmail === currentUser.email) {
    alert('기존의 이메일과 같습니다.');
    return;
  }
  updateEmail(auth.currentUser, primaryEmail)
    .then(() => {
      // Email updated!
      alert('성공적으로 등록했습니다.');
      setIsPrimaryMailDisabled(!isPrimaryMailDisabled);
    })
    .catch((error) => {
      // An error occurred
      console.log(error);
      if (error.code === 'auth/requires-recent-login') {
        alert('로그아웃 후, 다시 로그인 한 후 작업을 이어가 주세요.\n로그아웃 됩니다.');
        handleUserLogout(dispatch);
        auth.signOut();
      }
      if (error.code === 'auth/invalid-email') {
        alert('이메일 형식을 다시 확인해주세요.');
      }
    });
};

// 유저의 primary 이메일 인증 메일 보내기

export const sendVerificationMailToPrimaryEmail = () => {
  sendEmailVerification(auth.currentUser).then(() => {
    // Email verification sent!
    alert('인증메일이 발송되었습니다.\n메일 수신함을 확인해주세요.');
  });
};

// 비밀번호 변경하기
export const changePassword = (password, confirmPassword, dispatch) => {
  if (password !== confirmPassword) {
    alert('비밀번호가 다릅니다. 다시 입력해주세요.');
    return;
  }
  if (password.length < 8) {
    alert('비밀번호는 8자리 이상의 강력한 비밀번호를 사용해주세요.');
    return;
  }

  const user = auth.currentUser;

  updatePassword(user, password)
    .then(() => {
      alert('비밀번호가 성공적으로 업데이트되었습니다.\n로그아웃 후 다시 접속해주세요.');
      handleUserLogout(dispatch);
      auth.signOut();
    })
    .catch((err) => {
      if (err.code === 'auth/requires-recent-login') {
        alert('로그아웃 후 다시 시도해주세요.\n현재 계정은 로그아웃됩니다.');
        handleUserLogout(dispatch);
        auth.signOut();
      }
      console.log(err);
    });
};

// 유저 계정 삭제

export const deleteUserAccount = (checkbox, dispatch) => {
  if (checkbox.current.checked) {
    const answer = prompt('To confirm, type "DELETE".\n(case sensitive)');
    if (answer === 'DELETE') {
      const user = auth.currentUser;
      deleteUser(user)
        .then(() => {
          alert('사용자 계정이 삭제되었습니다.');
          handleUserLogout(dispatch);
        })
        .catch((err) => {
          if (err.code === 'auth/requires-recent-login') {
            alert('로그아웃 후 다시 시도해 주십시오\n계정이 로그아웃 됩니다.');
            handleUserLogout(dispatch);
            auth.signOut();
          }
          console.log(err);
        });
    } else {
      alert('취소되었습니다.');
    }
  } else {
    alert('Please confirm to delete by clicking checkbox.');
  }
};
