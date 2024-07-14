import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <h3>Home page</h3>
      <Outlet />
    </>
  );
}
