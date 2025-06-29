import React from "react";
import AuthForm from "../Shared/AuthForm";

const Signup = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <AuthForm isSignup={true} />
    </div>
  );
};

export default Signup;
