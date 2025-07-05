import ApprovedRiders from "@/components/Dashboard/ApprovedRiders/ApprovedRiders";
import PendingRiders from "@/components/Dashboard/PendingRiders/PendingRiders";
import RejectedRiders from "@/components/Dashboard/RejectedRiders/RejectedRiders";
import AuthLayout from "@/Layouts/AuthLayout";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Root from "@/Layouts/Root";
import About from "@/Pages/About/About";
import AddParcel from "@/Pages/Add_parcel/AddParcel";
import Login from "@/Pages/authetication/Login";
import Signup from "@/Pages/authetication/Signup";
import BeArider from "@/Pages/beArider/BeArider";
import Contact from "@/Pages/Contact/Contact";
import Covarage from "@/Pages/Covarage/Covarage";
import PaymentsHistory from "@/Pages/Dashboard/PaymentsHistory";
import TrackParcel from "@/Pages/Dashboard/Track-parcel/TrackParcel";
import ErrorPage from "@/Pages/errorpage/ErrorPage";

import Home from "@/Pages/Home/Home";
import MYparcels from "@/Pages/myparcels/MYparcels";
import Payment from "@/Pages/payment/Payment";
import PricingCalculator from "@/Pages/pricingCalculator/PricingCalculator";

import { createBrowserRouter } from "react-router";
import PrivetRoute from "./PrivetRoute";
import MakeAdmin from "@/components/Dashboard/makeAdmin/MakeAdmin";

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
        loader: () => fetch("/data/warehouses.json"),
        element: (
          <PrivetRoute>
            <BeArider />
          </PrivetRoute>
        ),
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
      {
        path: "track",
        element: <TrackParcel />,
      },
      {
        path: "pending-riders",
        element: <PendingRiders />,
      },
      {
        path: "active-riders",
        element: <ApprovedRiders />,
      },
      {
        path: "rejected-riders",
        element: <RejectedRiders />,
      },
      {
        path: "make-admin",
        element: <MakeAdmin />,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: Signup,
      },
    ],
  },
]);

export default router;
