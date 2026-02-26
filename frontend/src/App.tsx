import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import Nav from "./Nav";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ✅ หน้า Login ไม่มี Nav */}
          <Route path="/" element={<Login />} />

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
