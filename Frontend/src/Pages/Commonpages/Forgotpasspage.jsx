import React from "react";
import { assets } from "@/assets/assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPassFn } from "@/Mutation/authMutationFn";
import toast from "react-hot-toast";

const Forgotpasspage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: forgotPassFn,
    onSuccess: (response) => {
      toast.success(`${response.message}`);
      setFormData({
        email: "",
      });
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
        <div className="flex flex-col justify-center gap-10 items-center w-full">
          <div className="flex flex-col items-center justify-center text-center gap-5">
            <h4 className="text-xl font-semibold">Forgot Your password?</h4>
            <p>
              Dont worry , happens to all of us Enter your email below to
              recover your password
            </p>
          </div>
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

            <div className="mt-4">
              <button
                className="w-full outline-none bg-blue-600 text-white rounded-lg px-5 py-2 hover:bg-blue-700 transition"
                disabled={isPending}
                onClick={handleSubmit}
              >
                {isPending ? "Submitting.." : "Submit"}
              </button>
            </div>
            <p>
              <i className="fa-solid fa-arrow-left"></i> Back{"    "}
              <a
                href=""
                className="text-blue-700"
                onClick={() => {
                  navigate("/Signinpage");
                }}
              >
                login
              </a>
            </p>
          </form>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={assets.forgotpass}
            alt="signup"
            className="max-h-[300px] md:max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Forgotpasspage;
