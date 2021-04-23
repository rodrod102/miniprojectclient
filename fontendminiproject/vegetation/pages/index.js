import React, { useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";

const URL = `http://localhost/api/vegetation`;
const fetcher = (url) => axios.get(url).then((res) => res.data);
const homepage = () => {
  const [vegetation, setVegetation] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const { data } = useSWR(URL, fetcher);
  if (!data) return <div>Loading...</div>;
  const printVegetation = (vegetations) => {
    console.log("vegetations:", vegetations);
    if (vegetations && vegetations.length)
      return vegetations.map((vegetation, index) => (
        <li key={index}>
          {vegetation ? vegetation.name : "-"} :{" "}
          {vegetation ? vegetation.price : "-"} :
          <button onClick={() => getVegetation(vegetation.id)}>Get</button>        
        </li>
      ));
    else {
      return <h2>No vegetation</h2>;
    }
  };

  const getVegetation = async (id) => {
    const result = await axios.get(`${URL}/${id}`);
    console.log("vegetation id: ", result.data);
    setVegetation(result.data);
  };

  return (
    <div>
      <h1> Vegetation</h1>
      <ul>{printVegetation(data.list)}</ul>
      selected vegetation: {vegetation.name} {vegetation.price}
    </div>
  );
};
export default homepage;
