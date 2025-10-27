import axios from "axios";
const backendUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BACKEND_URL
    : "/api";

export const signupFn = async (formdata) => {
  const url = `${backendUrl}/api/auth/signup`;
  const { data } = await axios.post(url, formdata, {
    withCredentials: true,
  });
  return data;
};

export const verifyEmailFn = async (code) => {
  const url = `${backendUrl}/api/auth/verifyemail`;
  const { data } = await axios.post(url, code, { withCredentials: true });
  return data;
};

export const signinFn = async (formdata) => {
  const url = `${backendUrl}/api/auth/signin`;
  const { data } = await axios.post(url, formdata, { withCredentials: true });
  return data;
};

export const forgotPassFn = async (formdata) => {
  const url = `${backendUrl}/api/auth/forgotpassword`;
  const { data } = await axios.post(url, formdata, { withCredentials: true });
  return data;
};

export const newPasswordFn = async ({ newPassword, forgotpasstoken }) => {
  const url = `${backendUrl}/api/auth/newPassword/${forgotpasstoken}`;
  const { data } = await axios.post(
    url,
    { newPassword },
    { withCredentials: true }
  );
  return data;
};

export const getuserData = async () => {
  const url = `${backendUrl}/api/auth/check-auth`;
  const { data } = await axios.get(url, { withCredentials: true });

  return data.data;
};

export const logOutFn = async () => {
  const url = `${backendUrl}/api/auth/log-out`;
  const { data } = await axios.post(url, {}, { withCredentials: true });
  return data.data;
};
