import { NavItems } from "@/components/Home/NavItems";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import React from "react";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const Header = () => {
  return <Container className="z-50 mt-5 py-5 flex items-center justify-between bg-white px-5 rounded-xl fixed w-full  left-1/2 -translate-x-1/2 ">
      <Logo/>
      <NavItems/>
      <div className="flex items-center gap-4">
        <Button variant="outline">Sign in</Button>
        <Button variant="">Be a Rider </Button>
      </div>
    </Container>;
};

export default Header;
