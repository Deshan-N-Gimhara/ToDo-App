import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Styles/styles.css";
import Home from "./pages/Home";
import { RouteData } from "./constants/RouteData";
import Login from "./components/LoginSignup/Login";
import SignUp from "./components/LoginSignup/SignUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path={RouteData.Home}
            element={
              <>
                <Home />
              </>
            }
          />

          <Route
            path={RouteData.Login}
            element={
              <>
                <Login />
              </>
            }
          />

          <Route
            path={RouteData.SignUp}
            element={
              <>
                <SignUp />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
