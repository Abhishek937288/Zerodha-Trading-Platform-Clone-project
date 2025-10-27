import axios from "axios";
const backendUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BACKEND_URL
    : "/api";

export const getFunds = async () => {
  const { data } = await axios.get(`${backendUrl}/api/funds`, {
    withCredentials: true,
  });
  return data.data;
};

export const addFunds = async (formData) => {
  const { data } = await axios.post(`${backendUrl}/api/funds`, formData, {
    withCredentials: true,
  });
  return data;
};
