import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useForm } from "react-hook-form";
import riderImg from "../../assets/agent-pending.png"

const BeArider = () => {

    const {register, handleSubmit, formState : {errors}} = useForm()


    const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container className="bg-white px-20 py-16 mt-6 rounded-2xl space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold">Be a Rider</h2>
        <p className="max-w-2xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <Separator />
      <div className="space-y-4 grid grid-cols-2 gap-8 items-center">
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-6">
            Please provide your information.
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
              className={""}
                {...register("name", { required: true })}
                placeholder="Your Name"
              />
              <Input
                {...register("age", { required: true })}
                placeholder="Your age"
                type="number"
              />

              <Input
                {...register("email", { required: true })}
                placeholder="Your Email"
                type="email"
              />
              <Select {...register("region", { required: true })}  className="w-[100%] "  >
                <SelectTrigger size="20" className="w-full">
                  <SelectValue placeholder="Select your region" />
                </SelectTrigger>
                <SelectContent className={"w-full"}>
                  <SelectItem value="Dhaka">Dhaka</SelectItem>
                  <SelectItem value="Chattogram">Chattogram</SelectItem>
                  <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                </SelectContent>
              </Select>

              <Input
                {...register("nid", { required: true })}
                placeholder="NID"
              />
              <Input
                {...register("contact", { required: true })}
                placeholder="Contact"
              />
            </div>

            <div className="w-full">
              <Select {...register("warehouse", { required: true })} className="!w-full">
                <SelectTrigger size="20" className={"w-full"}>
                  <SelectValue  placeholder="Select wire-house" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                  <SelectItem value="Warehouse B">Warehouse B</SelectItem>
                  <SelectItem value="Warehouse C">Warehouse C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-lime-400 hover:bg-lime-500 text-white"
            >
              Submit
            </Button>
          </form>
        </div>
        <figure className="flex items-center justify-center">
            <img src={riderImg} alt="" />
        </figure>
      </div>
    </Container>
  );
};

export default BeArider;
