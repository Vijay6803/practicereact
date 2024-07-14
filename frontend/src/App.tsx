import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegistrationForm from "./pages/register";
import AddProductForm from "./pages/addproduct";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <RegistrationForm /> */}
      <AddProductForm />
    </>
  );
}

export default App;
