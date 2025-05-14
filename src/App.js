import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layouts
import Layout from './components/layouts/Layout';

// Pages
import Dashboard from './components/dashboard/Dashboard';
import CookieManager from './components/cookies/CookieManager';
import AbandonedCarts from './components/cart/AbandonedCarts';
import RemarketingTools from './pages/RemarketingTools';

// Components
import RemarketingDashboard from './components/remarketing/RemarketingDashboard';
import CampaignCreator from './components/remarketing/CampaignCreator';
import TrackingPixel from './components/tracking/TrackingPixel';
import TrackingScriptGenerator from './components/tracking/TrackingScriptGenerator';
import ConsentBanner from './components/tracking/ConsentBanner';

// Context
import { CookieProvider } from './context/CookieContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <CookieProvider>
      <Router>
        <ConsentBanner />

        <Routes>
          {/* Public routes */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected routes with PrivateRoute */}
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/cookies"
              element={
                <PrivateRoute>
                  <CookieManager />
                </PrivateRoute>
              }
            />
            <Route
              path="/tracking/script"
              element={
                <PrivateRoute>
                  <TrackingScriptGenerator />
                </PrivateRoute>
              }
            />
            <Route
              path="/carts"
              element={
                <PrivateRoute>
                  <AbandonedCarts />
                </PrivateRoute>
              }
            />
            <Route
              path="/abandoned-carts"
              element={
                <PrivateRoute>
                  <AbandonedCarts />
                </PrivateRoute>
              }
            />
            <Route
              path="/remarketing"
              element={
                <PrivateRoute>
                  <RemarketingTools />
                </PrivateRoute>
              }
            />
            <Route
              path="/remarketing/dashboard"
              element={
                <PrivateRoute>
                  <RemarketingDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/remarketing/campaign"
              element={
                <PrivateRoute>
                  <CampaignCreator />
                </PrivateRoute>
              }
            />
            <Route
              path="/tracking"
              element={
                <PrivateRoute>
                  <TrackingPixel />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Redirect all unknown routes to login */}
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      </Router>
    </CookieProvider>
  );
}

export default App;