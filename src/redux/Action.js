import {
  SET_SIGNIN_STATUS,
  SET_STATUS,
  SET_USER,
  SET_USERDETAIL,
  SET_USER_ARR,
  PUSH_DATA,
  SET_CHECk,
  SET_CHECK_EDIT,
  SET_DEL,
  SET_EDIT,
  SET_INPUTVAL,
  SET_RESULT,
  SET_UPDATE,
  SET_CHECK,
  SET_ALL_JOBS,
} from "./ActionType";

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setUserArr = (payload) => ({
  type: SET_USER_ARR,
  payload,
});

export const setStatus = (payload) => ({
  type: SET_STATUS,
  payload,
});

export const setSignInStatus = (payload) => ({
  type: SET_SIGNIN_STATUS,
  payload,
});

export const setUserDetail = (payload) => ({
  type: SET_USERDETAIL,
  payload,
});

export const setResult = (payload) => ({
  type: SET_RESULT,
  payload,
});

export const setAllJobs = (payload) => ({
  type: SET_ALL_JOBS,
  payload,
});

export const setInputVal = (payload) => ({
  type: SET_INPUTVAL,
  payload: payload,
});
export const setCheckEdit = (payload) => ({
  type: SET_CHECK_EDIT,
  payload,
});

export const setDel = (payload) => ({
  type: SET_DEL,
  payload,
});
export const pushData = (payload) => ({
  type: PUSH_DATA,
  payload,
});
export const edit = (payload) => ({
  type: SET_EDIT,
  payload,
});
export const update = (payload) => ({
  type: SET_UPDATE,
  payload,
});

export const setCheck = (payload) => ({
  type: SET_CHECK,
  payload,
});
