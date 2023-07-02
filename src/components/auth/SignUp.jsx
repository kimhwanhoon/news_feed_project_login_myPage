import { loginWithGithub, loginWithGoogle, signingUp } from 'firebaseConfig/firebaseAuth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleToggleLoginModal, handleToggleSignupModal } from 'redux/modules/loginModalToggler';
const inputOnChangeHandler = (e, setFn) => {
  setFn(e.target.value);
};

function SignUpModal() {
  const dispatch = useDispatch();
  // Redux에서 loginModalToggler 사용
  const modalClassName = useSelector((state) => {
    return state.loginModalToggler.SIGNUP_MODAL;
  });

  const isLoginSuccess = useSelector((state) => {
    return state.isLoginSuccess.loginSuccess;
  });
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  useEffect(() => {
    if (isLoginSuccess) {
      setEmailValue('');
      setPasswordValue('');
      setConfirmPasswordValue('');
    }
  }, [isLoginSuccess]);

  return (
    <section id="signup-modal" className={modalClassName}>
      <div className="modal">
        <button
          className="close-button"
          onClick={() => {
            handleToggleSignupModal(dispatch);
          }}
        >
          &times;
        </button>
        <div className="modal-h-container">
          <h1 className="modal-welcome-h1">Sign Up</h1>
          <h2 className="modal-welcome-h2">Please sign up to our website.</h2>
        </div>
        <div className="modal-input-container">
          <input
            className="input text"
            type="email"
            value={emailValue}
            onChange={(e) => inputOnChangeHandler(e, setEmailValue)}
            placeholder="you@example.com"
          />

          <input
            className="input text"
            type="password"
            value={passwordValue}
            onChange={(e) => inputOnChangeHandler(e, setPasswordValue)}
            placeholder="At least 8 characters"
          />
          <input
            className="input text"
            type="password"
            value={confirmPasswordValue}
            onChange={(e) => inputOnChangeHandler(e, setConfirmPasswordValue)}
            placeholder="Confirm password"
          />

          <input
            id="modal-signup-button"
            type="button"
            className="input modal-button"
            value="Sign Up"
            onClick={() => signingUp(dispatch, emailValue, passwordValue, confirmPasswordValue)}
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
            You already have account?{' '}
            <span
              id="modal-sign-up-suggestion"
              onClick={() => {
                handleToggleLoginModal(dispatch);
                handleToggleSignupModal(dispatch);
              }}
            >
              Sign In
            </span>
          </h3>
        </div>
      </div>
    </section>
  );
}

export default SignUpModal;
