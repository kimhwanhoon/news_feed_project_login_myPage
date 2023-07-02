import { sendResetPasswordMail } from 'firebaseConfig/firebaseAuth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleToggleForgotPasswordModal } from 'redux/modules/loginModalToggler';

function ForgotPassword() {
  const isPasswordResetMailSent = useSelector((state) => {
    return state.isResetMailSent.forgotPasswordResetMailSent;
  });
  const [emailAddress, setEmailAddress] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (isPasswordResetMailSent) {
      setEmailAddress('');
    }
  }, [isPasswordResetMailSent]);
  // Redux에서 loginModalToggler 사용
  const modalClassName = useSelector((state) => {
    return state.loginModalToggler.FORGOT_PASSWORD_MODAL;
  });
  return (
    <section id="forgot-password-modal" className={modalClassName}>
      <div className="modal">
        <button className="close-button" onClick={() => handleToggleForgotPasswordModal(dispatch)}>
          &times;
        </button>
        <div className="modal-h-container">
          <h1 className="modal-welcome-h1">Forgot Password?</h1>
          <h2 className="modal-welcome-h2">Please write your registered email.</h2>
        </div>
        <div className="modal-input-container">
          <input
            className="input text"
            id="modal-forgot-password-email-input"
            type="email"
            placeholder="Your registered mail"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <input
            id="modal-forgot-password-send-link-button"
            type="button"
            className="input modal-button"
            value="Send Link"
            onClick={() => sendResetPasswordMail(emailAddress, dispatch)}
          />
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
