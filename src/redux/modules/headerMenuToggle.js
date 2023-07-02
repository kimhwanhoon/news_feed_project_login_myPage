// 액션 타입
const TOGGLE_HEADER_MUNU_ACTION_TYPES = {
  HEADER_MENU_TOGGLE: 'header 우측 메뉴 토글'
};
// 액션 생성자
export const toggleHeaderMenuButtonClassName = () => ({
  type: TOGGLE_HEADER_MUNU_ACTION_TYPES.HEADER_MENU_TOGGLE
});

// 리듀서
const initialState = {
  HeaderMenuToggle: 'hidden'
};

const HeaderMenuButtonToggler = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_HEADER_MUNU_ACTION_TYPES.HEADER_MENU_TOGGLE: {
      return {
        ...state,
        HeaderMenuToggle: state.HeaderMenuToggle === '' ? 'hidden' : ''
      };
    }
    default:
      return state;
  }
};

export default HeaderMenuButtonToggler;

// 모달 토글 함수
export const handleToggleHeaderMenuButton = (dispatch) => {
  dispatch(toggleHeaderMenuButtonClassName());
};
