import React, { useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";

const URL = `http://localhost/api/vegetation`;
const fetcher = (url) => axios.get(url).then((res) => res.data);
const foradmin = () => {
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
        
          <button onClick={() => deleteVegetation(vegetation.id)}>
            {" "}
            Delete{" "}
          </button>
          <button onClick={() => getVegetation(vegetation.id)}>Get</button>
          <button onClick={() => updateVegetation(vegetation.id)}>
            Update
          </button>
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

  const addVegetation = async (name, price) => {
    const result = await axios.post(URL, { name, price });
    console.log(result.data);
    mutate(URL);
  };

  const deleteVegetation = async (id) => {
    const result = await axios.delete(`${URL}/${id}`);
    console.log(result.data);
    mutate(URL);
  };
  const updateVegetation = async (id) => {
    const result = await axios.put(`${URL}/${id}`, {
      name,
      price,
    });
    console.log("Vegetation id update: ", result.data);
    mutate(URL);
  };

  return (
    <div>
      <h1> Vegetation</h1>
      <ul>{printVegetation(data.list)}</ul>
      selected vegetation: {vegetation.name} {vegetation.price}
      <h2>Add student</h2>
      Name:
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <br />
      Price:
      <input type="number" onChange={(e) => setPrice(e.target.value)} />
      <br />
      <button onClick={() => addVegetation(name,price)}>
        Add new Vegetation
      </button>
    </div>
  );
};
export default foradmin;