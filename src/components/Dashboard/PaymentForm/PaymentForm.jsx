import { Button } from "@/components/ui/button";
import useAxiosSecuire from "@/Hooks/useAxiosSecuire";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const axiosSecure = useAxiosSecuire();
  const { parcelId } = useParams();

  const navigate = useNavigate();

  const {
    isPending,
    data: parcelInfo = {},
    isError,
  } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
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

    if (!stripe || !elements) return;
    if (isProcessing) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsProcessing(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setErrorMessage(null);

      const res = await axiosSecure.post("/payment-intent", {
        amount: ammoutInCents,
        currency: "usd",
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      const { error: paymentConfirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (paymentConfirmError) {
        setErrorMessage(paymentConfirmError.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const paymentData = {
          parcelId,
          email: "musfiqurrhaman6@gmail.com",
          amount: ammout,
          transactionId: paymentIntent.id,
          paymentMethod: paymentIntent.payment_method_types,
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);

        if (paymentRes.data.insertedId) {
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${paymentIntent.id}</code>`,
            confirmButtonText: "Go to My Parcels",
          });

          navigate("/dashboard/myparcels");
        } else {
          setErrorMessage("Payment succeeded but failed to update backend.");
        }
      } else {
        setErrorMessage("Payment did not succeed.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
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
