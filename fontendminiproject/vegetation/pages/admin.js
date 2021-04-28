import React, { useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./navbaradmin";

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
        <li className="li_non" key={index}>
          <div>
            {" "}
            <label for="inputname" class="form-label">
              {vegetation ? vegetation.name : "-"} :{" "}
            </label>
            <label for="inputprice" class="form-label">
              {vegetation ? vegetation.price : "-"}
            </label>
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => getVegetation(vegetation.id)}
          >
            เลือก
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteVegetation(vegetation.id)}
          >
            ลบ
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => updateVegetation(vegetation.id)}
          >
            อัพเดท
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
    <div className="container">
      <Navbar/>
      <div className="layout">
        <div className="card color_card">
          <div className="card-body">
            <h1> Vegetation</h1>
            <ul>{printVegetation(data.list)}</ul>
            <label for="inputSelect" class="form-label">
              selecte: {vegetation.name} {vegetation.price}
            </label>
            
            <h2>AddProduct</h2>
            Name:
            <input
              type="text"
              class="form-control"
              placeholder="NameVegetation"
              aria-label="NameVegetation"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            Price:
            <input
              type="number"
              class="form-control"
              placeholder="Price"
              aria-label="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => addVegetation(name, price)}
            >
              Add new Vegetation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default foradmin;
