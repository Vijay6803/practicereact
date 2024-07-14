import { redirect } from "react-router-dom";
import { isAuth } from "./authloader";

export function guestLoader() {
  const auth = isAuth();
  if (auth) {
    return redirect("/");
  } else {
    return null;
  }
}
