import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AllContext";
import Dashboard from "./pages/Dashboard";
import LoginSAdmin from "./pages/LoginSAdmin";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Admin from "./pages/Admin";

function App() {

  const { isLoggedIn } = useAuth();

  return (
    <>
      {
        isLoggedIn ?
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </>
          :
          <>
            <LoginSAdmin />
          </>
      }
    </>
  );
}

export default App;
