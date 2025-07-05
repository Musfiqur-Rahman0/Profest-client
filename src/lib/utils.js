import { clsx } from "clsx";
import {
  BriefcaseBusiness,
  PackageSearch,
  Truck,
  Warehouse,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import serviceImg1 from "../assets/delivery-van.png";
import safeDelivary from "../assets/safe-delivery.png";
import liveTracking from "../assets/live-tracking.png";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const serviceCardData = [
  {
    icon: PackageSearch,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: Truck,
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: Warehouse,
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
];

export const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: serviceImg1,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: serviceImg1,
    highlight: true,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: serviceImg1,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: serviceImg1,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which include warehouse and inventory management support.",
    icon: serviceImg1,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: serviceImg1,
  },
];

export const keyFeatures = [
  {
    id: "feature-1",
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    image: liveTracking,
  },
  {
    id: "feature-2",
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: safeDelivary,
  },
  {
    id: "feature-3",
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: safeDelivary,
  },
];

export const getTrackingId = () => {
  const prefix = "TRK";
  const random = Math.random().toString(36).substr(2, 6).toUpperCase(); // e.g., 'A1B2C3'
  const time = Date.now().toString(36).toUpperCase().slice(-4); // last 4 chars of timestamp
  return `${prefix}-${random}${time}`;
};

export const searchRiders = (riders, query) => {
  const filteredRiders = riders.filter((rider) =>
    query.trim() === ""
      ? true
      : (rider.name || "").toLowerCase().includes(query.trim().toLowerCase())
  );

  return filteredRiders;
};
