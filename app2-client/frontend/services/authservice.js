import axios from "axios";

const API_URL = "http://localhost:3002";
const AUTH_SERVER = "http://localhost:3000";

/*
  Check App2 authentication.
*/
export const getProfile = async () => {
  const response = await axios.get(
    `${API_URL}/profile`,
    {
      withCredentials: true
    }
  );

  return response.data;
};


/*
  Start SSO authentication for App2.
*/
export const loginWithSSO = () => {

  const redirectUri = "http://localhost:5174";

  window.location.href =
    `${AUTH_SERVER}/login?redirect=${encodeURIComponent(redirectUri)}`;
};