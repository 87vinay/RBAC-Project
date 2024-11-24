import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const isAuthenticated = false;
  const privateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <privateRoute>
              <Dashboard />
            </privateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
