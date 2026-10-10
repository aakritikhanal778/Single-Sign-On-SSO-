import { useEffect, useState } from "react";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import { getProfile } from "./services/authservice.js";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await getProfile();
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    checkLogin();
  }, []);

  if (checking) {
    return (
      <div style={styles.loading}>
        Checking SSO authentication...
      </div>
    );
  }

  return authenticated ? <Dashboard /> : <Login />;
};

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