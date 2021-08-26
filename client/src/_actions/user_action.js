import { SIGNIN_USER, SIGNUP_USER, AUTH_USER, SIGNOUT_USER } from "./types";
import { USER_SERVER } from "../Config";

export function signinUser(dataToSubmit) {
  const request = fetch(`${USER_SERVER}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ dataToSubmit }),
  }).then((response) => response.json());
  console.log(request);
  return {
    type: SIGNIN_USER,
    payload: request,
  };
}

export function signupUser(dataToSubmit) {
  const request = fetch(`${USER_SERVER}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ dataToSubmit }),
  }).then((response) => response.json());

  return {
    type: SIGNUP_USER,
    payload: request,
  };
}

export function auth() {
  const request = fetch(`${USER_SERVER}/auth`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    credentials: "include",
  }).then((response) => response.json());

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function signoutUser() {
  const request = fetch(`${USER_SERVER}/signout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    credentials: "include",
  }).then((response) => response.json());

  return {
    type: SIGNOUT_USER,
    payload: request,
  };
}
