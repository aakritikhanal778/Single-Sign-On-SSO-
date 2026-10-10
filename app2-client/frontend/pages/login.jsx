import { loginWithSSO } from "../services/authservice.js";

const Login = () => {

  const handleLogin = () => {
    console.log("LOGIN BUTTON CLICKED");
    loginWithSSO();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.logo}>SSO</div>

        <h1 style={styles.title}>App 2</h1>

        <p style={styles.subtitle}>
          Single Sign-On Application
        </p>

        <div style={styles.infoBox}>
          <p>
            You don't need a separate account for App 2.
          </p>

          <p>
            Your authentication is handled by the central SSO Auth Server.
          </p>
        </div>

        <button
          onClick={handleLogin}
          style={styles.button}
        >
          Login with SSO
        </button>

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
    color: "#6b7280",
    marginTop: "8px",
    marginBottom: "30px"
  },

  infoBox: {
    background: "#eef2ff",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "25px",
    color: "#3730a3",
    fontSize: "14px",
    lineHeight: "1.5"
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#4f46e5",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Login;