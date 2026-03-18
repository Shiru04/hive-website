import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AppRouter from "./router.jsx";
import { PortalAuthProvider } from "./context/PortalAuthContext.jsx";
import PortalProtectedRoute from "./components/portal/PortalProtectedRoute.jsx";

const PortalLayout = lazy(() => import("./components/portal/PortalLayout.jsx"));
const PortalLogin = lazy(() => import("./pages/portal/PortalLogin.jsx"));
const PortalRegister = lazy(() => import("./pages/portal/PortalRegister.jsx"));
const PortalSetup = lazy(() => import("./pages/portal/PortalSetup.jsx"));
const PortalDashboard = lazy(() => import("./pages/portal/PortalDashboard.jsx"));
const TicketsList = lazy(() => import("./pages/portal/TicketsList.jsx"));
const TicketDetail = lazy(() => import("./pages/portal/TicketDetail.jsx"));
const NewTicket = lazy(() => import("./pages/portal/NewTicket.jsx"));
const PortalAccount = lazy(() => import("./pages/portal/PortalAccount.jsx"));
const PortalForgotPassword = lazy(() => import("./pages/portal/PortalForgotPassword.jsx"));
const PortalResetPassword = lazy(() => import("./pages/portal/PortalResetPassword.jsx"));

function Fallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="w-6 h-6 border-2 border-hive-yellow border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <AppRouter />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Fallback />}>
        <Routes>
          {/* Portal routes — separate layout, no Navbar/Footer/ChatWidget */}
          <Route path="/portal/*" element={
            <PortalAuthProvider>
              <Routes>
                <Route path="login" element={<PortalLogin />} />
                <Route path="register" element={<PortalRegister />} />
                <Route path="setup" element={<PortalSetup />} />
                <Route path="forgot-password" element={<PortalForgotPassword />} />
                <Route path="reset-password" element={<PortalResetPassword />} />
                <Route path="*" element={
                  <PortalProtectedRoute>
                    <PortalLayout />
                  </PortalProtectedRoute>
                }>
                  <Route index element={<PortalDashboard />} />
                  <Route path="tickets" element={<TicketsList />} />
                  <Route path="tickets/new" element={<NewTicket />} />
                  <Route path="tickets/:id" element={<TicketDetail />} />
                  <Route path="account" element={<PortalAccount />} />
                </Route>
              </Routes>
            </PortalAuthProvider>
          } />

          {/* Marketing routes — existing layout */}
          <Route path="/*" element={<MarketingLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
