// src/components/AuthForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate, useLocation, Link } from "react-router";
import axios from "axios";
import useAuth from "@/Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecuire from "@/Hooks/useAxiosSecuire";

const AuthForm = ({ isSignup }) => {
  const { signUp, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecuire();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    if (isSignup) {
      const file = data.photo[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );
        const photoURL = res.data.data.display_url;

        await signUp(data.email, data.password, data.first_name, photoURL);

        const userInfo = {
          email: data.email,
          role: "user", // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        // ✅ Store user in your DB.
        await axiosSecure.post("/users", userInfo);

        navigate("/login");
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    } else {
      await login(data.email, data.password);
      navigate(location.state || "/");
    }

    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await loginWithGoogle();
    navigate(location.state || "/");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {isSignup && (
          <>
            <div>
              <label>First Name</label>
              <input
                type="text"
                {...register("first_name", {
                  required: "First name is required",
                })}
                className="border p-2 w-full"
              />
              {errors.first_name && (
                <p className="text-red-500">{errors.first_name.message}</p>
              )}
            </div>

            <div>
              <label>Photo</label>
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: "Photo is required" })}
                className="border p-2 w-full"
              />
              {errors.photo && (
                <p className="text-red-500">{errors.photo.message}</p>
              )}
            </div>
          </>
        )}

        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="border p-2 w-full"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="border p-2 w-full"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 rounded"
        >
          {isSignup ? "Sign Up" : "Log In"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-grow border-gray-300" />
        <span className="text-gray-500">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="cursor-pointer flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100"
      >
        <FcGoogle />
        <span>Continue with Google</span>
      </button>
      <div className="flex items-center">
        {!isSignup ? (
          <span>
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-600 font-semibold">
              Register here
            </Link>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600 font-semibold">
              Login here
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
