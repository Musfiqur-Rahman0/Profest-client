import Container from "@/components/ui/Container";
import AuthencationImg from "@/Pages/Shared/AuthencationImg";
import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="h-screen w-screen ">
      <Container className={"h-full w-full grid grid-cols-2 items-center"}>
        <Outlet />
        <AuthencationImg />
      </Container>
    </div>
  );
};

export default AuthLayout;
