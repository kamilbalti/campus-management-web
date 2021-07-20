import { SET_SIGNIN_STATUS, SET_STATUS, SET_USER, SET_USERDETAIL } from "./ActionType";

export const setUser = (payload) => ({
  type: SET_USER,
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
