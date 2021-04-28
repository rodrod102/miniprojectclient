import React, { useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./navbar";
import { useRouter } from "next/router";

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
        <div className="layout_data">
          <div className="" className={styles.product} key={index}>
            <div className="card">
              <h>Photo</h>
              <div className="card-body" className={styles.btns}>
                {vegetation ? vegetation.name : "-"}
                {"  "}
                Price: {vegetation ? vegetation.price : "-"} Bath
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => getVegetation(vegetation.id)}
                  >
                    เลือก
                  </button>
                </div>
              </div>

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
      ));
    else {
      return <h2>No vegetation</h2>;
    }
  };
  const router = useRouter();
  const getVegetation = async (id) => {
    const result = await axios.get(`${URL}/${id}`);
    console.log("vegetation id: ", result.data);
    setVegetation(result.data);
  };

  return (
    <div className="container">
      <Navbar />
      <div className=" row">
        <div className="layout_1 col-md-8">{printVegetation(data.list)}</div>
        <div className="col-6 col-md-4">
          {" "}
          <div className="selectproduct ">
            <div className="select_care card">
              <div>
                selected : {vegetation.name} {vegetation.price}{" "}
                <button
              type="button"
              className="btn btn-danger"
              onClick={() => router.push("/formbuy")}
            >
              BUY
            </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
export default homepage;
