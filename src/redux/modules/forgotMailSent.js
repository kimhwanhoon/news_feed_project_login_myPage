const initialState = {
  forgotPasswordResetMailSent: false
};

const FORGOT_PASSWORD_ACTION_TYPE = {
  FORGOT_MAIL_SENT: '비밀번호 재설정 메일 보내기'
};

export const sentMailSucess = () => {
  return {
    type: FORGOT_PASSWORD_ACTION_TYPE.FORGOT_MAIL_SENT
  };
};

const isResetMailSent = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case FORGOT_PASSWORD_ACTION_TYPE.FORGOT_MAIL_SENT: {
      return {
        ...state,
        forgotPasswordResetMailSent: true
      };
    }
  }
};
export default isResetMailSent;
