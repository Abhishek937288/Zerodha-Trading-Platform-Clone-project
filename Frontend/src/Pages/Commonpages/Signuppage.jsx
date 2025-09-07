import { assets } from "@/assets/assets";
import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupFn } from "@/Mutation/authMutationFn";
import toast from "react-hot-toast";

const Signuppage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
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
    mutationFn: signupFn,
    onSuccess: (response) => {
      toast.success(`${response.message}`);
      navigate("/Verifyotppage");
      setFormData({ username: "", email: "", password: "" });
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
            src={assets.signupImg}
            alt="signup"
            className="max-h-[300px] md:max-h-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          <form className="flex flex-col gap-5 w-full max-w-sm">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-500 text-sm mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

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
                className="w-full outline-none bg-blue-600 text-white rounded-lg px-5 py-2 hover:bg-blue-700 transition disabled={isPending}"
                onClick={handleSubmit}
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </div>
            <p>
              Already have a account{" "}
              <a
                href=""
                className="text-blue-700"
                onClick={() => {
                  navigate("/Signinpage");
                }}
              >
                login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signuppage;
