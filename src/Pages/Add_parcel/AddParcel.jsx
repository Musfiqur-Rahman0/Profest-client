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
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useForm } from "react-hook-form";

// Assuming these Shadcn UI components are available from your project's components/ui directory.

const AddParcel = () => {
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
  console.log(parcelType);

  const onSubmit = (data) => {
    // In a real application, you would send this data to an API or process it further.
    console.log("Form submitted successfully! Here is the data:", data);
    // You should replace this alert with a more user-friendly UI notification (e.g., a toast, modal).
    // alert('Parcel details submitted successfully! Check the console for the data.');
    // Using a custom message box for demonstration instead of alert().
    // For this example, we'll just log to console and simulate success.
    const messageBox = document.createElement("div");
    messageBox.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    messageBox.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
        <h3 class="text-xl font-bold mb-4 text-green-600">Success!</h3>
        <p class="mb-6 text-gray-700">Parcel details submitted successfully! Check your browser's console for the data.</p>
        <button id="closeMessageBox" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200">
          Close
        </button>
      </div>
    `;
    document.body.appendChild(messageBox);

    document.getElementById("closeMessageBox").onclick = () => {
      document.body.removeChild(messageBox);
    };
  };

  return (
    <Container>
      {/* // Main container for the form, ensuring it's centered and responsive */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
        <div className="w-full ">
          <Card className="rounded-xl shadow-2xl overflow-hidden border-none">
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
                            <FormLabel className="text-gray-700 font-medium">
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
                                      id="parcelTypeDocument"
                                    />
                                  </FormControl>
                                  <FormLabel
                                    htmlFor="parcelTypeDocument"
                                    className="font-normal text-gray-800 cursor-pointer"
                                  >
                                    Document
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0 cursor-pointer">
                                  <FormControl>
                                    <RadioGroupItem
                                      value="non-document"
                                      id="parcelTypeNonDocument"
                                    />
                                  </FormControl>
                                  <FormLabel
                                    htmlFor="parcelTypeNonDocument"
                                    className="font-normal text-gray-800 cursor-pointer"
                                  >
                                    Non-Document
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
                              <Input
                                placeholder="e.g., Main Distribution Hub"
                                {...field}
                                className="rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
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
                              <Input
                                placeholder="e.g., Dhaka, Chittagong"
                                {...field}
                                className="rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
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
                              <Input
                                placeholder="e.g., Local Pick-up Point"
                                {...field}
                                className="rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
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
                              <Input
                                placeholder="e.g., Khulna, Sylhet"
                                {...field}
                                className="rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
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
                    className="w-full py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-lg
                             bg-gradient-to-r from-blue-600 to-indigo-700 text-white
                             hover:from-blue-700 hover:to-indigo-800
                             shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.005]"
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
