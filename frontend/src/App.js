import "./App.css";
import Register from "./Pages/Authentication/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Verification from "./Pages/Authentication/Verification";
import Login from "./Pages/Authentication/Login";
import Home from "./Pages/Home/Home";
import ForgetPassword from "./Pages/Authentication/ForgetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/fp" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
