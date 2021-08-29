import {
  SET_CHECK,
  SET_RESULT,
  SET_SIGNIN_STATUS,
  SET_STATUS,
  SET_USER,
  SET_USERDETAIL,
  SET_USER_ARR,
  PUSH_DATA,
  SET_CHECK_EDIT,
  SET_DEL,
  SET_EDIT,
  SET_INPUTVAL,
  SET_UPDATE,
  SET_ALL_JOBS,
} from "./ActionType";

export const initialState = {
  user: "loading",
  allStatus: ["Student", "Company", "Admin"],
  status: false,
  userDetail: [],
  signInStatus: false,
  userArr: [],
  check: false,
  result: [],
  inputVal: "",
  result: "loading",
  checkEdit: false,
  allJobs: [],
};
export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_ALL_JOBS:
      return {
        ...state,
        allJobs: action.payload,
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
    case SET_CHECK:
      return {
        ...state,
        check: action.payload,
      };
    case SET_RESULT:
      return {
        ...state,
        result: action.payload,
      };
    case SET_CHECK_EDIT:
      return {
        ...state,
        checkEdit: action.payload,
      };
    case SET_INPUTVAL:
      return {
        ...state,
        inputVal: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_CHECK:
      return {
        ...state,
        check: action.payload,
      };
    case SET_RESULT:
      return {
        ...state,
        result: action?.payload,
      };
    case SET_EDIT:
      let tempResult = state?.result.filter(
        (item, index) => item.userId === state?.user?.uid
      );
      // let tempResult4 = state?.result.filter((item, index) => item.userId !== state?.user?.uid)
      // console.log(tempResult, "temp")
      return {
        ...state,
        inputVal: tempResult[action.payload]?.inputVal,
        checkEdit: action.payload,
      };
    case SET_UPDATE:
      let tempResult2 = state?.result.filter(
        (item, index) => item.userId === state?.user?.uid
      );
      let tempArr3 = [...tempResult2];
      tempArr3[state.checkEdit] = action.payload;
      return {
        ...state,
        result: tempArr3,
        inputVal: "",
        checkEdit: false,
      };
    case PUSH_DATA:
      let tempArr = Array.isArray(state.result) ? [...state.result] : [];
      tempArr.push(action.payload);
      return {
        ...state,
        result: tempArr,
      };
    case SET_DEL:
      let tempResult4 = state?.result.filter(
        (item, index) => item.userId !== state?.user?.uid
      );
      let tempResult3 = state?.result.filter(
        (item, index) => item.userId === state?.user?.uid
      );
      let tempArr2 = [...tempResult3];
      tempArr2 = tempArr2.filter((item, index) => index !== action.payload);
      let temp = tempArr2.concat(tempResult4);
      return {
        ...state,
        result: temp,
      };
    default:
      return {
        ...state,
      };
  }
}
