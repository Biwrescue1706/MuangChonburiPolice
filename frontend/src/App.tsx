import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";

import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import ForgotCheck from "./pages/ForgotCheck";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ✅ หน้า Login ไม่มี Nav */}
          <Route path="/" element={<Login />} />
          <Route path="/forgot" element={<ForgotCheck />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* ✅ ทุกหน้าหลัง login มี Nav */}
          <Route
            element={
              <ProtectedRoute>
                <Nav />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/security" element={<Security />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
