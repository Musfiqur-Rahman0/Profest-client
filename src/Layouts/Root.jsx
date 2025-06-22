import Footer from "@/Pages/Shared/Footer";
import Header from "@/Pages/Shared/Header";
import React from "react";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div className="bg-[#EAECED]">
      <Header />
     <main className="min-h-[calc(100vh-90px)] pt-[120px]">
       <Outlet />
     </main>
      <Footer />
    </div>
  );
};

export default Root;
