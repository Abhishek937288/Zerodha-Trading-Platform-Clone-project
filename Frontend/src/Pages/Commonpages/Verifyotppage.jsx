import React from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { assets } from "@/assets/assets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyEmailFn } from "@/Mutation/authMutationFn";
import toast from "react-hot-toast";
import { userAuthstore } from "../../Store/authStore";

const Verifyotppage = () => {
  const { setUser } = userAuthstore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: verifyEmailFn,
    onSuccess: (response) => {
      toast.success(`${response.message}`);
      setUser(response.data);
      navigate("/");
    },
    onError: (error) => {
      console.log(error.response.data.message);
      toast.error(`${error.response?.data?.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };
  return (
    <div className="w-full bg-slate-300 min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl md:h-[90%] bg-white px-6 py-8 rounded-2xl shadow-md">
        <div className="flex items-center justify-center">
          <img
            src={assets.verifyOtp}
            alt="verifyOtp"
            className="max-h-[300px] md:max-h-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-center gap-10 items-center w-full">
          <div className="flex flex-col items-center gap-5">
            <p className="text-start">
              <i className="fa-solid fa-arrow-left"></i> {"  "}
              Back to{" "}
              <a
                href=""
                className="text-red-700  text-sm opacity-90"
                onClick={() => {
                  navigate("/Signuppage");
                }}
              >
                Signup
              </a>
            </p>
            <h4 className="text-2xl font-semibold">Verify Code</h4>
            <p className="text-md opacity-90">
              An authentication code has been sent to your mail.
            </p>
          </div>
          <form className="">
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your code here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>
            </div>
            <div className="mt-4">
              <button
                className="w-full outline-none bg-blue-600 text-white rounded-lg px-5 py-2 hover:bg-blue-700 transition"
                onClick={handleSubmit}
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verifyotppage;
