import React from 'react';
import { assets } from "@/assets/assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

const Newpasswordpage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      password: "",
    });
  const [showPassword, setShowPassword] = useState(false);
  
  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e)=>{
       e.preventDefault();
      console.log(formData);
      setFormData({
      password: "",
    });
    navigate("/Signinpage");
    }
  
    return (
      <div className="w-full bg-slate-300 min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl md:h-[90%] bg-white px-6 py-8 rounded-2xl shadow-md">
          
           <div className="flex items-center justify-center">
                    <img
                      src={assets.newPass}
                      alt="signup"
                      className="max-h-[300px] md:max-h-full object-contain"
                    />
                  </div>
          <div className="flex flex-col justify-center gap-10 items-center w-full">
            <div className="flex flex-col items-center justify-center text-center gap-5">
              <h4 className="text-xl font-semibold">Set a password</h4>
              <p className='text-md opacity-80'> Your previous password has been reseted. Please set a new password for  your account</p>
            </div>
            <form className="flex flex-col gap-5 w-full max-w-sm">
              <div>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your new password"
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
                >
                  Submit
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
          
        </div>
      </div>
    );
}

export default Newpasswordpage;