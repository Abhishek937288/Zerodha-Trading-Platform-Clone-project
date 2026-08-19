import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getFunds = async () => {
  const { data } = await axios.get(`${backendUrl}/api/funds`, {
    headers: getAuthHeader(),
  });
  return data.data;
};

export const addFunds = async (formData) => {
  const { data } = await axios.post(`${backendUrl}/api/funds`, formData, {
    headers: getAuthHeader(),
  });
  return data;
};
