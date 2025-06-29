import DashboardLayout from "@/Layouts/DashboardLayout";
import Root from "@/Layouts/Root";
import About from "@/Pages/About/About";
import AddParcel from "@/Pages/Add_parcel/AddParcel";
import BeArider from "@/Pages/beArider/BeArider";
import Contact from "@/Pages/Contact/Contact";
import Covarage from "@/Pages/Covarage/Covarage";
import PaymentsHistory from "@/Pages/Dashboard/PaymentsHistory";
import ErrorPage from "@/Pages/errorpage/ErrorPage";

import Home from "@/Pages/Home/Home";
import MYparcels from "@/Pages/myparcels/MYparcels";
import Payment from "@/Pages/payment/Payment";
import PricingCalculator from "@/Pages/pricingCalculator/PricingCalculator";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "/be-a-rider",
        Component: BeArider,
      },
      {
        path: "/pircing",
        Component: PricingCalculator,
      },
      {
        path: "covarage",
        loader: () => fetch("/data/warehouses.json"),
        Component: Covarage,
      },
      {
        path: "addParcel",
        loader: () => fetch("/data/warehouses.json"),
        Component: AddParcel,
      },
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "myparcels",
        element: <MYparcels />,
      },
      {
        path: "payment/:parcelId",
        element: <Payment />,
      },

      {
        path: "payments-history",
        element: <PaymentsHistory />,
      },
    ],
  },
]);

export default router;
