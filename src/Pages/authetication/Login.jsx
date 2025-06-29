import React from "react";
import AuthForm from "../Shared/AuthForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <AuthForm isSignup={false} />
    </div>
  );
};

export default Login;
