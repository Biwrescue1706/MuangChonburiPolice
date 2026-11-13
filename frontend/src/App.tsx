import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";

import RouteLoading from "./components/RouteLoading";

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
import OrganizationPersonnel from "./pages/organizationPersonnel";

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
      <RouteLoading />

      <Routes>
        {/* PUBLIC */}
        <Route
          path="/"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route path="/forgot" element={<ForgotCheck />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* PROTECTED + NAV */}
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
          <Route path="/settings" element={<Settings />} />

          <Route path="/admin/create" element={<CreateAdmin />} />

          {/* PERSON */}
          <Route path="/person/create" element={<PersonPage />} />
          <Route path="/person/edit/:id" element={<PersonEditPage />} />
          <Route path="/person/history" element={<PersonHistoryPage />} />
          <Route path="/person/:id" element={<PersonDetailPage />} />

          {/* ORGANIZATION */}
          <Route path="/organization" element={<OrganizationPage />} />

          {/* ORGANIZATION PERSONNEL */}
          <Route
            path="/organization-personnel"
            element={<OrganizationPersonnel />}
          />

          {/* FORENSIC */}
          <Route path="/forensic-scan" element={<ForensicScanPage />} />
          <Route
            path="/forensic-status/:id"
            element={<ForensicStatusPage />}
          />

          {/* FOREIGNER */}
          <Route path="/foreigner" element={<ForeignerHistory />} />
          <Route path="/foreigner/:id" element={<ForeignerDetail />} />
          <Route path="/foreigner/edit/:id" element={<EditForeigner />} />
          <Route path="/foreigner/create" element={<CreateForeigner />} />

          {/* STATUS HISTORY */}
          <Route
            path="/status-history"
            element={<StatusHistoryPage />}
          />

          {/* FORENSIC SUBMISSION */}
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

        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;