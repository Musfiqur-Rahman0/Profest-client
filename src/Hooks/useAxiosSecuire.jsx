import axios from "axios";
import React from "react";

const axiosSecuire = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecuire = () => {
  return axiosSecuire;
};

export default useAxiosSecuire;
