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
import PersonPage from "./pages/Person/PersonPage";
import PersonDetailPage from "./pages/Person/PersonDetailPage";
import PersonHistoryPage from "./pages/History/PersonHistoryPage";
import PersonEditPage from "./pages/Person/PersonEditPage";
import OrganizationPage from "./pages/OrganizationPage";

import Settings from "./pages/Settings";

import StatusHistoryPage from "./pages/History/StatusHistoryPage";
import ForensicSubmissionPage from "./pages/Forensic/ForensicSubmissionPage";
import ForensicSubmissionListPage from "./pages/Forensic/ForensicSubmissionListPage";
import ForensicSubmissionPdfPage from "./pages/Forensic/ForensicSubmissionPdfPage";
import ForensicStatusPage from "./pages/Forensic/ForensicStatusPage";
import ForensicScanPage from "./pages/Forensic/ForensicQrScanner";
import CreateForeigner from "./pages/Foreigner/CreateForeigner";
import ForeignerHistory from "./pages/Foreigner/ForeignerHistory";
import ForeignerDetail from "./pages/Foreigner/ForeignerDetail";
import EditForeigner from "./pages/Foreigner/EditForeigner";

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

          <Route path="/forensic-scan" element={<ForensicScanPage />} />
          <Route path="/forensic-status/:id" element={<ForensicStatusPage />} />

          {/* foreigner */}
          <Route path="/foreigner" element={<ForeignerHistory />} />
          <Route path="/foreigner/:id" element={<ForeignerDetail />} />
          <Route path="/foreigner/edit/:id" element={<EditForeigner />} />
          <Route path="/foreigner/create" element={<CreateForeigner />} />

          {/* ⭐ STATUS FLOW */}
          <Route path="/person/edit/:id" element={<PersonEditPage />} />

          {/* ⭐ HISTORY */}
          <Route path="/person/history" element={<PersonHistoryPage />} />

          <Route path="/settings" element={<Settings />} />

          {/* DETAIL */}
          <Route path="/person/:id" element={<PersonDetailPage />} />
          <Route path="/status-history" element={<StatusHistoryPage />} />

          <Route
            path="/forensic-submission"
            element={<ForensicSubmissionPage />}
          />

          <Route
            path="/forensic-submission/list"
            element={<ForensicSubmissionListPage />}
          />
          <Route
            path="/forensic-submission/pdf/:id"
            element={<ForensicSubmissionPdfPage />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
