import Root from "@/Layouts/Root";
import About from "@/Pages/About/About";
import AddParcel from "@/Pages/Add_parcel/AddParcel";
import Contact from "@/Pages/Contact/Contact";
import Covarage from "@/Pages/Covarage/Covarage";
import ErrorPage from "@/Pages/Error/ErrorPage";
import Home from "@/Pages/Home/Home";

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
        path: "covarage",
        loader: () => fetch("/data/warehouses.json"),
        Component: Covarage,
      },
      {
        path: "addParcel",
        Component: AddParcel,
      },
    ],
  },
]);

export default router;
