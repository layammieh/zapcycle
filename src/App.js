import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/admin/auth/Login";
import SignUp from "./pages/admin/auth/SignUp";
import Dashboard from "./pages/admin/Dashboard";
import UsersPage from "./pages/admin/Users";
import CyclesPage from "./pages/admin/Cycles";
import AnalyticsPage from "./pages/admin/Analytics";
import SettingsPage from "./pages/admin/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/cycles" element={<CyclesPage />} />
        <Route path="/admin/analytics" element={<AnalyticsPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
