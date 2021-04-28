import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import Navbar from "./navbar";

const URL = `http://localhost/api/buy`;
const fetcher = (url) => axios.get(url).then((res) => res.data);
const form = () => {
  const [vegetationbuy, setVegetationbuy] = useState("");
  const [firtname, setFistname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState("");
  const [num, setNum] = useState(0);
  const { data } = useSWR(URL, fetcher);
  if (!data) return <div>Loading...</div>;

  const addVegetationbuy = async (
    name,
    lastname,
    address,
    city,
    state,
    num
  ) => {
    const result = await axios.post(URL, {
      name,
      lastname,
      address,
      city,
      state,
      num,
    });

    alert("BUY Finish");

    console.log(result.data);
    mutate(URL);
  };
  return (
    <div className="container">
      <Navbar/>
      <div className="laout_form">
        <form class="row g-3">
          <div class="col-md-6">
            <label for="inputName" class="form-label">
              Firstname
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="First name"
              aria-label="First name"
              onChange={(e) => setFistname(e.target.value)}
            />
          </div>
          <div class="col-md-6">
            <label for="inputLastname" class="form-label">
              Lastname
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Last name"
              aria-label="Last name"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div class="col-12">
            <label for="inputAddress" class="form-label">
              Address
            </label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div class="col-md-6">
            <label for="inputCity" class="form-label">
              City
            </label>
            <input
              type="text"
              class="form-control"
              id="inputCity"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">
              State
            </label>
            <input
              type="text"
              class="form-control"
              id="inputState"
              onChange={(e) => setStates(e.target.value)}
            />
          </div>
          <div class="col-md-2">
            <label for="inputZip" class="form-label">
              num
            </label>
            <input
              type="number"
              class="form-control"
              id="inputnum"
              onChange={(e) => setNum(e.target.value)}
            />
          </div>
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck" />
              <label class="form-check-label" for="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() =>
                addVegetationbuy(firtname, lastname, address, city, states, num)
              }
            >
              BUY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default form;
