import { Button } from "@/components/ui/button";
import useAxiosSecuire from "@/Hooks/useAxiosSecuire";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const axiosSecure = useAxiosSecuire();
  const { id } = useParams();

  const {
    isPending,
    data: parcelInfo = {},
    isError,
  } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  const ammout = parcelInfo.deliveryCost;
  const ammoutInCents = ammout * 100;
  // console.log(ammoutInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      return setErrorMessage(error.message);
    }

    console.log("Payment method intentend-->", paymentMethod);

    setErrorMessage(null);

    const res = await axiosSecure.post("/payment-intent", {
      amount: ammoutInCents,
      currency: "usd",
    });

    const clientSecrect = res.data.clientSecret;
    const { error: paymentConfirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecrect, {
        payment_method: paymentMethod.id,
      });

    if (paymentConfirmError) {
      return setErrorMessage(paymentConfirmError.message);
    }
    console.log("after confimed payment intent", paymentIntent);
    setErrorMessage(null);
  };

  // console.log(errorMessage);
  return (
    <form onSubmit={handleSubmit}>
      <CardElement></CardElement>
      <Button
        variant={"destructive"}
        className={"mt-2 w-full cursor-pointer"}
        disabled={!stripe}
      >
        Pay ${ammout}
      </Button>
      {errorMessage && (
        <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
      )}
    </form>
  );
};

export default PaymentForm;
