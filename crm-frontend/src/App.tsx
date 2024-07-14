import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RegisterForm from "./pages/Register";
import LoginForm from "./pages/Login";
import RootLayout from "./pages/Home";
import ProfilePage from "./pages/profile";
import Dashboard from "./pages/dashboard";
import { guestLoader } from "./helper/guestLoader";
import { authLoader as Loader } from "./helper/authloader";
const router = createBrowserRouter([
  { path: "/login", element: <LoginForm />, loader: guestLoader },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard />, loader: Loader },
      { path: "/profile", element: <ProfilePage />, loader: Loader },
    ],
  },

  { path: "/register", element: <RegisterForm />, loader: guestLoader },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
