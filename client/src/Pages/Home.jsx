import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get("/api/v1/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
      <Navbar />
      <h1>{data}</h1>
    </>
  );
};

export default Home;
