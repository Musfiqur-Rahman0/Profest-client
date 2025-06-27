import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/Container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useAxiosSecuire from "@/Hooks/useAxiosSecuire";
import { getTrackingId } from "@/lib/utils";
import { reverseEasing } from "motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

// Assuming these Shadcn UI components are available from your project's components/ui directory.
const AddParcel = () => {
  const warehousesData = useLoaderData();
  const [regions, setRegions] = useState([]);
  const [coveredArea, setCoveredArea] = useState([]);
  const axiosSecuire = useAxiosSecuire();
  // const [currentRegion, setCurrentRegion]  = useState("Dhaka")

  const form = useForm({
    // resolver: zodResolver(formSchema), // Integrate Zod for validation
    defaultValues: {
      parcelName: "",
      parcelType: "document", // Default parcel type
      weight: 0, // Default weight (will be conditionally validated)
      senderName: "",
      senderContactNumber: "",
      senderWarehouse: "",
      senderAddress: "",
      senderRegion: "",
      senderInstructions: "",
      receiverName: "",
      receiverContactNumber: "",
      receiverWarehouse: "",
      receiverAddress: "",
      receiverRegion: "",
      receiverInstructions: "",
    },
  });
  const parcelType = form.watch("parcelType");
  const selectedRegion = form.watch("senderRegion");

  // console.log(warehousesData);

  // console.log(selectedRegion)
  // console.log(parcelType);

  const senderCenter = form.watch("senderRegion");
  const receiverCenter = form.watch("receiverRegion");
  // console.log(senderCenter, receiverCenter)

  const onSubmit = (data) => {
    const {
      parcelType,
      weight,
      senderName,
      senderContactNumber,
      senderWarehouse,
      senderAddress,
      senderRegion,
      senderInstructions,
      receiverName,
      receiverContactNumber,
      receiverWarehouse,
      receiverAddress,
      receiverRegion,
      receiverInstructions,
      ...rest
    } = data;

    const sender = {
      name: senderName,
      contactNumber: senderContactNumber,
      warehouse: senderWarehouse,
      address: senderAddress,
      region: senderRegion,
      instructions: senderInstructions,
    };

    const receiver = {
      name: receiverName,
      contactNumber: receiverContactNumber,
      warehouse: receiverWarehouse,
      address: receiverAddress,
      region: receiverRegion,
      instructions: receiverInstructions,
    };

    const deliveryType =
      senderCenter === receiverCenter ? "Within City" : "Outside City";

    let cost = 0;
    let breakdown = "";

    if (parcelType === "document") {
      cost = deliveryType === "Within City" ? 60 : 80;
      breakdown = `Document (${deliveryType}) = ৳${cost}`;
    } else if (parcelType === "non-document") {
      if (weight <= 3) {
        cost = deliveryType === "Within City" ? 110 : 150;
        breakdown = `Non-document (≤ 3kg) - ${deliveryType} = ৳${cost}`;
      } else {
        const extraKg = Math.ceil(weight - 3);
        const extraCost = extraKg * 40;
        if (deliveryType === "Within City") {
          cost = 110 + extraCost;
          breakdown = `Non-document (> 3kg) - Within City = ৳110 + ৳${extraCost} (for ${extraKg} extra kg)`;
        } else {
          cost = 150 + extraCost + 40; // 40 extra for outside city
          breakdown = `Non-document (> 3kg) - Outside City = ৳150 + ৳${extraCost} (for ${extraKg} extra kg) + ৳40 (extra charge)`;
        }
      }
    }

    const newParcel = {
      ...rest,
      parcelType,
      weight,
      sender,
      receiver,
      tracking_id: getTrackingId(),
      addedBy: "musfiqurrhaman6@gmail.com",
      addedOn: new Date().toISOString(),
      deliveryCost: cost,
    };

    Swal.fire({
      title: "Confirm Parcel Details",
      icon: "info",
      html: `
      <p><strong>Tracking ID:</strong> ${newParcel.tracking_id}</p>
      <p><strong>Delivery Type:</strong> ${deliveryType}</p>
      <p><strong>Parcel Type:</strong> ${parcelType}</p>
      <p><strong>Weight:</strong> ${weight} kg</p>
      <p class="mt-2"><strong>Cost Breakdown:</strong><br>${breakdown}</p>
      <p class="mt-2 text-lg"><strong>Total Cost: ৳${cost}</strong></p>
    `,
      showCancelButton: true,
      confirmButtonText: "Proceed to Checkout",
      cancelButtonText: "Continue Editing",
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        // Send to server
        axiosSecuire.post("/parcels", newParcel).then((res) => {
          if (res?.data?.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Redirecting...",
              text: "Your parcel has been submitted. Redirecting to checkout soon...",
              confirmButtonText: "OK",
            });
          }
          // TODO: Redirect to checkout
          // navigate("/checkout");
        });
      }
    });
  };

  const fetchRegion = async () => {
    try {
      const res = await fetch("/data/division.json");
      const region = await res.json();
      setRegions(region);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRegion();
  }, []);

  useEffect(() => {
    setCoveredArea(() => {
      const matchArea = warehousesData.find(
        (area) => selectedRegion.toLowerCase() === area?.city?.toLowerCase()
      );
      if (matchArea) {
        setCoveredArea(matchArea.covered_area);
      } else {
        setCoveredArea(null);
      }
    });
  }, [selectedRegion, warehousesData]);

  // console.log(coveredArea)

  return (
    <Container>
      {/* // Main container for the form, ensuring it's centered and responsive */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
        <div className="w-full ">
          <Card className="rounded-xl shadow-2xl overflow-hidden border-none !pt-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-xl p-6 sm:p-8">
              <CardTitle className="text-3xl sm:text-4xl font-extrabold text-center tracking-tight">
                Parcel Delivery Form
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 md:p-10 bg-white">
              <Form {...form}>
                {/* React Hook Form's handleSubmit will now call our onSubmit, which handles validation */}
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-10"
                >
                  {/* Parcel Details Section */}
                  <section>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3 mb-6">
                      Parcel Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {/* Parcel Name Input */}
                      <FormField
                        control={form.control}
                        name="parcelName"
                        rules={{ required: "Parcel Name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Parcel Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Books, Electronics Gadget"
                                {...field}
                                className="rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </FormControl>
                            {/* Display error message manually */}
                            {form.formState.errors.parcelName && (
                              <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.parcelName.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />

                      {/* Parcel Type Radio Buttons */}
                      <FormField
                        control={form.control}
                        name="parcelType"
                        render={({ field }) => (
                          <FormItem className="space-y-4">
                            <FormLabel className="text-gray-700 font-medium !mb-0">
                              Parcel Type
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0 cursor-pointer">
                                  <FormControl>
                                    <RadioGroupItem
                                      value="document"
                                      id="parcelTypedocument"
                                    />
                                  </FormControl>
                                  <FormLabel
                                    htmlFor="parcelTypedocument"
                                    className="capitalize font-normal text-gray-800 cursor-pointer"
                                  >
                                    document
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0 cursor-pointer">
                                  <FormControl>
                                    <RadioGroupItem
                                      value="non-document"
                                      id="parcelTypeNondocument"
                                    />
                                  </FormControl>
                                  <FormLabel
                                    htmlFor="parcelTypeNondocument"
                                    className=" capitalize font-normal text-gray-800 cursor-pointer"
                                  >
                                    non-document
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            {form.formState.errors.parcelType && (
                              <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.parcelType.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />

                      {/* Weight Input (conditionally rendered) */}
                      {parcelType === "non-document" && (
                        <FormField
                          control={form.control}
                          name="weight"
                          rules={{
                            required: "Please type your document weight in kg",
                          }}
                          render={({ field }) => (
                            <FormItem className="transition-all duration-300 ease-in-out">
                              <FormLabel className="text-gray-700 font-medium">
                                Weight (KG)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.1"
                                  placeholder="e.g., 5.5"
                                  // Convert value to number for input, then back to string for display if needed
                                  {...field}
                                  value={field.value === 0 ? "" : field.value} // Show empty if 0
                                  onChange={(e) =>
                                    field.onChange(
                                      parseFloat(e.target.value) || 0
                                    )
                                  } // Convert to number or 0
                                  className="rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                              </FormControl>
                              {form.formState.errors.weight && (
                                <p className="text-red-500 text-sm mt-1">
                                  {form.formState.errors.weight.message}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </section>

                  {/* Sender Details Section */}
                  <section>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3 mb-6 pt-6">
                      Sender Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <FormField
                        control={form.control}
                        name="senderName"
                        rules={{ required: "Sender name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Sender's Full Name"
                                {...field}
                                className="rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </FormControl>
                            {form.formState.errors.senderName && (
                              <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.senderName.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="senderContactNumber"
                        rules={{
                          required: "Sender contact number is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Contact Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="e.g., +1234567890"
                                {...field}
                                className="rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </FormControl>
                            {form.formState.errors.senderContactNumber && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  form.formState.errors.senderContactNumber
                                    .message
                                }
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="senderWarehouse"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Warehouse
                            </FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a Warehouse" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Select a Warehouse
                                    </SelectLabel>
                                    {coveredArea?.map((area, idx) => (
                                      <SelectItem key={idx} value={area}>
                                        {area}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            {form.formState.errors.senderWarehouse && (
                              <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.senderWarehouse.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="senderRegion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Region
                            </FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a Region" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Select a region</SelectLabel>
                                    {regions?.map((region, idx) => (
                                      <SelectItem key={idx} value={region}>
                                        {region}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            {form.formState.errors.senderRegion && (
                              <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.senderRegion.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="senderAddress"
                        rules={{ required: "Sender address is required" }}
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-gray-700 font-medium">
                              Address
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Street, City, Postcode, Country"
                                {...field}
                                className="rounded-md min-h-[100px] focus:ring-blue-500 focus:border-blue-500 resize-y"
                              />
                            </FormControl>
                            {form.formState.errors.senderAddress && (
                              <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.senderAddress.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="senderInstructions"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-gray-700 font-medium">
                              Special Instructions (Optional)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="e.g., Leave at reception, Call before delivery"
                                {...field}
                                className="rounded-md min-h-[100px] focus:ring-blue-500 focus:border-blue-500 resize-y"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  {/* Receiver Details Section */}
                  <section>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3 mb-6 pt-6">
                      Receiver Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <FormField
                        control={form.control}
                        name="receiverName"
                        rules={{
                          required: "Please give a name to send the percel",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Receiver's Full Name"
                                {...field}
                                className="rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </FormControl>
                            {form.formState.errors.receiverName && (
                              <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.receiverName.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="receiverContactNumber"
                        rules={{
                          required: "Receiver phone number is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Contact Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="e.g., +1234567890"
                                {...field}
                                className="rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </FormControl>
                            {form.formState.errors.receiverContactNumber && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  form.formState.errors.receiverContactNumber
                                    .message
                                }
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="receiverWarehouse"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Warehouse
                            </FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a Warehouse" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Select a Warehouse
                                    </SelectLabel>
                                    {coveredArea?.map((area, idx) => (
                                      <SelectItem key={idx} value={area}>
                                        {area}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            {form.formState.errors.receiverWarehouse && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  form.formState.errors.receiverWarehouse
                                    .message
                                }
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="receiverRegion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Region
                            </FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a Region" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Select a region</SelectLabel>
                                    {regions?.map((region, idx) => (
                                      <SelectItem key={idx} value={region}>
                                        {region}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            {form.formState.errors.receiverRegion && (
                              <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.receiverRegion.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="receiverAddress"
                        rules={{ required: "Please provide receiver address." }}
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-gray-700 font-medium">
                              Address
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Street, City, Postcode, Country"
                                {...field}
                                className="rounded-md min-h-[100px] focus:ring-blue-500 focus:border-blue-500 resize-y"
                              />
                            </FormControl>
                            {form.formState.errors.receiverAddress && (
                              <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.receiverAddress.message}
                              </p>
                            )}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="receiverInstructions"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-gray-700 font-medium">
                              Special Instructions (Optional)
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="e.g., Delivery via side gate, Collect ID"
                                {...field}
                                className="rounded-md min-h-[100px] focus:ring-blue-500 focus:border-blue-500 resize-y"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full !py-5 sm:py-4 text-lg sm:text-xl font-bold rounded-lg
                           cursor-pointer  "
                  >
                    Submit Parcel Details
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default AddParcel;
