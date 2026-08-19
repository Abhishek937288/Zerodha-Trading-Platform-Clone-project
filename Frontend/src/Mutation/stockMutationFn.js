import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getHoldings = async () => {
  const res = await axios.get(`${backendUrl}/api/holdings`, {
    headers: getAuthHeader(),
  });
  return res.data.data;
};


export const getPositions = async () => {
  const res = await axios.get(`${backendUrl}/api/positions`, {
    headers: getAuthHeader(),
  });
  return res.data.data;
};

export const getOrders = async () => {
  const res = await axios.get(`${backendUrl}/api/orders`, {
    headers: getAuthHeader(),
  });
  return res.data.data;
};

export const buyStock = async (stockData) => {
  const url = `${backendUrl}/api/orders/buy`;
  const { data } = await axios.post(url, stockData, {
    headers: getAuthHeader(),
  });
  return data;
};

export const sellStock = async (stockData) => {
  const url = `${backendUrl}/api/orders/sell`;
  const { data } = await axios.post(url, stockData, {
    headers: getAuthHeader(),
  });
  return data;
};

export const getDashboard = async () => {
  const url = `${backendUrl}/api/dashboard`;
  const res = await axios.get(url, {
    headers: getAuthHeader(),
  });
  
  return res.data.data;
};
