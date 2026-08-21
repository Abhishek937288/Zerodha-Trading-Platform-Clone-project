import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const signupFn = async (formdata) => {
  const url = `${backendUrl}/api/auth/signup`;
  const { data } = await axios.post(url, formdata);
  return data;
};

// Email verification disabled for production (frontend on Vercel, backend on Render).
// Uncomment to re-enable along with the /verifyemail route and Verifyotppage.
// export const verifyEmailFn = async (code) => {
//   const url = `${backendUrl}/api/auth/verifyemail`;
//   const { data } = await axios.post(url, code);
//   return data;
// };

export const signinFn = async (formdata) => {
  const url = `${backendUrl}/api/auth/signin`;
  const { data } = await axios.post(url, formdata);
  return data;
};

export const forgotPassFn = async (formdata) => {
  const url = `${backendUrl}/api/auth/forgotpassword`;
  const { data } = await axios.post(url, formdata);
  return data;
};

export const newPasswordFn = async ({ newPassword, forgotpasstoken }) => {
  const url = `${backendUrl}/api/auth/newPassword/${forgotpasstoken}`;
  const { data } = await axios.post(url, { newPassword });
  return data;
};

export const getuserData = async () => {
  const url = `${backendUrl}/api/auth/check-auth`;
  const { data } = await axios.get(url, {
    headers: getAuthHeader(),
  });
  return data.data;
};

export const logOutFn = async () => {
  const url = `${backendUrl}/api/auth/log-out`;
  const { data } = await axios.post(url, {});
  return data.data;
};
