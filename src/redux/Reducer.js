import { SET_STATUS, SET_USER } from "./ActionType";

export const initialState = {
  user: "loading",
  allStatus: ["Student", "Company", "Admin"],
  status: false,
};
export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
