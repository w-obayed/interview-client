import axios from "axios";

export async function signup(input) {
  const response = await axios.post(
    "http://localhost:5050/api/v1/auth/signup",
    input
  );
  return response.data;
}
export async function verifyEmail(input) {
  const response = await axios.post(
    "http://localhost:5050/api/v1/auth/verify/email",
    input
  );
  return response.data;
}
export async function login(input) {
  const response = await axios.post(
    "http://localhost:5050/api/v1/auth/login",
    input
  );
  return response.data;
}
