import axios from "axios";

export async function signup(input) {
  const response = await axios.post(
    "https://interview-server-7h7c.onrender.com/api/v1/auth/signup",
    input
  );
  return response.data;
}
export async function verifyEmail(input) {
  const response = await axios.post(
    "https://interview-server-7h7c.onrender.com/api/v1/auth/verify/email",
    input
  );
  return response.data;
}
export async function login(input) {
  const response = await axios.post(
    "https://interview-server-7h7c.onrender.com/api/v1/auth/login",
    input
  );
  return response.data;
}
