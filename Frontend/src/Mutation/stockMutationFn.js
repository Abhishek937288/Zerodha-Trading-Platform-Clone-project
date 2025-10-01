import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getHoldings = async () => {
  const res = await axios.get(`${backendUrl}/api/holdings`, {
    withCredentials: true,
  });
  return res.data.data;
};

export const getPositions = async () => {
  const res = await axios.get(`${backendUrl}/api/positions`, {
    withCredentials: true,
  });
  return res.data.data;
};

export const getOrders = async () => {
  const res = await axios.get(`${backendUrl}/api/orders`, {
    withCredentials: true,
  });
  return res.data.data;
};

export const buyStock = async (stockData) => {
  const url = `${backendUrl}/api/orders/buy`;
  const { data } = await axios.post(url, stockData, { withCredentials: true });
  return data;
};

export const sellStock = async (stockData) => {
  const url = `${backendUrl}/api/orders/sell`;
  const { data } = await axios.post(url, stockData, { withCredentials: true });
  return data;
};


export const getDashboard = async ()=>{
  const url = `${backendUrl}/api/dashboard`;
  const res = await axios.get(url, {
    withCredentials: true,
  });
  return res.data.data;
}