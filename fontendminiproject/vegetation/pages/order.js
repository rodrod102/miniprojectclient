import React, { useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import Navbar from "./navbaradmin";
import "bootstrap/dist/css/bootstrap.css";
const URL = `http://localhost/api/buy`;
const fetcher = (url) => axios.get(url).then((res) => res.data);
const orders = () => {
  const { data } = useSWR(URL, fetcher);
  if (!data) return <div>Loading...</div>;
  const printVegetation = (vegetationsbuy) => {
    console.log("vegetationsbuy:", vegetationsbuy);
    if (vegetationsbuy && vegetationsbuy.length)
      return vegetationsbuy.map((vegetationbuy, index) => (
        <tbody key={index}>
          <tr>
            <th scope="row">{vegetationbuy ? vegetationbuy.id : "-"}</th>
            <td>{vegetationbuy ? vegetationbuy.name : "-"}</td>
            <td>{vegetationbuy ? vegetationbuy.lastname : "-"}</td>
            <td>{vegetationbuy ? vegetationbuy.address : "-"}</td>
            <td>{vegetationbuy ? vegetationbuy.city : "-"}</td>
            <td>{vegetationbuy ? vegetationbuy.state : "-"}</td>
            <td>{vegetationbuy ? vegetationbuy.num : "-"}</td>
          </tr>
        </tbody>
      ));
    else {
      return <h2>No Vegetationbuy </h2>;
    }
  };
  return (
    <div className="container">
      <Navbar />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        {printVegetation(data.listbuy)}
      </table>
    </div>
  );
};
export default orders;
