import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";

function Home() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState(null);

  useEffect(() => {
    getAllUniversities();
    // console.log(universities);
  }, []);

  function getAllUniversities() {
    axios.get("http://localhost:1217/university").then((d) => {
      setUniversities(d.data.uniData);
    });
  }
  function renderUniversities() {
    return universities?.map((item) => {
      return (
        <div className="col-3">
          <div class="card">
            <img
              class="card-img-top"
              src={"http://localhost:1217/" + item.image}
              height="150"
              width="150"
            />
            <div class="card-body">
              <h5 class="card-title">{item.name}</h5>
              <a
                onClick={() => {
                  navigate(ROUTES.department.name + "?id=" + item._id);
                }}
                class="btn btn-primary text-white"
              >
                View Departments
              </a>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <Navbar />
      <div className="row m-2">{renderUniversities()}</div>
    </div>
  );
}

export default Home;
