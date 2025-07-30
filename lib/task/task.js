import axios from "axios";

export async function getAllTask(params) {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "https://interview-server-7h7c.onrender.com/api/v1/task/get/all/task",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }
  );

  return response.data;
}

export async function createTask(input) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "https://interview-server-7h7c.onrender.com/api/v1/task/create",
    input,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
