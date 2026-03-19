import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Security from "./pages/Password/Security";
import ForgotCheck from "./pages/Password/ForgotCheck";
import ResetPassword from "./pages/Password/ResetPassword";
import CreateAdmin from "./pages/CreateAdmin";
import NotFound from "./pages/NotFound";
import PersonPage from "./pages/PersonPage";
import PersonStatus0Page from "./pages/PersonStatus0Page";

function App() {
  return (
          <AuthProvider>
        <Routes>
          {/* PUBLIC */}
                  <Route
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
          path="/"
        />

        <Route path="/forgot" element={<ForgotCheck />} />
        <Route path="/reset-password" element={<ResetPassword />} />

          {/* ✅ PROTECTED + NAV */}
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
            <Route path="/admin/create" element={<CreateAdmin />} />
            <Route path="/person/create" element={<PersonPage />} />
            <Route path="/person/status0" element={<PersonStatus0Page />} />

          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
