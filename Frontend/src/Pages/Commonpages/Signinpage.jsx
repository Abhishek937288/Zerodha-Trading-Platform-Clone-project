import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "@/assets/assets";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { signinFn } from "@/Mutation/authMutationFn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Signinpage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: signinFn,
    onSuccess: (response) => {
      toast.success(`${response.message}`);
      navigate("/");
      setFormData({ email: "", password: "" });
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
        <div className="flex flex-col justify-center items-center w-full">
          <form className="flex flex-col gap-5 w-full max-w-sm">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-500 text-sm mb-1"
              >
                Enter Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="something@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  name="password"
                  value={formData.password}
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
                disabled={isPending}
              >
                {isPending ? "Login..." : "Login"}
              </button>
            </div>
            <p>
              Dont have an account? {"   "}
              <a
                href=""
                className="text-red-700 text-center text-sm opacity-90"
                onClick={() => {
                  navigate("/Signuppage");
                }}
              >
                Signup here
              </a>
            </p>
            <a
              href=""
              className="text-red-700 text-sm  opacity-90"
              onClick={() => {
                navigate("/Forgotpasspage");
              }}
            >
              Forgot password
            </a>
          </form>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={assets.loginImg}
            alt="signup"
            className="max-h-[300px] md:max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Signinpage;
