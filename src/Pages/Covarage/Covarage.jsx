import SearchBox from "@/components/Shared/SearchBox";
import ServiceMap from "@/components/Shared/ServiceMap";
import Container from "@/components/ui/Container";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

const serviceAreas = [
  { city: "Dhaka", lat: 23.8103, lng: 90.4125, radius: 15000 },
  { city: "Chittagong", lat: 22.3569, lng: 91.7832, radius: 10000 },
];

const Covarage = () => {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [notFound, setNotFound] = useState(null);

  const { handleSubmit, control, formState, watch } = useForm();

  const handleSearch = async () => {
    // console.log(query);

    const found = wareHouses.find(
      (area) => area.city.toLowerCase() === query.toLowerCase()
    );

    if (found) {
      setSelectedCity(found);
      setNotFound(false);
      return;
    }
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );
    const data = await res.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      console.log(lat, lon);
      setSelectedCity(null);
      setNotFound({
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        message: "Sorry, we do not serve this area yet.",
      });
    } else {
      alert("city not found");
    }
  };

  const wareHouses = useLoaderData();

  return (
    <Container className="py-20 px-24 bg-white rounded-3xl mt-8">
      <form onSubmit={handleSubmit(handleSearch)} className="space-y-12">
        <h1 className="text-4xl font-bold">We are available in 64 districts</h1>
        <SearchBox
          //   handlerFunc={handleSearch}
          query={query}
          setQuery={setQuery}
        />
        <div className="w-full h-1 bg-gray-200"></div>
      </form>
      <div>
        <h2 className="text-xl font-bold py-10">
          We deliver almost all over Bangladesh
        </h2>
        <ServiceMap
          serviceAreas={wareHouses}
          selectedCity={selectedCity}
          notFound={notFound}
        />
      </div>
    </Container>
  );
};

export default Covarage;
