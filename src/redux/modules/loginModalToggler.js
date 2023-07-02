// 액션 타입
const TOGGLE_MODAL_ACTION_TYPES = {
  LOGIN_MODAL: '로그인 모달',
  SIGNUP_MODAL: '회원가입 모달',
  FORGOT_PASSWORD_MODAL: '비밀번호 찾기 모달'
};
// 액션 생성자
export const toggleLoginModalClassName = () => ({
  type: TOGGLE_MODAL_ACTION_TYPES.LOGIN_MODAL
});
export const toggleSignupModalClassName = () => ({
  type: TOGGLE_MODAL_ACTION_TYPES.SIGNUP_MODAL
});
export const toggleForgotPasswordModalClassName = () => ({
  type: TOGGLE_MODAL_ACTION_TYPES.FORGOT_PASSWORD_MODAL
});

const initialState = {
  LOGIN_MODAL: 'modal-container hidden',
  SIGNUP_MODAL: 'modal-container hidden',
  FORGOT_PASSWORD_MODAL: 'modal-container small hidden'
};

// 리듀서
const loginModalToggler = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL_ACTION_TYPES.LOGIN_MODAL: {
      return {
        ...state,
        LOGIN_MODAL: state.LOGIN_MODAL === 'modal-container hidden' ? 'modal-container' : 'modal-container hidden'
      };
    }
    case TOGGLE_MODAL_ACTION_TYPES.SIGNUP_MODAL: {
      return {
        ...state,
        SIGNUP_MODAL: state.SIGNUP_MODAL === 'modal-container hidden' ? 'modal-container' : 'modal-container hidden'
      };
    }
    case TOGGLE_MODAL_ACTION_TYPES.FORGOT_PASSWORD_MODAL: {
      return {
        ...state,
        FORGOT_PASSWORD_MODAL:
          state.FORGOT_PASSWORD_MODAL === 'modal-container small hidden'
            ? 'modal-container small'
            : 'modal-container small hidden'
      };
    }
    default:
      return state;
  }
};

export default loginModalToggler;

// 모달 토글 함수
export const handleToggleLoginModal = (dispatch) => {
  dispatch(toggleLoginModalClassName());
};

export const handleToggleSignupModal = (dispatch) => {
  dispatch(toggleSignupModalClassName());
};

export const handleToggleForgotPasswordModal = (dispatch) => {
  dispatch(toggleForgotPasswordModalClassName());
};
