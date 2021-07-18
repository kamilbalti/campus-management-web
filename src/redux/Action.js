import { SET_STATUS, SET_USER } from "./ActionType";

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setStatus = (payload) => ({
  type: SET_STATUS,
  payload,
});
