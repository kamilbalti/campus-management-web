import { SET_SIGNIN_STATUS, SET_STATUS, SET_USER, SET_USERDETAIL, SET_USER_ARR } from "./ActionType";

export const initialState = {
  user: "loading",
  allStatus: ["Student", "Company", "Admin"],
  status: false,
  userDetail: [],
  signInStatus: false,
  userArr: [],
};
export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_USER_ARR:
      return {
        ...state,
        userArr: action.payload,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SET_SIGNIN_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SET_USERDETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
