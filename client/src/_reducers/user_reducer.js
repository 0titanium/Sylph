// login, register
import {
  SIGNIN_USER,
  SIGNUP_USER,
  AUTH_USER,
  SIGNOUT_USER,
} from "../_actions/types";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SIGNIN_USER:
      return { ...state, signinSuccess: action.payload, x_auth: action.payload, user_id: action.payload };
    case SIGNUP_USER:
      return { ...state, signup: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case SIGNOUT_USER:
      return { ...state, signoutSuccess: action.payload };
    default:
      return state;
  }
}
