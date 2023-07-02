import { loginWithEmailPassword, loginWithGithub, loginWithGoogle } from 'firebaseConfig/firebaseAuth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ForgotPassword from './ForgotPassword';
import {
  handleToggleForgotPasswordModal,
  handleToggleLoginModal,
  handleToggleSignupModal
} from 'redux/modules/loginModalToggler';

const inputOnChangeHandler = (e, setFn) => {
  setFn(e.target.value);
};

function LoginModal() {
  //
  const dispatch = useDispatch();
  // Redux에서 loginModalToggler 사용
  const modalClassName = useSelector((state) => {
    return state.loginModalToggler.LOGIN_MODAL;
  });
  //
  const isLoginSuccess = useSelector((state) => {
    return state.isLoginSuccess.loginSuccess;
  });
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  useEffect(() => {
    if (isLoginSuccess) {
      setEmailValue('');
      setPasswordValue('');
    }
  }, [isLoginSuccess]);

  return (
    <>
      <section id="login-modal" className={modalClassName}>
        <div className="modal">
          <button
            className="close-button"
            onClick={() => {
              handleToggleLoginModal(dispatch);
            }}
          >
            &times;
          </button>
          <div className="modal-h-container">
            <h1 className="modal-welcome-h1">Welcome back!</h1>
            <h2 className="modal-welcome-h2">Please log in.</h2>
          </div>
          <div className="modal-input-container">
            <input
              className="input text"
              id="modal-login-email-input"
              type="email"
              value={emailValue}
              onChange={(e) => inputOnChangeHandler(e, setEmailValue)}
              placeholder="you@example.com"
            />
            <input
              className="input text"
              id="modal-login-password-input"
              type="password"
              value={passwordValue}
              onChange={(e) => inputOnChangeHandler(e, setPasswordValue)}
              placeholder="Password"
            />
            <span id="forgot-password" onClick={() => handleToggleForgotPasswordModal(dispatch)}>
              Forgot password?
            </span>
            <input
              id="modal-login-button"
              type="button"
              className="input modal-button"
              value="Login"
              onClick={() => loginWithEmailPassword(emailValue, passwordValue, dispatch)}
            />
          </div>
          <div className="modal-divider">
            <div></div>
            <span>or sign in with</span>
            <div></div>
          </div>
          <div className="modal-social-icon-container">
            <button onClick={(e) => loginWithGoogle(dispatch, e)}>
              <img src="img/Google.png" alt="Google icon" />
              Google
            </button>
            <button onClick={(e) => loginWithGithub(dispatch, e)}>
              <img src="img/github.png" alt="github icon" />
              Github
            </button>
          </div>
          <div className="modal-last-suggestion-container">
            <h3 id="modal-last-text">
              Don't you have an account?{' '}
              <span
                id="modal-sign-up-suggestion"
                onClick={() => {
                  handleToggleLoginModal(dispatch);
                  handleToggleSignupModal(dispatch);
                }}
              >
                Sign Up
              </span>
            </h3>
          </div>
        </div>
      </section>
      <ForgotPassword />
    </>
  );
}

export default LoginModal;
