import { createStore } from 'redux';
import { combineReducers } from 'redux';
import isResetMailSent from 'redux/modules/forgotMailSent';
import HeaderMenuButtonToggler from 'redux/modules/headerMenuToggle';
import isLoginSuccess from 'redux/modules/isLoginSuccess';
import loginModalToggler from 'redux/modules/loginModalToggler';
import profilePageMenuToggler from 'redux/modules/profilePageMenuToggler';
import userData from 'redux/modules/user';
import userPageInputToggler from 'redux/modules/userPageInputToggler';
const rootReducer = combineReducers({
  // reducer 들을 여기에 적는다.
  userData,
  isLoginSuccess,
  isResetMailSent,
  loginModalToggler,
  HeaderMenuButtonToggler,
  userPageInputToggler,
  profilePageMenuToggler
});
const store = createStore(rootReducer);

export default store;
