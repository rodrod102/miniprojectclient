import React, { useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";

const URL = `http://localhost/api/vegetation`;
const fetcher = (url) => axios.get(url).then((res) => res.data);
const homepage = () => {
  const [vegetation, setVegetation] = useState("");
  const { data } = useSWR(URL, fetcher);
  if (!data) return <div>Loading...</div>;
  const printVegetation = (vegetations) => {
    console.log("vegetations:", vegetations);
    if (vegetations && vegetations.length)
      return vegetations.map((vegetation, index) => (
        <div className="container">
          <div className="row row-cols-4">
            <div class="col" key={index}>
              <div className="card">
                {vegetation ? "Name: "+vegetation.name : "-"}{"  "}
                {vegetation ? "Price: "+vegetation.price : "-"}
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => getVegetation(vegetation.id)}
                >
                  Get
                </button>

                {/* <ul>
                  <li key={index}>
                    {vegetation ? vegetation.name : "-"} :{" "}
                    {vegetation ? vegetation.price : "-"} :
                    <button onClick={() => getVegetation(vegetation.id)}>
                      Get
                    </button>
                  </li>
                </ul>{" "} */}
              </div>
            </div>
            <div className="product"></div>
          </div>
        </div>
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
    <div className="container">
      <div className="layout">
        <h1> Vegetation</h1>
        <div>
          <ul>{printVegetation(data.list)}</ul>
        </div>
        selected vegetation: {vegetation.name} {vegetation.price}
      </div>
    </div>
  );
};
export default homepage;
