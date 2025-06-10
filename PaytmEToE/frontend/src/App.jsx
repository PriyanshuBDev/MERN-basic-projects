import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Update } from "./pages/Update";

function App() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={token ? "/dashboard" : "signin"}></Navigate>}
          ></Route>
          <Route path={"/signup"} element={<Signup />}></Route>
          <Route path={"/signin"} element={<Signin />}></Route>
          <Route
            path={"/update"}
            element={
              <ProtectedRoute>
                <Update />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={"/dashboard"}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route path={"/send"} element={<SendMoney />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
