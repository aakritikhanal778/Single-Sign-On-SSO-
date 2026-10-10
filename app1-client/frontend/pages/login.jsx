import { useEffect } from "react";

const AUTH_SERVER = "http://localhost:3000";
const APP_URL = "http://localhost:5173";

function Login() {
  useEffect(() => {
    const redirectUrl = APP_URL;

    window.location.href =
      `${AUTH_SERVER}/login?redirect=${encodeURIComponent(redirectUrl)}`;
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>SSO</div>

        <h1 style={styles.title}>App 1</h1>

        <p style={styles.subtitle}>
          Redirecting to Central SSO...
        </p>

        <div style={styles.loader}></div>

        <p style={styles.info}>
          You will be redirected to the central authentication server.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #0f172a, #1e293b, #312e81)",
    fontFamily: "Arial, sans-serif"
  },

  card: {
    width: "400px",
    padding: "45px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.97)",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
    textAlign: "center"
  },

  logo: {
    width: "65px",
    height: "65px",
    margin: "0 auto 20px",
    borderRadius: "16px",
    background: "#4f46e5",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    fontWeight: "bold"
  },

  title: {
    margin: "0",
    fontSize: "32px",
    color: "#111827"
  },

  subtitle: {
    color: "#4f46e5",
    marginTop: "12px",
    fontSize: "17px",
    fontWeight: "bold"
  },

  loader: {
    width: "30px",
    height: "30px",
    margin: "25px auto",
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #4f46e5",
    borderRadius: "50%"
  },

  info: {
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: "1.5"
  }
};

export default Login;