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
import PersonStatus0Page from "./pages/statusPerson/PersonStatus0Page";
import PersonStatus1Page from "./pages/statusPerson/PersonStatus1Page";
import PersonStatus2Page from "./pages/statusPerson/PersonStatus2Page";
import PersonStatus3Page from "./pages/statusPerson/PersonStatus3Page";
import PersonDetailPage from "./pages/PersonDetailPage";
import PersonHistoryPage from "./pages/PersonHistoryPage";
import PersonEditPage from "./pages/statusPerson/PersonEditPage";
import OrganizationPage from "./pages/OrganizationPage";
import ReceiptListPage from "./pages/ReceiptListPage";
import ReceiptDetailPage from "./pages/ReceiptDetailPage";

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
          <Route path="/organization" element={<OrganizationPage />} />

<Route path="/receipt" element={<ReceiptListPage />} />
<Route path="/receipt/:id" element={<ReceiptDetailPage />} />

          {/* ⭐ STATUS FLOW */}
          <Route path="/person/status0" element={<PersonStatus0Page />} />
          <Route path="/person/status1" element={<PersonStatus1Page />} />
          <Route path="/person/status2" element={<PersonStatus2Page />} />
          <Route path="/person/status3" element={<PersonStatus3Page />} />
          <Route path="/person/edit/:id" element={<PersonEditPage />} />

          {/* ⭐ HISTORY */}
          <Route path="/person/history" element={<PersonHistoryPage />} />

          {/* DETAIL */}
          <Route path="/person/:id" element={<PersonDetailPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;