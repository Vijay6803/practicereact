import { Navigate, redirect } from "react-router-dom";

export function isAuth() {
  const user = localStorage.getItem("user");
  const auth = user ? true : false;
  return auth;
}

export function authLoader() {
  console.log("in auth loader");

  const auth = isAuth();
  console.log(auth);
  if (!auth) {
    return redirect("/register");
  } else {
    return null;
  }
}
