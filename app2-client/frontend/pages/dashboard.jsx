import { useEffect, useState } from "react";
import { getProfile } from "../services/authservice.js";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const data = await getProfile();

        setUser(data.user);
      } catch (err) {
        console.error(err);
        setError("You are not authenticated.");
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Checking authentication...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.center}>
        <div style={styles.errorCard}>
          <h2>Authentication Required</h2>
          <p>{error}</p>
          <p>
            Please log in through the SSO Auth Server first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <div style={styles.icon}>✓</div>

        <p style={styles.appLabel}>
          SSO APPLICATION 02
        </p>

        <h1 style={styles.title}>
          App 2 Dashboard
        </h1>

        <p style={styles.welcome}>
          Welcome, <strong>{user?.username}</strong>
        </p>

        <div style={styles.successBox}>
          <h3>Authentication Successful</h3>

          <p>
            You are successfully authenticated through the
            central SSO Auth Server.
          </p>
        </div>

        <div style={styles.details}>
          <div>
            <span>User</span>
            <strong>{user?.username}</strong>
          </div>

          <div>
            <span>Authentication</span>
            <strong>SSO Auth Server</strong>
          </div>

          <div>
            <span>Application</span>
            <strong>App 2</strong>
          </div>
        </div>

      </div>

    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #020617, #172554, #312e81)",
    fontFamily: "Arial, sans-serif"
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f5f9",
    fontFamily: "Arial, sans-serif"
  },

  card: {
    width: "520px",
    padding: "50px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.98)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
    textAlign: "center"
  },

  icon: {
    width: "70px",
    height: "70px",
    margin: "0 auto 20px",
    borderRadius: "50%",
    background: "#16a34a",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "36px",
    fontWeight: "bold"
  },

  appLabel: {
    fontSize: "12px",
    letterSpacing: "2px",
    color: "#6366f1",
    fontWeight: "bold"
  },

  title: {
    fontSize: "34px",
    margin: "10px 0",
    color: "#111827"
  },

  welcome: {
    fontSize: "19px",
    color: "#475569"
  },

  successBox: {
    marginTop: "30px",
    padding: "20px",
    borderRadius: "14px",
    background: "#ecfdf5",
    color: "#166534"
  },

  details: {
    marginTop: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  errorCard: {
    background: "white",
    padding: "40px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)"
  }
};

export default Dashboard;