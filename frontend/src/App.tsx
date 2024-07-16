import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegistrationForm from "./pages/register";
import AddProductForm from "./pages/addproduct";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/footer";
import Product from "./component/product";

function App() {
  const [count, setCount] = useState(0);
  const handle = () => {};
  const router = createBrowserRouter([
    { path: "/register", element: <RegistrationForm /> },
    {
      path: "/addproduct",
      element: (
        <>
          <Navbar />
          <AddProductForm />
          <Footer />
        </>
      ),
    },
    {
      path: "/product",
      element: (
        <>
          <Navbar />
          <Product
            name="VDVFD"
            description="sdffs"
            quantityLeft={10}
            price={10}
            onAddToCart={handle}
          />
        </>
      ),
    },
  ]);
  return (
    <>
      {/* <RegistrationForm /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
