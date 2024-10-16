import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="flex  items-center justify-center h-screen p-4">
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
