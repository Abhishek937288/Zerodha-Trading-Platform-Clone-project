import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL ;

export const getHoldings = async () => {
  const res = await axios.get(
    `${backendUrl}/api/holdings`,
    {
      withCredentials: true,
    }
  );
  console.log(res.data.data);
  return res.data.data;
};

export const getPositions = async () => {
  const res = await axios.get(
    `${backendUrl}/api/positions`,
    {
      withCredentials: true,
    }
  );
  console.log(res.data.data);
  return res.data.data;
};

export const getOrders = async () => {
  const res = await axios.get(
    `${backendUrl}/api/orders`,
    {
      withCredentials: true,
    }
  );
  console.log(res.data.data);
  return res.data.data;
};
