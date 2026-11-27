import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar';
import axios from 'axios';
import {  useLocation,useNavigate } from 'react-router-dom';
import ROUTES from '../../../navigations/Routes';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function UserProduct() {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();
  const queryParams = useQuery();

  useEffect(() => {
    getAllProductsByDep();
    //console.log(products);
  }, []);
  function getAllProductsByDep() {
    axios.get("http://localhost:1217/product?departmentId=" + queryParams.get("id")
    ).then((d) => {
      setProducts(d.data.proData);
    });
  }
   function renderProducts() {
    return products?.map((item) => {
      return (
        <div className="col-3">
          <div class="card">
            <img
              class="card-img-top"
              src={"http://localhost:1217/" + item.images[0]}
              height="150"
              width="150"
            />
            <div class="card-body">
              <h5 class="card-title">{item.name}</h5>
              <h6 class="card-title">{item.description}</h6>
              

              <a
                onClick={() => {
                  navigate(ROUTES.productDetail.name + "?id=" + item._id);
                }}
                class="btn btn-primary text-white"
              >
                View Detail
              </a>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className='row m-2'>{ renderProducts()}</div>
    </div>
  )
}

export default UserProduct;