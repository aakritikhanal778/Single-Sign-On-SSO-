import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AUTH_SERVER = "http://localhost:3000";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          `${AUTH_SERVER}/me`,
          {
            withCredentials: true
          }
        );

        console.log("Authenticated user:", response.data);

        setUser(response.data.user);

      } catch (error) {
        console.error("Authentication failed:", error);

        navigate("/login");

      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (loading) {
    return <h2>Checking authentication...</h2>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1>App 1 Dashboard</h1>

        {user && (
          <>
            <h2>Welcome, {user.username}!</h2>

            <p>
              You are successfully authenticated.
            </p>

            <p>
              Authentication is being handled by the SSO Auth Server.
            </p>
          </>
        )}

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
    background: "#f2f2f2"
  },

  card: {
    padding: "40px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    textAlign: "center"
  }
};

export default Dashboard;