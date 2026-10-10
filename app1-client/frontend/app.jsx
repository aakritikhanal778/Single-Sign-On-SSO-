import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import axios from "axios";

const AUTH_SERVER = "http://localhost:3000";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await axios.get(`${AUTH_SERVER}/me`, {
          withCredentials: true
        });

        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    checkAuthentication();
  }, []);

  if (checking) {
    return (
      <div style={styles.loading}>
        Checking SSO authentication...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            authenticated
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/login"
          element={
            authenticated
              ? <Navigate to="/dashboard" replace />
              : <Login />
          }
        />

        <Route
          path="/dashboard"
          element={
            authenticated
              ? <Dashboard />
              : <Navigate to="/login" replace />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  loading: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    fontSize: "20px",
    background: "#0f172a",
    color: "white"
  }
};

export default App;