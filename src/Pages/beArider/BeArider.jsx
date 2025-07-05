import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { use, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import riderImg from "../../assets/agent-pending.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLoaderData } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecuire from "@/Hooks/useAxiosSecuire";
import Swal from "sweetalert2";
import { AuthContext } from "@/Context/AuthContext";

// Optional: a small error text component
const FormError = ({ message }) => (
  <AnimatePresence>
    {message && (
      <motion.p
        className="text-sm text-red-500 mt-1"
        initial={{ opacity: 0, y: -2 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -2 }}
      >
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

const BeArider = () => {
  const [coveredArea, setCoveredArea] = useState([]);
  const warehousesData = useLoaderData();
  const axiosSecure = useAxiosSecuire();

  const { user } = use(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/riders", data);
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Rider request submitted successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        reset(); // clear form
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again!",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit. Please try again later.",
      });
    }
  };

  const selectedRegion = watch("region");

  const { data: region = [], isPending } = useQuery({
    queryKey: ["riders_info"],
    queryFn: async () => {
      const res = await axios.get("/data/division.json");
      return res.data;
    },
  });

  useEffect(() => {
    if (selectedRegion) {
      const matchArea = warehousesData.find(
        (area) => selectedRegion?.toLowerCase() === area?.city?.toLowerCase()
      );
      if (matchArea) {
        setCoveredArea(matchArea.covered_area);
      } else {
        setCoveredArea([]);
      }
    } else {
      setCoveredArea([]);
    }
  }, [selectedRegion]);

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  defaultValue={user?.displayName}
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your Name"
                />
                <FormError message={errors.name?.message} />
              </div>

              <div>
                <Input
                  {...register("age", { required: "Age is required" })}
                  placeholder="Your age"
                  type="number"
                />
                <FormError message={errors.age?.message} />
              </div>

              <div>
                <Input
                  defaultValue={user?.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Your Email"
                  type="email"
                />
                <FormError message={errors.email?.message} />
              </div>

              <div>
                <Controller
                  name="region"
                  control={control}
                  rules={{ required: "Region is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger size="20" className="w-full">
                        <SelectValue placeholder="Select your region" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {region?.map((r, i) => (
                          <SelectItem value={r} key={i}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FormError message={errors.region?.message} />
              </div>

              <div>
                <Input
                  {...register("nid", { required: "NID is required" })}
                  placeholder="NID"
                />
                <FormError message={errors.nid?.message} />
              </div>

              <div>
                <Input
                  {...register("contact", { required: "Contact is required" })}
                  placeholder="Contact"
                />
                <FormError message={errors.contact?.message} />
              </div>
            </div>

            <div className="w-full">
              <Controller
                name="warehouse"
                control={control}
                rules={{ required: "Warehouse is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={coveredArea.length === 0} // 🔑 disables the whole Select
                  >
                    <SelectTrigger
                      size="20"
                      className="w-full"
                      disabled={coveredArea.length === 0}
                    >
                      <SelectValue
                        placeholder={
                          coveredArea.length === 0
                            ? "No warehouses available"
                            : "Select warehouse"
                        }
                      />
                    </SelectTrigger>
                    {coveredArea.length > 0 && (
                      <SelectContent>
                        {coveredArea.map((area, index) => (
                          <SelectItem value={area} key={index}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    )}
                  </Select>
                )}
              />

              <FormError message={errors.warehouse?.message} />
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
          <img src={riderImg} alt="Rider" />
        </figure>
      </div>
    </Container>
  );
};

export default BeArider;
