// 액션 타입
const TOGGLE_USER_PAGE_INPUT_ACTION_TYPES = {
  TOGGLE: 'disabled를 true나 false로 바꾼다.'
};
// 액션 생성자
export const toggleUserPageInputDisabled = () => ({
  type: TOGGLE_USER_PAGE_INPUT_ACTION_TYPES.TOGGLE
});

// 리듀서
const initialState = {
  TOGGLE: true
};

const userPageInputToggler = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_USER_PAGE_INPUT_ACTION_TYPES.TOGGLE: {
      return {
        ...state,
        TOGGLE: !state.TOGGLE
      };
    }
    default:
      return state;
  }
};

export default userPageInputToggler;

// 모달 토글 함수
export const handleToggleUserPageInput = (dispatch) => {
  dispatch(toggleUserPageInputDisabled());
};
